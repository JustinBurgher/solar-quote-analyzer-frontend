from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import random
import string
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Admin email configuration.  The admin has unlimited analyses and
# bypasses email verification.
ADMIN_EMAIL = "justinburgher@live.co.uk"


def init_database() -> None:
    """Initialise the SQLite database and create required tables.

    This function creates two tables if they do not already exist:

    * ``email_verifications`` – stores verification codes for email
      addresses along with timestamps and verification status.
    * ``users`` – tracks the number of analyses performed by each
      verified user and whether the user has completed email
      verification.  Admin users are not recorded.
    """
    conn = sqlite3.connect('solar_analyzer.db')
    cur = conn.cursor()
    # Table for email verification codes
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS email_verifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            code TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            verified BOOLEAN DEFAULT FALSE
        )
        '''
    )
    # Table for user analysis counts and verification status
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            analysis_count INTEGER DEFAULT 0,
            verified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        '''
    )
    conn.commit()
    conn.close()


# Initialise the database on module import
init_database()


# Battery options.  Each entry contains the ``brand`` (string), the
# battery ``capacity`` in kWh (float), and a ``price_range`` giving a
# plausible price range per unit.  These names match the front‑end
# expectations.  The front‑end will display the brand name along with
# capacity and allow the user to select multiple units.
BATTERY_OPTIONS = [
    {"brand": "Tesla Powerwall 3", "capacity": 13.5, "price_range": [7500, 8000]},
    {"brand": "Enphase IQ Battery 5P", "capacity": 5.0, "price_range": [4500, 5000]},
    {"brand": "LG Chem RESU10H", "capacity": 9.8, "price_range": [5500, 6000]},
    {"brand": "Pylontech US3000C", "capacity": 3.55, "price_range": [1800, 2200]},
    {"brand": "BYD Battery-Box Premium LVS", "capacity": 4.0, "price_range": [2500, 3000]},
    {"brand": "Solax Triple Power T58", "capacity": 5.8, "price_range": [3500, 4000]},
    {"brand": "Alpha ESS SMILE-B3", "capacity": 2.9, "price_range": [2000, 2500]},
    {"brand": "Huawei LUNA2000", "capacity": 5.0, "price_range": [3000, 3500]},
    {"brand": "SolarEdge Energy Bank", "capacity": 9.7, "price_range": [5000, 5500]},
    {"brand": "Victron Energy Lithium", "capacity": 5.12, "price_range": [3500, 4000]},
    {"brand": "Fronius Solar Battery", "capacity": 4.5, "price_range": [3000, 3500]},
    {"brand": "Growatt ARK XH", "capacity": 2.56, "price_range": [1500, 2000]},
    {"brand": "Goodwe Lynx Home U", "capacity": 3.3, "price_range": [2200, 2700]},
    {"brand": "Solis RAI", "capacity": 5.1, "price_range": [3200, 3700]},
    {"brand": "Moixa Smart Battery", "capacity": 2.0, "price_range": [2500, 3000]},
    {"brand": "Powervault P4", "capacity": 4.1, "price_range": [3500, 4000]},
    {"brand": "Sonnen ecoLinx", "capacity": 12.0, "price_range": [12000, 15000]},
    {"brand": "Other", "capacity": 0, "price_range": [0, 0]}
]


def safe_float(value, default=0.0) -> float:
    """Safely convert a value to a float or return a default."""
    try:
        if value is None or value == '' or value == 'undefined':
            return default
        return float(value)
    except (ValueError, TypeError):
        return default


def safe_int(value, default=0) -> int:
    """Safely convert a value to an int or return a default."""
    try:
        if value is None or value == '' or value == 'undefined':
            return default
        return int(value)
    except (ValueError, TypeError):
        return default


def is_admin_email(email: str) -> bool:
    """Determine whether the provided email belongs to the admin."""
    return bool(email) and email.strip().lower() == ADMIN_EMAIL.lower()


def get_user_analysis_count(email: str) -> int:
    """Return the analysis count for a non‑admin user."""
    if is_admin_email(email):
        return 0
    conn = sqlite3.connect('solar_analyzer.db')
    cur = conn.cursor()
    cur.execute('SELECT analysis_count FROM users WHERE email = ?', (email,))
    row = cur.fetchone()
    conn.close()
    return row[0] if row else 0


def increment_user_analysis_count(email: str) -> None:
    """Increment the analysis count for a non‑admin user."""
    if is_admin_email(email):
        return
    conn = sqlite3.connect('solar_analyzer.db')
    cur = conn.cursor()
    cur.execute(
        '''
        INSERT OR REPLACE INTO users (email, analysis_count, verified)
        VALUES (
            ?,
            COALESCE((SELECT analysis_count FROM users WHERE email = ?), 0) + 1,
            COALESCE((SELECT verified FROM users WHERE email = ?), FALSE)
        )
        ''',
        (email, email, email)
    )
    conn.commit()
    conn.close()


def generate_verification_code() -> str:
    """Generate a random 6‑digit numeric verification code."""
    return ''.join(random.choices(string.digits, k=6))


@app.route('/api/battery-options')
def api_battery_options():
    """Return the list of available battery options."""
    return jsonify({"battery_options": BATTERY_OPTIONS})


@app.route('/api/send-verification', methods=['POST'])
def api_send_verification():
    """Send a verification code to the specified email address."""
    try:
        data = request.get_json() or {}
        email = (data.get('email') or '').strip().lower()
        if not email:
            return jsonify({"success": False, "message": "Email is required"}), 400
        # Admins bypass verification
        if is_admin_email(email):
            return jsonify({"success": True, "message": "Admin verification bypassed", "is_admin": True})
        code = generate_verification_code()
        conn = sqlite3.connect('solar_analyzer.db')
        cur = conn.cursor()
        # Remove previous codes for this email
        cur.execute('DELETE FROM email_verifications WHERE email = ?', (email,))
        cur.execute(
            'INSERT INTO email_verifications (email, code, created_at, verified) VALUES (?, ?, ?, FALSE)',
            (email, code, datetime.now())
        )
        conn.commit()
        conn.close()
        # In production you would email the code; here we log to console for testing
        print(f"[Verification] Sent code {code} to {email}")
        return jsonify({"success": True, "message": f"Verification code sent to {email}", "is_admin": False})
    except Exception as exc:
        print(f"Error in send_verification: {exc}")
        return jsonify({"success": False, "message": "Failed to send verification code"}), 500


@app.route('/api/verify-email', methods=['POST'])
def api_verify_email():
    """Verify the provided email using the verification code."""
    try:
        data = request.get_json() or {}
        email = (data.get('email') or '').strip().lower()
        # Accept either 'verification_code' or 'code' for backward compatibility
        code = (data.get('verification_code') or data.get('code') or '').strip()
        if not email or not code:
            return jsonify({"success": False, "message": "Email and code are required"}), 400
        # Admins automatically verify
        if is_admin_email(email):
            return jsonify({"success": True, "message": "Admin verification successful", "is_admin": True})
        conn = sqlite3.connect('solar_analyzer.db')
        cur = conn.cursor()
        cur.execute(
            '''
            SELECT id FROM email_verifications
            WHERE email = ? AND code = ? AND verified = FALSE
              AND created_at > datetime('now', '-10 minutes')
            ''',
            (email, code)
        )
        row = cur.fetchone()
        if not row:
            conn.close()
            return jsonify({"success": False, "message": "Invalid or expired verification code"}), 400
        # Mark code as verified
        cur.execute('UPDATE email_verifications SET verified = TRUE WHERE email = ? AND code = ?', (email, code))
        # Mark user as verified without changing analysis count
        cur.execute(
            '''
            INSERT OR REPLACE INTO users (email, analysis_count, verified)
            VALUES (
              ?,
              COALESCE((SELECT analysis_count FROM users WHERE email = ?), 0),
              TRUE
            )
            ''',
            (email, email)
        )
        conn.commit()
        conn.close()
        print(f"[Verify] {email} verified successfully")
        return jsonify({"success": True, "message": "Email verified successfully", "is_admin": False})
    except Exception as exc:
        print(f"Error in verify_email: {exc}")
        return jsonify({"success": False, "message": "Verification failed"}), 500


@app.route('/api/analyze-quote', methods=['POST'])
def api_analyze_quote():
    """Analyze the submitted solar quote and return a grade and verdict."""
    try:
        data = request.get_json() or {}
        system_size = safe_float(data.get('system_size'))
        total_price = safe_float(data.get('total_price'))
        has_battery = bool(data.get('has_battery'))
        battery_brand = (data.get('battery_brand') or '').strip()
        battery_quantity = safe_int(data.get('battery_quantity'), 1)
        battery_capacity = safe_float(data.get('battery_capacity'))
        user_email = (data.get('user_email') or '').strip().lower()
        if system_size <= 0:
            return jsonify({"success": False, "message": "Valid system size is required"}), 400
        if total_price <= 0:
            return jsonify({"success": False, "message": "Valid total price is required"}), 400
        is_admin = is_admin_email(user_email)
        # Enforce analysis limit for non‑admin users
        if user_email and not is_admin:
            count = get_user_analysis_count(user_email)
            if count >= 3:
                return jsonify({
                    "success": False,
                    "message": "Analysis limit reached. Please upgrade for unlimited analyses.",
                    "upgrade_required": True
                }), 403
        # Price per kW for solar only
        price_per_kw = total_price / system_size
        if price_per_kw < 1000:
            solar_grade, solar_verdict = "A+", "Excellent value"
        elif price_per_kw < 1200:
            solar_grade, solar_verdict = "A", "Very good value"
        elif price_per_kw < 1500:
            solar_grade, solar_verdict = "B", "Good value"
        elif price_per_kw < 2000:
            solar_grade, solar_verdict = "C", "Fair pricing"
        elif price_per_kw < 2500:
            solar_grade, solar_verdict = "D", "Expensive – consider getting more quotes"
        else:
            solar_grade, solar_verdict = "F", "Very expensive – definitely get more quotes"
        # Battery analysis
        battery_grade = "N/A"
        battery_verdict = ""
        total_capacity = None
        battery_info_str = None
        if has_battery and battery_brand and battery_brand != "Other":
            battery_info = next((b for b in BATTERY_OPTIONS if b["brand"] == battery_brand), None)
            if battery_info:
                total_capacity = battery_info["capacity"] * battery_quantity
                est_cost = sum(battery_info["price_range"]) / 2 * battery_quantity
                est_solar_cost = system_size * 1000  # assume £1000 per kW
                battery_portion = max(0, min(est_cost, total_price - est_solar_cost))
                if total_capacity > 0 and battery_portion > 0:
                    price_per_kwh = battery_portion / total_capacity
                    if price_per_kwh < 400:
                        battery_grade, battery_verdict = "A+", "Excellent battery value"
                    elif price_per_kwh < 500:
                        battery_grade, battery_verdict = "A", "Very good battery value"
                    elif price_per_kwh < 600:
                        battery_grade, battery_verdict = "B", "Good battery value"
                    elif price_per_kwh < 700:
                        battery_grade, battery_verdict = "C", "Fair battery pricing"
                    else:
                        battery_grade, battery_verdict = "D", "Expensive battery"
                battery_info_str = battery_brand
        # Combine grades if battery is included
        overall_grade = solar_grade
        if has_battery and battery_grade != "N/A":
            grade_to_value = {"A+": 5, "A": 4, "B": 3, "C": 2, "D": 1, "F": 0}
            value_to_grade = {v: k for k, v in grade_to_value.items()}
            solar_val = grade_to_value.get(solar_grade, 0)
            battery_val = grade_to_value.get(battery_grade, 0)
            combined_val = (solar_val + battery_val) // 2
            overall_grade = value_to_grade.get(combined_val, "F")
        verdict = solar_verdict
        if has_battery and battery_verdict:
            verdict = f"{solar_verdict}. {battery_verdict}"
        # Update user analysis count for non‑admin
        if user_email and not is_admin:
            increment_user_analysis_count(user_email)
        remaining = "unlimited" if is_admin else max(0, 3 - get_user_analysis_count(user_email))
        result = {
            "success": True,
            "grade": overall_grade,
            "verdict": verdict,
            "price_per_kw": round(price_per_kw, 0),
            "system_details": {
                "system_size": system_size,
                "total_price": total_price,
                "has_battery": has_battery,
                "battery_info": battery_info_str,
                "total_capacity": total_capacity
            },
            "is_admin": is_admin,
            "remaining_analyses": remaining
        }
        return jsonify(result)
    except Exception as exc:
        print(f"Error in analyze_quote: {exc}")
        return jsonify({"success": False, "message": "Analysis failed"}), 500


# Default route for debugging
@app.route('/')
def api_home():
    return jsonify({
        "message": "Solar Quote Analyzer API",
        "version": "2.0",
        "endpoints": [
            "/api/battery-options",
            "/api/send-verification",
            "/api/verify-email",
            "/api/analyze-quote",
            "/health"
        ]
    })


# Health check
@app.route('/health')
def api_health():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})


if __name__ == '__main__':
    # When running locally, default to port 8080
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
