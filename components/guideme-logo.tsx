'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function GuideMeLogo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(sizes[size], 'relative')}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22" stroke="url(#logo-gradient)" strokeWidth="2.5" fill="none" />
          <path
            d="M24 12L24 24M24 24L32 28M24 24L16 28"
            stroke="url(#logo-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="24" r="4" fill="url(#logo-gradient)" />
          <circle cx="24" cy="12" r="3" fill="url(#logo-gradient)" />
          <circle cx="32" cy="28" r="3" fill="url(#logo-gradient)" />
          <circle cx="16" cy="28" r="3" fill="url(#logo-gradient)" />
        </svg>
      </div>
      <span className={cn(
        'font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent',
        size === 'sm' && 'text-lg',
        size === 'md' && 'text-2xl',
        size === 'lg' && 'text-3xl'
      )}>
        GuideMeAI
      </span>
    </div>
  )
}
