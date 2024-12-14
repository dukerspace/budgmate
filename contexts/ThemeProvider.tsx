'use client'

import React, { ChangeEventHandler, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export const themes: { [key: string]: Theme } = {
  light: 'light',
  dark: 'dark'
}

export interface ThemeContextInterface {
  theme: Theme
  toggleTheme: ChangeEventHandler<HTMLInputElement>
}

export const ThemeContext = React.createContext<ThemeContextInterface>({
  theme: themes.system,
  toggleTheme: () => {}
})

type Props = {
  children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme | null>(null)

  const toggleTheme = (): void => {
    const newTheme = theme == themes.dark ? themes.light : themes.dark
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const contextValue = {
    theme: theme!,
    toggleTheme: toggleTheme
  }

  useEffect(() => {
    const defaultTheme = localStorage?.getItem('theme')
      ? localStorage?.getItem('theme')
      : themes.light
    document.documentElement.setAttribute('data-theme', defaultTheme!)
    localStorage.setItem('theme', defaultTheme!)
  }, [])

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside a ThemeContext.Provider')
  }
  return context.theme
}
