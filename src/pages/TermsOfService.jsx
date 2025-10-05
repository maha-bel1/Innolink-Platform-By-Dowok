// src/pages/TermsOfService.jsx
import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-c-5 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using InnoLink by Dowok ("the Platform"), you agree to be bound 
                by these Terms of Service and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">2. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                You must create an account to access certain features. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Maintaining account security</li>
                <li>Providing accurate and complete information</li>
                <li>All activities that occur under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">3. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe intellectual property rights</li>
                <li>Submit false or misleading information</li>
                <li>Engage in unauthorized commercial activities</li>
                <li>Interfere with platform security or functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Platform and its original content, features, and functionality are owned by 
                InnoLink by Dowok and are protected by international copyright, trademark, and 
                other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">5. User Content</h2>
              <p className="text-gray-700 mb-4">
                You retain ownership of content you submit to the Platform. By submitting content, 
                you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, 
                and display such content for platform functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">6. Fees and Payments</h2>
              <p className="text-gray-700 mb-4">
                Certain features may require payment. You agree to pay all applicable fees and 
                taxes. Fees are non-refundable except as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">7. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account for violation of these Terms or for 
                any other reason at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                InnoLink by Dowok shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of the Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">9. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of 
                Tunisia, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-c-5 mb-4">10. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms, contact us at:
                <br />
                <strong>Email:</strong> legal@innolink.com
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

export default TermsOfService;