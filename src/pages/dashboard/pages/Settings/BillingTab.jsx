import React, { useState } from 'react';
import Card from '../../../../components/common/Card';

const BillingTab = () => {
  const [activeSubscription, setActiveSubscription] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/24', isDefault: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '06/25', isDefault: false }
  ]);
  const [billingHistory, setBillingHistory] = useState([
    { id: 1, date: '2023-10-15', amount: '89.99 TND', plan: 'Pro Monthly', status: 'Paid', invoice: 'INV-2023-10-001' },
    { id: 2, date: '2023-09-15', amount: '89.99 TND', plan: 'Pro Monthly', status: 'Paid', invoice: 'INV-2023-09-001' },
    { id: 3, date: '2023-08-15', amount: '89.99 TND', plan: 'Pro Monthly', status: 'Paid', invoice: 'INV-2023-08-001' }
  ]);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [showEditBillingInfo, setShowEditBillingInfo] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false
  });

  const [billingInfo, setBillingInfo] = useState({
    email: 'sophie.martin@example.com',
    phone: '+216 12 345 678',
    firstName: 'Sophie',
    lastName: 'Martin',
    addressLine1: '123 AI Research Street',
    addressLine2: '',
    city: 'Tunis',
    state: 'Tunis',
    postalCode: '1001',
    country: 'Tunisia'
  });

  const [editBillingInfo, setEditBillingInfo] = useState({ ...billingInfo });

  const plans = {
    free: {
      name: 'Free',
      price: { monthly: '0 TND', annual: '0 TND' },
      features: [
        '5 projects',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Limited API access'
      ]
    },
    pro: {
      name: 'Pro',
      price: { monthly: '89.99 TND', annual: '899 TND' },
      features: [
        'Unlimited projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Full API access',
        'Custom domains',
        'Team members (up to 5)'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: '299 TND', annual: '2,999 TND' },
      features: [
        'Unlimited everything',
        '1TB storage',
        'Premium analytics',
        '24/7 dedicated support',
        'Advanced API access',
        'Custom domains + SSL',
        'Unlimited team members',
        'SAML/SSO integration',
        'Custom branding'
      ]
    }
  };

  const showMessage = (title, message) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setShowMessageDialog(true);
  };

  const handleCloseMessageDialog = () => {
    setShowMessageDialog(false);
  };

  const handlePlanChange = (plan) => {
    setActiveSubscription(plan);
    showMessage('Subscription Changed', `Subscription changed to ${plans[plan].name} plan`);
  };

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    showMessage('Payment Method Updated', 'Default payment method updated');
  };

  const handleDownloadInvoice = (invoiceId) => {
    // Create a sample invoice PDF content
    const invoiceContent = generateInvoiceContent(invoiceId);
    
    // Create a Blob object with the invoice content
    const blob = new Blob([invoiceContent], { type: 'application/pdf' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceId}.pdf`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('Invoice Downloaded', `Invoice ${invoiceId} has been downloaded successfully`);
  };

  const generateInvoiceContent = (invoiceId) => {
    // This would generate actual PDF content in a real application
    // For demo purposes, we're creating a simple text representation
    const invoice = billingHistory.find(item => item.invoice === invoiceId);
    
    return `
      INNOLINK - INVOICE
      ===================
      
      Invoice Number: ${invoiceId}
      Date: ${invoice?.date || 'N/A'}
      Plan: ${invoice?.plan || 'N/A'}
      Amount: ${invoice?.amount || 'N/A'}
      Status: ${invoice?.status || 'N/A'}
      
      Billed To:
      ${billingInfo.firstName} ${billingInfo.lastName}
      ${billingInfo.email}
      ${billingInfo.addressLine1}
      ${billingInfo.addressLine2 ? billingInfo.addressLine2 + '\n' : ''}
      ${billingInfo.city}, ${billingInfo.state} ${billingInfo.postalCode}
      ${billingInfo.country}
      
      Payment Method:
      Visa ending in 4242
      
      Thank you for your business!
      
      ===================
      This is a demo invoice for testing purposes.
    `;
  };

  const handleAddPaymentMethod = () => {
    setShowAddPaymentMethod(true);
  };

  const handleCloseAddPaymentMethod = () => {
    setShowAddPaymentMethod(false);
    setNewPaymentMethod({
      cardNumber: '',
      cardHolder: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      isDefault: false
    });
  };

  const handleEditBillingInfo = () => {
    setShowEditBillingInfo(true);
    setEditBillingInfo({ ...billingInfo });
  };

  const handleCloseEditBillingInfo = () => {
    setShowEditBillingInfo(false);
  };

  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setEditBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveBillingInfo = (e) => {
    e.preventDefault();
    setBillingInfo({ ...editBillingInfo });
    setShowEditBillingInfo(false);
    showMessage('Billing Information Updated', 'Your billing information has been updated successfully');
  };

  const handleNewPaymentMethodChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPaymentMethod(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    // Format the card number with spaces every 4 digits
    if (value.length > 0) {
      value = value.match(/.{1,4}/g).join(' ');
    }
    
    setNewPaymentMethod(prev => ({
      ...prev,
      cardNumber: value
    }));
  };

  const handleSubmitPaymentMethod = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newPaymentMethod.cardNumber || newPaymentMethod.cardNumber.replace(/\s/g, '').length !== 16) {
      showMessage('Invalid Card', 'Please enter a valid 16-digit card number');
      return;
    }
    
    if (!newPaymentMethod.cardHolder) {
      showMessage('Invalid Name', 'Please enter the card holder name');
      return;
    }
    
    if (!newPaymentMethod.expiryMonth || !newPaymentMethod.expiryYear) {
      showMessage('Invalid Expiry', 'Please select expiry month and year');
      return;
    }
    
    if (!newPaymentMethod.cvv || newPaymentMethod.cvv.length !== 3) {
      showMessage('Invalid CVV', 'Please enter a valid 3-digit CVV');
      return;
    }
    
    // Determine card type based on first digit
    const cardNumber = newPaymentMethod.cardNumber.replace(/\s/g, '');
    let cardType = 'credit';
    if (cardNumber.startsWith('4')) {
      cardType = 'visa';
    } else if (cardNumber.startsWith('5')) {
      cardType = 'mastercard';
    } else if (cardNumber.startsWith('3')) {
      cardType = 'amex';
    }
    
    // Create new payment method
    const newMethod = {
      id: Math.max(...paymentMethods.map(m => m.id), 0) + 1,
      type: cardType,
      last4: cardNumber.slice(-4),
      expiry: `${newPaymentMethod.expiryMonth}/${newPaymentMethod.expiryYear.slice(-2)}`,
      isDefault: newPaymentMethod.isDefault
    };
    
    // If setting as default, update all other methods
    let updatedMethods = [...paymentMethods, newMethod];
    if (newPaymentMethod.isDefault) {
      updatedMethods = updatedMethods.map(method => ({
        ...method,
        isDefault: method.id === newMethod.id
      }));
    }
    
    setPaymentMethods(updatedMethods);
    handleCloseAddPaymentMethod();
    showMessage('Payment Method Added', 'Your new payment method has been added successfully');
  };

  const handleCancelSubscription = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancelSubscription = () => {
    setActiveSubscription('free');
    setShowCancelConfirm(false);
    showMessage('Subscription Cancelled', 'Your subscription has been cancelled. You have been downgraded to the Free plan.');
  };

  const cancelCancelSubscription = () => {
    setShowCancelConfirm(false);
  };

  const handleDeletePaymentMethod = (id) => {
    if (paymentMethods.find(method => method.id === id)?.isDefault) {
      showMessage('Cannot Delete', 'Cannot delete the default payment method. Please set another payment method as default first.');
      return;
    }
    
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
    showMessage('Payment Method Deleted', 'Payment method deleted successfully');
  };

  const currentPlan = plans[activeSubscription];
  const nextBillingDate = new Date();
  nextBillingDate.setDate(nextBillingDate.getDate() + 30);
  const formattedNextBilling = nextBillingDate.toLocaleDateString();

  // Generate expiry years (current year to 10 years ahead)
  const currentYear = new Date().getFullYear();
  const expiryYears = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div className="relative">
      {/* Cancel Confirmation Dialog */}
      {showCancelConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm" onClick={cancelCancelSubscription}></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-textprimary mb-4">
              Cancel Subscription
            </h3>
            <p className="text-textsecondary mb-6">
              Are you sure you want to cancel your subscription? You will be downgraded to the Free plan at the end of your current billing period.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelCancelSubscription}
                className="px-4 py-2 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Keep Subscription
              </button>
              <button
                onClick={confirmCancelSubscription}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Dialog */}
      {showAddPaymentMethod && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm" onClick={handleCloseAddPaymentMethod}></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-textprimary mb-4">
              Add Payment Method
            </h3>
            
            <form onSubmit={handleSubmitPaymentMethod}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={newPaymentMethod.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  maxLength={19}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Card Holder Name *
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={newPaymentMethod.cardHolder}
                  onChange={handleNewPaymentMethodChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    Expiry Date *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="expiryMonth"
                      value={newPaymentMethod.expiryMonth}
                      onChange={handleNewPaymentMethodChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                      required
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <select
                      name="expiryYear"
                      value={newPaymentMethod.expiryYear}
                      onChange={handleNewPaymentMethodChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                      required
                    >
                      <option value="">Year</option>
                      {expiryYears.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={newPaymentMethod.cvv}
                    onChange={handleNewPaymentMethodChange}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={newPaymentMethod.isDefault}
                    onChange={handleNewPaymentMethodChange}
                    className="rounded border-border text-accentblue focus:ring-accentblue"
                  />
                  <span className="ml-2 text-sm text-textprimary">Set as default payment method</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseAddPaymentMethod}
                  className="px-4 py-2 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Add Payment Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Billing Information Dialog */}
      {showEditBillingInfo && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm" onClick={handleCloseEditBillingInfo}></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl mx-4 shadow-xl border border-gray-200 overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold text-textprimary mb-6">
              Edit Billing Information
            </h3>
            
            <form onSubmit={handleSaveBillingInfo}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editBillingInfo.firstName}
                    onChange={handleBillingInfoChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editBillingInfo.lastName}
                    onChange={handleBillingInfoChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editBillingInfo.email}
                    onChange={handleBillingInfoChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editBillingInfo.phone}
                    onChange={handleBillingInfoChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={editBillingInfo.addressLine1}
                  onChange={handleBillingInfoChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={editBillingInfo.addressLine2}
                  onChange={handleBillingInfoChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={editBillingInfo.city}
                    onChange={handleBillingInfoChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={editBillingInfo.state}
                    onChange={handleBillingInfoChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={editBillingInfo.postalCode}
                    onChange={handleBillingInfoChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={editBillingInfo.country}
                  onChange={handleBillingInfoChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseEditBillingInfo}
                  className="px-6 py-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Dialog */}
      {showMessageDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm" onClick={handleCloseMessageDialog}></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-textprimary mb-4">
              {dialogTitle}
            </h3>
            <p className="text-textsecondary mb-6">
              {dialogMessage}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseMessageDialog}
                className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Current Plan Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-textprimary mb-6">Current Plan</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-800">{currentPlan.name} Plan</h3>
                <p className="text-blue-600">
                  {billingCycle === 'monthly' ? currentPlan.price.monthly : currentPlan.price.annual} 
                  / {billingCycle === 'monthly' ? 'month' : 'year'}
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <p className="text-blue-600 text-sm mt-2">
              Next billing date: {formattedNextBilling}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-textprimary mb-3">Plan Features</h4>
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span className="text-textsecondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {activeSubscription !== 'free' && (
            <button 
              onClick={handleCancelSubscription}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
            >
              <i className="fas fa-times-circle mr-2"></i>
              Cancel Subscription
            </button>
          )}
        </Card>

        {/* Available Plans Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-textprimary mb-6">Available Plans</h2>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleBillingCycleChange('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-accentblue text-white'
                  : 'bg-surface text-textsecondary hover:bg-gray-100'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => handleBillingCycleChange('annual')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                billingCycle === 'annual'
                  ? 'bg-accentblue text-white'
                  : 'bg-surface text-textsecondary hover:bg-gray-100'
              }`}
            >
              Annual Billing (Save 17%)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`border rounded-lg p-6 ${
                  activeSubscription === key
                    ? 'border-accentblue ring-2 ring-accentblue ring-opacity-50'
                    : 'border-border hover:border-accentblue'
                }`}
              >
                <h3 className="font-semibold text-textprimary mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-textprimary">
                    {billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                  </span>
                  <span className="text-textsecondary">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                      <span className="text-textsecondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanChange(key)}
                  className={`w-full py-2 rounded-lg font-medium ${
                    activeSubscription === key
                      ? 'bg-gray-200 text-textsecondary cursor-not-allowed'
                      : 'bg-accentblue text-white hover:bg-blue-600'
                  }`}
                  disabled={activeSubscription === key}
                >
                  {activeSubscription === key ? 'Current Plan' : 'Upgrade Plan'}
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Methods Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-textprimary">Payment Methods</h2>
            <button
              onClick={handleAddPaymentMethod}
              className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm"
            >
              <i className="fas fa-plus mr-2"></i>
              Add Payment Method
            </button>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-8 bg-white border rounded flex items-center justify-center mr-4">
                    <i className={`fab fa-${method.type} text-2xl ${
                      method.type === 'visa' ? 'text-blue-800' : 
                      method.type === 'mastercard' ? 'text-red-600' : 
                      method.type === 'amex' ? 'text-blue-600' : 'text-gray-600'
                    }`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-textprimary">•••• •••• •••• {method.last4}</p>
                    <p className="text-sm text-textsecondary">Expires {method.expiry}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {method.isDefault ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefaultPayment(method.id)}
                      className="text-accentblue hover:text-blue-600 text-sm"
                    >
                      Set as Default
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeletePaymentMethod(method.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Billing History Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-textprimary mb-6">Billing History</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-textsecondary font-medium">Date</th>
                  <th className="text-left py-3 text-textsecondary font-medium">Amount</th>
                  <th className="text-left py-3 text-textsecondary font-medium">Plan</th>
                  <th className="text-left py-3 text-textsecondary font-medium">Status</th>
                  <th className="text-left py-3 text-textsecondary font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((item) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="py-4 text-textprimary">{item.date}</td>
                    <td className="py-4 text-textprimary">{item.amount}</td>
                    <td className="py-4 text-textprimary">{item.plan}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleDownloadInvoice(item.invoice)}
                        className="text-accentblue hover:text-blue-600 text-sm font-medium flex items-center"
                      >
                        <i className="fas fa-download mr-2"></i>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Usage Statistics Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-textprimary mb-6">Usage Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-textprimary">Storage</h3>
                <span className="text-sm text-textsecondary">45GB / 100GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-accentblue h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-textprimary">Projects</h3>
                <span className="text-sm text-textsecondary">8 / Unlimited</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-textprimary">API Calls</h3>
                <span className="text-sm text-textsecondary">12,345 / 50,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Billing Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-textprimary mb-6">Billing Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-textprimary mb-3">Contact Information</h3>
              <p className="text-textsecondary">{billingInfo.email}</p>
              <p className="text-textsecondary">{billingInfo.phone}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-textprimary mb-3">Billing Address</h3>
              <p className="text-textsecondary">{billingInfo.firstName} {billingInfo.lastName}</p>
              <p className="text-textsecondary">{billingInfo.addressLine1}</p>
              {billingInfo.addressLine2 && <p className="text-textsecondary">{billingInfo.addressLine2}</p>}
              <p className="text-textsecondary">{billingInfo.city}, {billingInfo.state} {billingInfo.postalCode}</p>
              <p className="text-textsecondary">{billingInfo.country}</p>
            </div>
          </div>
          
          <button 
            onClick={handleEditBillingInfo}
            className="mt-4 px-4 py-2 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm"
          >
            Edit Billing Information
          </button>
        </Card>
      </div>
    </div>
  );
};

export default BillingTab;