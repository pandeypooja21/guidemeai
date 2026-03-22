'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GuideMeLogo } from '@/components/guideme-logo'
import { useAppStore } from '@/lib/store'
import { ArrowLeft, ArrowRight, Check, User, GraduationCap, Target } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const questions = [
  {
    id: 'name',
    icon: User,
    question: "What's your name?",
    placeholder: "Enter your name",
    description: "Let's get to know you better"
  },
  {
    id: 'qualification',
    icon: GraduationCap,
    question: "What's your current qualification?",
    placeholder: "e.g., Bachelor's in Computer Science, MBA, High School",
    description: "This helps us understand your background"
  },
  {
    id: 'goal',
    icon: Target,
    question: "What's your career goal?",
    placeholder: "e.g., Become a software engineer, Start my own business",
    description: "Tell us where you want to be"
  },
]

export function OnboardingScreen() {
  const { onboardingStep, setOnboardingStep, userProfile, updateProfile, setScreen } = useAppStore()
  const [inputValue, setInputValue] = useState('')

  const currentQuestion = questions[onboardingStep]
  const progress = ((onboardingStep + 1) / questions.length) * 100
  const isLastStep = onboardingStep === questions.length - 1

  const handleNext = () => {
    if (!inputValue.trim()) return

    updateProfile({ [currentQuestion.id]: inputValue.trim() })
    
    if (isLastStep) {
      setScreen('chat')
    } else {
      setOnboardingStep(onboardingStep + 1)
      setInputValue('')
    }
  }

  const handleBack = () => {
    if (onboardingStep === 0) {
      setScreen('landing')
    } else {
      setOnboardingStep(onboardingStep - 1)
      const prevKey = questions[onboardingStep - 1].id as keyof typeof userProfile
      setInputValue(userProfile[prevKey] || '')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleNext()
    }
  }

  const Icon = currentQuestion.icon

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <GuideMeLogo size="sm" />
        <div className="w-20" /> {/* Spacer for centering */}
      </header>

      {/* Progress */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 mt-4">
        <div className="max-w-lg mx-auto space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {onboardingStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>
      </div>

      {/* Question Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div 
          key={onboardingStep}
          className="w-full max-w-lg animate-in fade-in slide-in-from-right-4 duration-500"
        >
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl shadow-purple-500/5">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6">
              <Icon className="w-8 h-8 text-purple-400" />
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {currentQuestion.question}
            </h2>
            <p className="text-muted-foreground mb-8">
              {currentQuestion.description}
            </p>

            {/* Input */}
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentQuestion.placeholder}
              className="h-14 text-lg bg-secondary/50 border-border focus:border-purple-500 focus:ring-purple-500/20 placeholder:text-muted-foreground/50"
              autoFocus
            />

            {/* Action Button */}
            <Button
              onClick={handleNext}
              disabled={!inputValue.trim()}
              className="w-full mt-6 h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-600 hover:via-fuchsia-600 hover:to-pink-600 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLastStep ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Start Chatting
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === onboardingStep
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500'
                    : idx < onboardingStep
                    ? 'bg-purple-500'
                    : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
