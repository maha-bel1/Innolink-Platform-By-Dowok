// src/pages/dashboard/pages/funding/Funding.jsx
import React from 'react';
import FundingForm from './FundingForm';
import FundingDetails from './FundingDetails';
import ApplicationDetails from './ApplicationDetails';

const Funding = () => {
  return (
    <div>
      <h1>Funding Opportunities</h1>
      {/* You can structure this page to show one of the components */}
      {/* or create a tabbed interface to navigate between them */}
      <FundingForm />
      {/* Or show other components based on state/route */}
    </div>
  );
};

export default Funding;