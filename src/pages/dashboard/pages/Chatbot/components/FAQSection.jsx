// src/pages/dashboard/pages/Chatbot/components/FAQSection.jsx
import React, { useState } from 'react';
import Card from '../../../../../components/common/Card';

const FAQSection = ({ category, onQuestionClick }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const handleAskAboutThis = (questionText, event) => {
    event.stopPropagation(); // Prevent the accordion from toggling
    onQuestionClick(questionText);
    
    // Add visual feedback
    const button = event.currentTarget;
    button.classList.add('bg-accentblue', 'text-white');
    setTimeout(() => {
      button.classList.remove('bg-accentblue', 'text-white');
    }, 300);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-accentblue bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
          <i className={`${category.icon} text-accentblue`}></i>
        </div>
        <h3 className="text-lg font-semibold text-textprimary">{category.title}</h3>
      </div>

      <div className="space-y-3">
        {category.questions.map(question => (
          <div key={question.id} className="border border-border rounded-lg overflow-hidden faq-item">
            <button
              onClick={() => toggleQuestion(question.id)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex justify-between items-center"
            >
              <span className="font-medium text-textprimary">{question.question}</span>
              <i className={`fas ${expandedQuestion === question.id ? 'fa-chevron-up' : 'fa-chevron-down'} text-textlight`}></i>
            </button>
            
            {expandedQuestion === question.id && (
              <div className="px-4 py-3 bg-gray-50 border-t border-border">
                <p className="text-textsecondary text-sm mb-3">{question.answer}</p>
                <button
                  onClick={(e) => handleAskAboutThis(question.question, e)}
                  className="flex items-center text-accentblue hover:text-blue-600 text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-accentblue hover:bg-opacity-10"
                >
                  <i className="fas fa-comment-dots mr-2"></i>
                  <span>Ask about this</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FAQSection;

