import { create } from 'zustand'

export interface UserProfile {
  name: string
  qualification: string
  goal: string
}

interface AppState {
  screen: 'landing' | 'onboarding' | 'chat'
  onboardingStep: number
  userProfile: UserProfile
  setScreen: (screen: AppState['screen']) => void
  setOnboardingStep: (step: number) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  resetApp: () => void
}

const initialProfile: UserProfile = {
  name: '',
  qualification: '',
  goal: '',
}

export const useAppStore = create<AppState>((set) => ({
  screen: 'landing',
  onboardingStep: 0,
  userProfile: initialProfile,
  setScreen: (screen) => set({ screen }),
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  updateProfile: (updates) =>
    set((state) => ({
      userProfile: { ...state.userProfile, ...updates },
    })),
  resetApp: () =>
    set({
      screen: 'landing',
      onboardingStep: 0,
      userProfile: initialProfile,
    }),
}))
