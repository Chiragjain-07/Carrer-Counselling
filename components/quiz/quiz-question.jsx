"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

export default function QuizQuestion({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
}) {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-blue-400">
            {Math.round((questionNumber / totalQuestions) * 100)}% Complete
          </span>
        </div>
        <CardTitle className="text-xl text-white text-balance">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAnswer} onValueChange={onAnswerSelect}>
          <div className="space-y-3">
            {options.map((option, index) => {
              // Handle both old format {text: "...", value: "..."} and new format ["option1", "option2"]
              const optionText = typeof option === "string" ? option : option.text || option
              const optionValue = typeof option === "string" ? index : option.value !== undefined ? option.value : index

              return (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={optionValue}
                    id={`option-${index}`}
                    className="border-gray-600 text-blue-500"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {optionText}
                  </Label>
                </div>
              )
            })}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
