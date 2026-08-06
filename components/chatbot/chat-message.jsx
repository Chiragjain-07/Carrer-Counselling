const ChatMessage = ({ message, isBot = false, timestamp }) => {
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div className={`flex max-w-xs lg:max-w-md ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        {isBot && (
          <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center mr-2 flex-shrink-0">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <div className={`px-4 py-2 rounded-lg ${isBot ? "bg-zinc-100 text-gray-800" : "bg-zinc-400 text-black"}`}>
          <p className="text-sm">{message}</p>
          {timestamp && <p className={`text-xs mt-1 ${isBot ? "text-black" : "text-black"}`}>{timestamp}</p>}
        </div>
        {!isBot && (
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center ml-2 flex-shrink-0">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
