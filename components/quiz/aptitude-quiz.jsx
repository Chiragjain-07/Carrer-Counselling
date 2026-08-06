"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import QuizQuestion from "./quiz-question";
import QuizProgress from "./quiz-progress";
import CareerPathCard from "./career-path-card";
import { quizQuestions } from "../data/quizQuestions";
import { calculateFeatureVector } from "../../utils/calculateFeatureVector";
import { getCareerRecommendation } from "../../utils/careerApi";

export default function AptitudeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendedCareer, setRecommendedCareer] = useState(null);
  const [featureScores, setFeatureScores] = useState(null);

  const handleAnswerSelect = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value,
    });
  };

  const handleNext = async () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLoading(true);
      setError("");

      try {
        // Convert answers object to array format expected by calculateFeatureVector
        const answersArray = Array(quizQuestions.length).fill(null);
        Object.keys(answers).forEach((questionIndex) => {
          answersArray[Number.parseInt(questionIndex)] = answers[questionIndex];
        });

        // Calculate feature vector from answers
        const scores = calculateFeatureVector(answersArray, quizQuestions);
        setFeatureScores(scores);

        // Get career recommendation from ML API
        try {
          const response = await getCareerRecommendation(scores);
          console.log("Career API response:", response);
          const career = response.recommended_career || response;
          setRecommendedCareer(career);
          setShowResults(true);
        } catch (error) {
          console.error("[Quiz] API error:", error);
          setRecommendedCareer(career);
          setShowResults(true);
          setError("Using fallback career recommendation due to API error.");
        }

        setShowResults(true);
      } catch (error) {
        console.error("[v0] Quiz submission error:", error);
        setError(
          error.message ||
            "Failed to get career recommendation. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
    setRecommendedCareer(null);
    setFeatureScores(null);
    setError("");
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            AI-Powered Career Assessment
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-pretty">
            Discover your ideal career path with our advanced ML-powered
            assessment. Answer questions across academics, personality, and
            interests to get personalized career recommendations.
          </p>
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-white mb-2">What You'll Get</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• AI-powered career recommendation</li>
                <li>• Detailed career path information</li>
                <li>• Skills and education requirements</li>
                <li>• Salary expectations</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-white mb-2">
                Assessment Details
              </h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• {quizQuestions.length} comprehensive questions</li>
                <li>• Academic abilities testing</li>
                <li>• Personality assessment</li>
                <li>• Interest evaluation</li>
              </ul>
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => setQuizStarted(true)}
            className="bg-green-900 text-white hover:bg-blue-700"
          >
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Your Career Recommendation
            </h1>
            <p className="text-gray-300">
              Based on your responses, our AI recommends the following career
              path:
            </p>
          </div>

          {recommendedCareer && featureScores && (
            <CareerPathCard
              recommendedCareer={recommendedCareer}
              scores={featureScores}
            />
          )}

          <div className="text-center mt-8">
            <Button
              onClick={handleRetakeQuiz}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <QuizProgress
        currentQuestion={currentQuestion + 1}
        totalQuestions={quizQuestions.length}
      />

      {error && (
        <div className="max-w-2xl mx-auto mb-4 p-3 text-sm text-red-300 bg-red-900/20 border border-red-700 rounded-md">
          {error}
        </div>
      )}

      <QuizQuestion
        question={quizQuestions[currentQuestion].question}
        options={quizQuestions[currentQuestion].options}
        selectedAnswer={answers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
        questionNumber={currentQuestion + 1}
        totalQuestions={quizQuestions.length}
        key={currentQuestion}
      />

      <div className="flex justify-between max-w-2xl mx-auto mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0 || isLoading}
          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || isLoading}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {isLoading
            ? "Processing..."
            : currentQuestion === quizQuestions.length - 1
            ? "Get Results"
            : "Next"}
        </Button>
      </div>
    </div>
  );
}
