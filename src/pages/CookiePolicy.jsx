// src/pages/CookiePolicy.jsx
import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-c-5 mb-6">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">1. What Are Cookies</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are stored on your device when you visit 
                websites. They help websites remember information about your visit, which 
                can make it easier to visit the site again and make the site more useful to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">We use cookies for several purposes:</p>
              
              <h3 className="text-xl font-medium text-c-5 mb-3">Essential Cookies:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>User authentication and session management</li>
                <li>Security features and fraud prevention</li>
                <li>Basic platform functionality</li>
              </ul>

              <h3 className="text-xl font-medium text-c-5 mb-3">Analytical/Performance Cookies:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Understanding how visitors use our platform</li>
                <li>Measuring platform performance</li>
                <li>Identifying areas for improvement</li>
              </ul>

              <h3 className="text-xl font-medium text-c-5 mb-3">Functionality Cookies:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Remembering user preferences</li>
                <li>Personalizing user experience</li>
                <li>Remembering chat preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services that also use cookies:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Google Analytics for website analytics</li>
                <li>Payment processors for transaction processing</li>
                <li>Social media platforms for sharing features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">4. Cookie Duration</h2>
              <p className="text-gray-700 mb-4">
                Cookies may be either "persistent" cookies or "session" cookies:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li><strong>Session cookies:</strong> Temporary cookies that remain until you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until deleted</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">5. Managing Cookies</h2>
              <p className="text-gray-700 mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Browser settings to refuse all or some cookies</li>
                <li>Cookie consent management tools</li>
                <li>Platform-specific cookie preferences</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Please note that disabling cookies may affect the functionality of our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">6. Your Choices</h2>
              <p className="text-gray-700 mb-4">
                When you first visit our platform, you will be presented with a cookie consent 
                banner where you can:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Customize your cookie preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">7. Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">8. Contact Us</h2>
              <p className="text-gray-700">
                For questions about this Cookie Policy, contact us at:
                <br />
                <strong>Email:</strong> privacy@innolink.com
                <br />
                <strong>Address:</strong> InnoLink by Dowok, Sousse, Tunisia
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
