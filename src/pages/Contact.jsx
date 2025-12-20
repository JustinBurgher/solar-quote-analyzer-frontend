import React from 'react';

function Contact() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="opacity-80 mb-6">
        Get in touch with our team for support or questions about your solar quote analysis.
      </p>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600">support@solarverify.co.uk</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600">We typically respond within 24 hours</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM GMT</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
