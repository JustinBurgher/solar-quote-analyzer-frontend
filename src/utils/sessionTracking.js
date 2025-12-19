// Session tracking utility for Solar Verify
// Manages analysis count, email verification, and free trial limits

const SESSION_KEY = 'solarverify_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get current session data
 * @returns {Object} Session data with analysisCount, email, verifiedAt, etc.
 */
export const getSession = () => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) {
      return createNewSession();
    }

    const session = JSON.parse(stored);
    
    // Check if session has expired (24 hours)
    if (session.verifiedAt) {
      const verifiedTime = new Date(session.verifiedAt).getTime();
      const now = new Date().getTime();
      const timeSinceVerification = now - verifiedTime;
      
      if (timeSinceVerification > SESSION_DURATION) {
        // Session expired, create new one
        return createNewSession();
      }
    }
    
    return session;
  } catch (error) {
    console.error('Error reading session:', error);
    return createNewSession();
  }
};

/**
 * Create a new session
 * @returns {Object} New session object
 */
const createNewSession = () => {
  const newSession = {
    analysisCount: 0,
    email: null,
    isVerified: false,
    verifiedAt: null,
    premiumAccess: false,
    premiumEmail: null,
    createdAt: new Date().toISOString()
  };
  
  saveSession(newSession);
  return newSession;
};

/**
 * Save session to localStorage
 * @param {Object} session - Session data to save
 */
export const saveSession = (session) => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

/**
 * Increment analysis count
 * @returns {number} New analysis count
 */
export const incrementAnalysisCount = () => {
  const session = getSession();
  session.analysisCount += 1;
  saveSession(session);
  return session.analysisCount;
};

/**
 * Mark email as verified
 * @param {string} email - User's email address
 */
export const markEmailVerified = (email) => {
  const session = getSession();
  session.email = email;
  session.isVerified = true;
  session.verifiedAt = new Date().toISOString();
  saveSession(session);
};

/**
 * Check if user has free analyses remaining
 * @returns {boolean} True if user can analyze for free
 */
export const hasFreeAnalysesRemaining = () => {
  const session = getSession();
  return session.analysisCount < 3;
};

/**
 * Check if email verification is required
 * @returns {boolean} True if email verification is needed
 */
export const needsEmailVerification = () => {
  // Email verification disabled - collect emails optionally instead
  return false;
};

/**
 * Get remaining free analyses count
 * @returns {number} Number of free analyses remaining
 */
export const getRemainingAnalyses = () => {
  const session = getSession();
  const remaining = 3 - session.analysisCount;
  return Math.max(0, remaining);
};

/**
 * Check if user has premium access
 * @returns {boolean} True if user has premium access
 */
export const hasPremiumAccess = () => {
  const session = getSession();
  return session.premiumAccess === true;
};

/**
 * Check if user should see upgrade modal
 * @returns {boolean} True if upgrade modal should be shown
 */
export const shouldShowUpgradeModal = () => {
  // Upgrade modal disabled for MVP launch - unlimited free analyses
  return false;
};

/**
 * Grant premium access to user
 * @param {string} email - User's email address
 */
export const grantPremiumAccess = (email) => {
  const session = getSession();
  session.premiumAccess = true;
  session.premiumEmail = email;
  saveSession(session);
};

/**
 * Reset session (for testing or admin purposes)
 */
export const resetSession = () => {
  localStorage.removeItem(SESSION_KEY);
  return createNewSession();
};

/**
 * Get session status for display
 * @returns {Object} Status object with user-friendly messages
 */
export const getSessionStatus = () => {
  const session = getSession();
  const remaining = getRemainingAnalyses();
  
  let message = '';
  if (session.analysisCount === 0) {
    message = 'First analysis is completely free!';
  } else if (session.analysisCount === 1 && !session.isVerified) {
    message = 'Next analysis requires email verification';
  } else if (session.analysisCount === 1 && session.isVerified) {
    message = '2 more free analyses remaining';
  } else if (session.analysisCount === 2) {
    message = '1 more free analysis remaining';
  } else if (session.analysisCount >= 3) {
    message = 'Free analyses used - Upgrade for unlimited access';
  }
  
  return {
    analysisCount: session.analysisCount,
    remaining,
    isVerified: session.isVerified,
    email: session.email,
    message
  };
};
