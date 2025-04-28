
import React, { useState, useRef, useEffect } from 'react';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you with solar energy today?", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Sample responses for the AI
  const aiResponses = [
    "Our solar panels have a 25-year warranty and typically last 30+ years.",
    "The average Ishaan Solar installation pays for itself in 5-7 years.",
    "Yes, we handle all permits and paperwork as part of our service.",
    "We offer flexible financing options with rates as low as 3.99%.",
    "Our installation team typically completes the process in 1-2 days.",
    "Solar panels can work during cloudy days, though with reduced efficiency.",
    "Yes, you can monitor your system's performance through our mobile app.",
    "Our maintenance packages start at ₹4,999 per year.",
    "Ishaan Solar qualifies for the 30% federal tax credit and various state incentives."
  ];

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    
    const userMessageId = messages.length + 1;
    setMessages([...messages, { id: userMessageId, text: newMessage, isUser: true }]);
    setNewMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages(msgs => [...msgs, { 
        id: msgs.length + 1, 
        text: randomResponse, 
        isUser: false 
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-solar-dark text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90"
      >
        <span className="text-2xl">💬</span>
      </button>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3 className="font-medium">Ishaan Solar Assistant</h3>
        <button onClick={toggleChat} className="text-white hover:text-gray-300">
          ✕
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`chat-message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-grow p-2 focus:outline-none"
        />
        <button 
          onClick={handleSend} 
          className="bg-solar-yellow text-solar-dark px-4 py-2 ml-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
