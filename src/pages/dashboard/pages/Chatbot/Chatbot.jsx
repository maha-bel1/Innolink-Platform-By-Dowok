// src/pages/dashboard/pages/Chatbot/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import Card from '../../../../components/common/Card'; // Updated path
import ChatMessage from './components/ChatMessage';
import FAQSection from './components/FAQSection';
import QuickReplies from './components/QuickReplies';
import ChatHeader from './components/ChatHeader';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm InnoLink Assistant. How can I help you with your innovation journey today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [showSupportOptions, setShowSupportOptions] = useState(false);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add event listener for support requests from sidebar
  useEffect(() => {
    const handleSupportRequest = () => {
      setShowSupportOptions(true);
      setActiveTab('faq');
      
      // Scroll to support section after a short delay to allow tab switch
      setTimeout(() => {
        const supportSection = document.getElementById('support-section');
        if (supportSection) {
          supportSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

    window.addEventListener('showSupportOptions', handleSupportRequest);
    
    return () => {
      window.removeEventListener('showSupportOptions', handleSupportRequest);
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        alert('Microphone access is not allowed. Please enable microphone permissions in your browser settings.');
      } else {
        alert('Speech recognition failed. Please try again or type your message.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // FAQ data
  const faqCategories = [
    {
      id: 'funding',
      title: 'Funding & Grants',
      icon: 'fas fa-coins',
      questions: [
        {
          id: 1,
          question: 'How do I apply for funding?',
          answer: 'You can apply for funding through the Funding section. Navigate to "Apply for Funding" and complete the application form with your project details, budget, and team information.'
        },
        {
          id: 2,
          question: 'What types of projects are eligible?',
          answer: 'We fund innovative projects in AI, biotechnology, sustainable tech, medical research, and digital transformation. Projects should demonstrate innovation, feasibility, and potential impact.'
        },
        {
          id: 3,
          question: 'When are the application deadlines?',
          answer: 'Deadlines vary by program. Most grants have quarterly deadlines. Check the specific funding opportunity details for exact dates.'
        },
        {
          id: 8,
          question: 'What is the maximum funding amount?',
          answer: 'Funding amounts vary by program. Most grants range from 50,000 TND to 500,000 TND, with some exceptional projects qualifying for up to 1,000,000 TND in funding.'
        }
      ]
    },
    {
      id: 'projects',
      title: 'Projects & Collaboration',
      icon: 'fas fa-project-diagram',
      questions: [
        {
          id: 4,
          question: 'How do I find collaboration partners?',
          answer: 'Use our AI matching system in the Collaboration section. The system will suggest partners based on your skills, interests, and project requirements.'
        },
        {
          id: 5,
          question: 'Can I invite external collaborators?',
          answer: 'Yes! You can invite external team members via email. They will receive an invitation to join the platform and your project.'
        },
        {
          id: 9,
          question: 'How many collaborators can I have per project?',
          answer: 'You can have up to 10 collaborators per project. For larger teams, please contact our support team for special arrangements.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: 'fas fa-cogs',
      questions: [
        {
          id: 6,
          question: 'How do I reset my password?',
          answer: 'Click on "Forgot Password" on the login page. You will receive an email with instructions to reset your password.'
        },
        {
          id: 7,
          question: 'Is my data secure?',
          answer: 'Yes, we use industry-standard encryption and security practices to protect your data and intellectual property.'
        },
        {
          id: 10,
          question: 'How do I update my profile information?',
          answer: 'Go to your profile settings from the top-right menu. You can update your personal information, skills, and preferences there.'
        }
      ]
    },
    {
      id: 'events',
      title: 'Events & Webinars',
      icon: 'fas fa-calendar-alt',
      questions: [
        {
          id: 11,
          question: 'How do I register for events?',
          answer: 'Navigate to the Events section, browse available events, and click "Register" on any event you want to attend. You will receive a confirmation email with joining instructions.'
        },
        {
          id: 12,
          question: 'Are events recorded?',
          answer: 'Yes, most webinars and workshops are recorded and made available to registered participants within 24 hours after the event.'
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFaqs(faqCategories);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = faqCategories.map(category => ({
      ...category,
      questions: category.questions.filter(question => 
        question.question.toLowerCase().includes(query) ||
        question.answer.toLowerCase().includes(query)
      )
    })).filter(category => category.questions.length > 0);

    setFilteredFaqs(filtered);
  }, [searchQuery]);

  const handleSendMessage = (messageText = null) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if it's a question from FAQ
    if (lowerMessage.includes('how do i apply for funding')) {
      return {
        id: Date.now() + 1,
        text: "To apply for funding, navigate to the Funding section and click on 'Apply for Funding'. You'll need to provide project details, budget information, and team credentials. Would you like me to guide you through the application process?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Start application', 'See requirements', 'Eligibility check']
      };
    } else if (lowerMessage.includes('what types of projects are eligible')) {
      return {
        id: Date.now() + 1,
        text: "We fund innovative projects in various domains including AI, biotechnology, sustainable tech, medical research, and digital transformation. Projects should demonstrate clear innovation, feasibility, and potential impact. Would you like to check if your project qualifies?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Check eligibility', 'View project categories', 'See examples']
      };
    } else if (lowerMessage.includes('when are the application deadlines')) {
      return {
        id: Date.now() + 1,
        text: "Application deadlines vary by program. Most grants have quarterly deadlines, while some special programs may have different schedules. I can show you the current open opportunities with their specific deadlines. Would you like to see them?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Show open grants', 'Calendar view', 'Set reminders']
      };
    } else if (lowerMessage.includes('how do i find collaboration partners')) {
      return {
        id: Date.now() + 1,
        text: "Our AI matching system in the Collaboration section can help you find perfect partners! It analyzes skills, interests, and project requirements to suggest compatible collaborators. Would you like to explore potential partners now?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Find partners', 'Browse profiles', 'Create partnership request']
      };
    } else if (lowerMessage.includes('can i invite external collaborators')) {
      return {
        id: Date.now() + 1,
        text: "Absolutely! You can invite external team members via email. They'll receive a secure invitation to join the platform and your project. All external collaborators go through a verification process for security. Ready to invite someone?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Invite collaborator', 'See permissions', 'Learn about security']
      };
    } else if (lowerMessage.includes('how do i reset my password')) {
      return {
        id: Date.now() + 1,
        text: "To reset your password, click on 'Forgot Password' on the login page. You'll receive an email with a secure link to create a new password. Need me to send you the password reset link now?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Send reset link', 'Security tips', 'Contact support']
      };
    } else if (lowerMessage.includes('is my data secure')) {
      return {
        id: Date.now() + 1,
        text: "Yes! We use industry-standard encryption, regular security audits, and comply with data protection regulations. Your intellectual property is protected through secure protocols and confidentiality agreements. Want to learn more about our security measures?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Security details', 'Privacy policy', 'Data protection']
      };
    } else if (lowerMessage.includes('funding') || lowerMessage.includes('grant')) {
      return {
        id: Date.now() + 1,
        text: "I can help you with funding opportunities! We have several grants available for innovative projects. Would you like to explore current funding options or learn how to apply?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Show funding options', 'How to apply', 'Eligibility criteria']
      };
    } else if (lowerMessage.includes('project') || lowerMessage.includes('collaboration')) {
      return {
        id: Date.now() + 1,
        text: "Great! For project collaboration, I can help you find potential partners, set up meetings, or manage existing projects. What would you like to do?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Find partners', 'Schedule meeting', 'Project management']
      };
    } else if (lowerMessage.includes('trend') || lowerMessage.includes('research')) {
      return {
        id: Date.now() + 1,
        text: "I have access to the latest technology trends and research insights. Which area are you interested in? AI, Biotechnology, or perhaps Sustainable Tech?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['AI Trends', 'Biotech Research', 'Sustainability', 'All areas']
      };
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return {
        id: Date.now() + 1,
        text: "Hello there! 👋 I'm here to help you navigate the InnoLink platform. You can ask me about funding, partnerships, events, or anything else related to innovation!",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Funding help', 'Find partners', 'Events', 'Technical support']
      };
    } else {
      const defaultResponses = [
        "I'd be happy to help you with that! Could you provide more details about what you're looking for?",
        "That's an interesting question! Let me help you find the right information. Could you tell me more about what you need?",
        "I'm here to assist you! Would you like help with funding, projects, technology trends, or something else specific?"
      ];
      
      return {
        id: Date.now() + 1,
        text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Funding information', 'Project help', 'Technical support', 'Browse FAQs']
      };
    }
  };

  const handleQuickReply = (replyText) => {
    handleSendMessage(replyText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmailSupport = () => {
    const email = 'support@innolink.com';
    const subject = 'Support Request - InnoLink Assistance';
    const body = 'Hello InnoLink Support Team,\n\nI need assistance with the following:\n\n[Please describe your issue or question here]\n\nThank you,\n[Your Name]';
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCallSupport = () => {
    const phoneNumber = '+1-555-123-4567';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert(`Please call our support team at: ${phoneNumber}\n\nSupport Hours: Monday-Friday, 9AM-6PM EST`);
    }
  };

  const handleQuestionClick = (questionText) => {
    setActiveTab('chat');
    setTimeout(() => {
      handleSendMessage(questionText);
      scrollToBottom();
    }, 100);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled automatically by the useEffect
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleVoiceInput = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or another supported browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      setIsListening(true);
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      alert('Error starting speech recognition. Please check your microphone permissions.');
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller file.');
      return;
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid file type (PDF, DOC, DOCX, TXT, JPEG, PNG, GIF).');
      return;
    }

    // Create a user message with the file info
    const userMessage = {
      id: Date.now(),
      text: `Uploaded file: ${file.name}`,
      sender: 'user',
      timestamp: new Date(),
      type: 'file',
      file: file
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response after file upload
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: `I've received your file "${file.name}". How would you like me to help you with this document?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: ['Summarize document', 'Extract key points', 'Find related resources']
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);

    // Reset the file input
    e.target.value = '';
  };

  const handleSupportClick = () => {
    setShowSupportOptions(true);
    setActiveTab('faq');
    
    // Scroll to support section after a short delay to allow tab switch
    setTimeout(() => {
      const supportSection = document.getElementById('support-section');
      if (supportSection) {
        supportSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCloseSupportOptions = () => {
    setShowSupportOptions(false);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-textprimary">AI Assistant</h1>
        <p className="text-textsecondary">Get instant help and answers to your questions</p>
      </div>

      <div className="space-y-6">
        <div className="border-b border-border">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chat'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              <i className="fas fa-comment-dots mr-2"></i>Chat
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'faq'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              <i className="fas fa-question-circle mr-2"></i>FAQ & Help
            </button>
          </nav>
        </div>

        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden chat-container">
            <ChatHeader onSupportClick={handleSupportClick} />
            
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {isTyping && (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accentblue rounded-full flex items-center justify-center">
                      <i className="fas fa-robot text-white text-sm"></i>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>
            </div>

            {messages.length > 0 && messages[messages.length - 1].quickReplies && (
              <QuickReplies 
                replies={messages[messages.length - 1].quickReplies} 
                onReply={handleQuickReply}
              />
            )}

            <div className="border-t border-border p-4 bg-white">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue pr-12 chat-input"
                  />
                  <div className="absolute right-3 top-3 flex space-x-2">
                    <button 
                      onClick={handleFileUpload}
                      className="text-textlight hover:text-accentblue file-upload-button"
                      title="Attach file"
                    >
                      <i className="fas fa-paperclip"></i>
                    </button>
                    <button 
                      onClick={handleVoiceInput}
                      className={`${isListening ? 'text-accentblue animate-pulse' : 'text-textlight hover:text-accentblue'}`}
                      title={isListening ? "Stop listening" : "Voice input"}
                      disabled={!speechSupported}
                    >
                      <i className="fas fa-microphone"></i>
                    </button>
                  </div>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  />
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="px-6 py-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              
              <div className="mt-2 text-xs text-textsecondary">
                <span>Press Enter to send • Shift+Enter for new line</span>
                {isListening && (
                  <span className="ml-3 text-accentblue">
                    <i className="fas fa-circle animate-pulse mr-1"></i>
                    Listening... Click microphone again to stop
                  </span>
                )}
                {!speechSupported && (
                  <span className="ml-3 text-textlight">
                    <i className="fas fa-info-circle mr-1"></i>
                    Voice input not supported in this browser
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-textprimary">Frequently Asked Questions</h2>
              <form onSubmit={handleSearchSubmit} className="relative">
                <i className="fas fa-search absolute left-3 top-2.5 text-textlight"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search FAQs..."
                  className="pl-10 pr-10 py-2 bg-surface border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accentblue w-64"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-2.5 text-textlight hover:text-accentblue"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </form>
            </div>

            {searchQuery && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="fas fa-search text-blue-600 mr-2"></i>
                  <span className="text-blue-800 text-sm">
                    {filteredFaqs.reduce((total, category) => total + category.questions.length, 0)} 
                    results found for "{searchQuery}"
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map(category => (
                  <FAQSection 
                    key={category.id} 
                    category={category} 
                    onQuestionClick={handleQuestionClick} 
                  />
                ))
              ) : searchQuery ? (
                <Card className="p-8 text-center">
                  <i className="fas fa-search text-4xl text-textlight mb-4"></i>
                  <h3 className="text-lg font-semibold text-textprimary mb-2">No results found</h3>
                  <p className="text-textsecondary mb-4">
                    No FAQs match your search for "{searchQuery}". Try different keywords or browse all categories.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Clear Search
                  </button>
                </Card>
              ) : (
                faqCategories.map(category => (
                  <FAQSection 
                    key={category.id} 
                    category={category} 
                    onQuestionClick={handleQuestionClick} 
                  />
                ))
              )}
            </div>

            <Card id="support-section" className="p-6 text-center">
              {showSupportOptions && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-blue-800">How can we help you?</h4>
                    <button 
                      onClick={handleCloseSupportOptions}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <p className="text-blue-700 text-sm mt-2">
                    We're here to assist you with any questions or issues you might have.
                  </p>
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-textprimary mb-2">Still need help?</h3>
              <p className="text-textsecondary mb-4">Our support team is here to assist you</p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={handleEmailSupport}
                  className="px-4 py-2 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 transition-colors support-button"
                >
                  Email Support
                </button>
                <button 
                  onClick={handleCallSupport}
                  className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors support-button"
                >
                  Call Support
                </button>
              </div>
              <div className="mt-4 text-xs text-textsecondary">
                <p>Email: support@innolink.com</p>
                <p>Phone: +216 55-555-555</p>
                <p>Emergency support available 24/7 for critical issues</p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;