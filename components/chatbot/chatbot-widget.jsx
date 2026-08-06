"use client"

import { useState, useRef, useEffect } from "react"
import ChatMessage from "./chat-message"
import QuickQuestions from "./quick-questions"

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hi! I'm CareerBot, your AI career guidance assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage) => {
    const responses = {
      "what career is best for me":
        "Based on your interests and skills, I'd recommend taking our aptitude quiz first. It will help identify your strengths and suggest suitable career paths in Science, Commerce, Arts, or Vocational fields.",
      "which stream should i choose after 10th":
        "Great question! The choice depends on your interests and career goals. Science opens doors to engineering and medical fields, Commerce leads to business and finance careers, while Arts offers creative and humanities opportunities. Take our quiz to get personalized recommendations!",
      "tell me about engineering colleges":
        "I can help you find engineering colleges! Check out our College Directory where you can filter by location, specialization, and facilities. We have information about top government and private engineering colleges with their cut-off marks and admission processes.",
      "what are the scholarship opportunities":
        "There are many scholarships available! Visit our Scholarships page to explore options like Merit-based scholarships, Need-based financial aid, and Government schemes. You can filter by eligibility criteria and application deadlines.",
      "how to prepare for entrance exams":
        "Excellent question! I recommend: 1) Understanding the exam pattern, 2) Creating a study schedule, 3) Taking mock tests, 4) Focusing on weak areas. Check our MOOC section for free preparation courses from platforms like NPTEL and Coursera.",
      "what are the job prospects in it":
        "IT has excellent job prospects! Career options include Software Developer, Data Scientist, Cybersecurity Analyst, AI/ML Engineer, and more. The industry offers good growth opportunities and competitive salaries. Would you like specific information about any IT career path?",
      "should i go for arts or science":
        "Both streams have great opportunities! Science leads to technical fields like engineering, medicine, and research. Arts opens doors to creative fields, social sciences, and humanities. Consider your interests, strengths, and career aspirations. Our aptitude quiz can help you decide!",
      "tell me about medical entrance exams":
        "For medical careers, key exams include NEET for MBBS/BDS, and various state-level exams. Preparation requires strong foundation in Physics, Chemistry, and Biology. Check our Timeline page for important dates and our MOOC section for preparation resources.",
    }

    const lowerMessage = userMessage.toLowerCase()

    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        return response
      }
    }

    // Default responses for common patterns
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! I'm here to help with your career guidance questions. You can ask me about streams, colleges, scholarships, or career paths. What would you like to know?"
    }

    if (lowerMessage.includes("thank")) {
      return "You're welcome! I'm always here to help with your career questions. Feel free to explore our quiz, college directory, and other resources. Good luck with your career journey!"
    }

    // Generic helpful response
    return "That's an interesting question! For personalized career guidance, I recommend: 1) Taking our aptitude quiz, 2) Exploring our college directory, 3) Checking scholarship opportunities, or 4) booking a session with our career counselors. Is there a specific area you'd like to focus on?"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      message: inputMessage,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        message: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuestionClick = (question) => {
    setInputMessage(question)
    handleSendMessage()
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">CareerBot</h3>
                <p className="text-xs text-red-100">Online • Career Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg.message} isBot={msg.isBot} timestamp={msg.timestamp} />
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center space-x-1 bg-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && <QuickQuestions onQuestionClick={handleQuestionClick} />}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about careers, colleges, scholarships..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default ChatbotWidget
