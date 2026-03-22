'use client'

import { useAppStore } from '@/lib/store'
import { LandingScreen } from '@/components/screens/landing-screen'
import { OnboardingScreen } from '@/components/screens/onboarding-screen'
import { ChatScreen } from '@/components/screens/chat-screen'

export default function Home() {
  const screen = useAppStore((state) => state.screen)

  return (
    <main className="min-h-screen bg-background">
      {screen === 'landing' && <LandingScreen />}
      {screen === 'onboarding' && <OnboardingScreen />}
      {screen === 'chat' && <ChatScreen />}
    </main>
  )
}
