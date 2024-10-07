'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Sun, Moon, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function WelcomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      <div className="absolute flex items-center space-x-2 top-4 right-4">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          aria-label="Toggle theme"
        />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>

      <main className="w-full max-w-2xl px-4 py-8 space-y-8">
        <div className="space-y-6 text-center">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="Thorbis Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to Thorbis!</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Let&apos;s set up your Thorbis-powered website in just a few steps.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/install/database" className="inline-flex items-center justify-center">
              Let&apos;s Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">What you&apos;ll need:</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "Business name and contact info",
              "Brief description of services",
              "Service area (in miles)",
              "Logo image (optional)"
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          This wizard will guide you through the installation process step by step.
        </p>
      </main>
    </div>
  )
}