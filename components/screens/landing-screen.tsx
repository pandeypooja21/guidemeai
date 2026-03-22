'use client'

import { Button } from '@/components/ui/button'
import { GuideMeLogo } from '@/components/guideme-logo'
import { useAppStore } from '@/lib/store'
import { ArrowRight, Sparkles } from 'lucide-react'

export function LandingScreen() {
  const setScreen = useAppStore((state) => state.setScreen)

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Logo */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <GuideMeLogo size="lg" />
        </div>

        {/* Tagline */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Your AI-Powered
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Career Counselor
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto text-pretty">
            Get personalized career guidance, discover your potential, and navigate your professional journey with confidence.
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            size="lg"
            onClick={() => setScreen('onboarding')}
            className="group relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-600 hover:via-fuchsia-600 hover:to-pink-600 text-primary-foreground shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Free to use</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>AI-powered insights</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500" />
            <span>Private & secure</span>
          </div>
        </div>
      </div>
    </div>
  )
}
