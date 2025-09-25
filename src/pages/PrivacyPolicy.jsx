// src/pages/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-c-5 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                InnoLink by Dowok ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium text-c-5 mb-3">Personal Information:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Name and contact details</li>
                <li>Professional information (affiliation, expertise, research interests)</li>
                <li>Account credentials</li>
                <li>Payment information</li>
              </ul>

              <h3 className="text-xl font-medium text-c-5 mb-3">Technical Information:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Provide and maintain our services</li>
                <li>Facilitate connections between researchers and companies</li>
                <li>Improve user experience and platform functionality</li>
                <li>Communicate important updates and announcements</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Potential collaboration partners (as part of our matching service)</li>
                <li>Service providers and business partners</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">7. Contact Us</h2>
              <p className="text-gray-700">
                For questions about this Privacy Policy, contact us at:
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

export default PrivacyPolicy;
