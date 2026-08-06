"use client"

const QuickQuestions = ({ onQuestionClick }) => {
  const questions = [
    "What career is best for me?",
    "Which stream should I choose after 10th?",
    "Tell me about engineering colleges",
    "What are the scholarship opportunities?",
  ]

  return (
    <div className="p-4 border-t border-gray-200">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</h4>
      <div className="grid grid-cols-1 gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="text-left text-sm p-2 rounded-lg bg-gray-600 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickQuestions
