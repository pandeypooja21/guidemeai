'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { GuideMeLogo } from '@/components/guideme-logo'
import { useAppStore } from '@/lib/store'
import { Send, Sparkles, RotateCcw, User, Bot } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const suggestionChips = [
  "What career paths match my skills?",
  "How do I prepare for interviews?",
  "Should I pursue higher education?",
  "Tips for career transition",
]

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function ChatScreen() {
  const { userProfile, resetApp } = useAppStore()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content,
          })),
          userProfile,
        }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.reply || "Kuch issue aa gaya, try again!",
      }])
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Kuch issue aa gaya! Try again 🙏",
      }])
    }
    setIsLoading(false)
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 p-4 md:p-6 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <GuideMeLogo size="sm" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">Hi, {userProfile.name}</span>
            <Button variant="ghost" size="sm" onClick={resetApp} className="text-muted-foreground hover:text-foreground">
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 md:p-6">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 pb-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome, {userProfile.name}!</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                  {"I'm your AI career counselor. Based on your "}
                  <span className="text-purple-400">{userProfile.qualification}</span>
                  {" background and goal to "}
                  <span className="text-pink-400">{userProfile.goal}</span>
                  {", I'm here to help guide your career journey."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {suggestionChips.map((chip, idx) => (
                    <button key={idx} onClick={() => sendMessage(chip)}
                      className="px-4 py-2 rounded-full text-sm bg-secondary/80 hover:bg-secondary text-foreground border border-border hover:border-purple-500/50 transition-all duration-300">
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-secondary border border-border'
                }`}>
                  {message.role === 'user'
                    ? <User className="w-5 h-5 text-primary-foreground" />
                    : <Bot className="w-5 h-5 text-purple-400" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-primary-foreground'
                    : 'bg-card border border-border text-foreground'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
                <div className="bg-card border border-border rounded-2xl px-5 py-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="mt-4 pt-4 border-t border-border">
          {messages.length > 0 && !isLoading && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestionChips.slice(0, 2).map((chip, idx) => (
                <button key={idx} onClick={() => sendMessage(chip)}
                  className="px-3 py-1.5 rounded-full text-xs bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/50 hover:border-purple-500/50 transition-all duration-200">
                  {chip}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about your career..."
              disabled={isLoading}
              className="flex-1 h-14 px-5 rounded-xl bg-secondary/50 border border-border focus:border-purple-500 outline-none text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 disabled:opacity-50"
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="h-14 w-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-primary-foreground disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}