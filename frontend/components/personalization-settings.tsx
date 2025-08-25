"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Monitor, Moon, Sun, Globe } from "lucide-react"
import { useState, useEffect } from "react"

interface PersonalizationSettingsProps {
  onBack: () => void
}

export function PersonalizationSettings({ onBack }: PersonalizationSettingsProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [language, setLanguage] = useState<"en" | "pt-br">("en")
  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    const savedTheme = (localStorage.getItem("network-manager-theme") as "light" | "dark" | "system") || "system"
    const savedLanguage = (localStorage.getItem("network-manager-language") as "en" | "pt-br") || "en"

    setTheme(savedTheme)
    setLanguage(savedLanguage)

    applyTheme(savedTheme)
  }, [])

  const applyTheme = (selectedTheme: "light" | "dark" | "system") => {
    const root = document.documentElement

    if (selectedTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
    } else {
      root.classList.toggle("dark", selectedTheme === "dark")
    }
  }

  const getTranslations = (lang: "en" | "pt-br") => {
    const translations = {
      en: {
        personalization: "Personalization",
        subtitle: "Customize your network manager experience",
        theme: "Theme",
        language: "Language",
        light: "Light",
        dark: "Dark",
        system: "System",
        current: "Current:",
        applyChanges: "Apply Changes",
        applying: "Applying...",
        cancel: "Cancel",
      },
      "pt-br": {
        personalization: "Personalização",
        subtitle: "Personalize sua experiência do gerenciador de rede",
        theme: "Tema",
        language: "Idioma",
        light: "Claro",
        dark: "Escuro",
        system: "Sistema",
        current: "Atual:",
        applyChanges: "Aplicar Mudanças",
        applying: "Aplicando...",
        cancel: "Cancelar",
      },
    }
    return translations[lang]
  }

  const handleApplyChanges = async () => {
    setIsApplying(true)

    try {
      // Save to localStorage
      localStorage.setItem("network-manager-theme", theme)
      localStorage.setItem("network-manager-language", language)

      // Apply changes immediately
      applyTheme(theme)

      window.dispatchEvent(new CustomEvent("languageChanged", { detail: { language } }))

      // Simulate processing time for better UX
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Go back to previous screen
      onBack()
    } catch (error) {
      console.error("Failed to apply settings:", error)
    } finally {
      setIsApplying(false)
    }
  }

  const t = getTranslations(language)

  const themes = [
    { id: "light" as const, name: t.light, icon: Sun },
    { id: "dark" as const, name: t.dark, icon: Moon },
    { id: "system" as const, name: t.system, icon: Monitor },
  ]

  const languages = [
    { id: "en" as const, name: "English", flag: "🇺🇸" },
    { id: "pt-br" as const, name: "Português (Brasil)", flag: "🇧🇷" },
  ]

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-lg font-semibold">{t.personalization}</h2>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              {t.theme}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon
                return (
                  <Button
                    key={themeOption.id}
                    variant={theme === themeOption.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme(themeOption.id)}
                    className="flex flex-col gap-1 h-auto py-3"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{themeOption.name}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {t.language}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {languages.map((lang) => (
                <Button
                  key={lang.id}
                  variant={language === lang.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage(lang.id)}
                  className="w-full justify-start gap-3"
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">{t.current}</span>
              <Badge variant="secondary" className="text-xs">
                {languages.find((l) => l.id === language)?.name}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Apply Settings */}
        <div className="flex gap-2 pt-4">
          <Button className="flex-1" onClick={handleApplyChanges} disabled={isApplying}>
            {isApplying ? t.applying : t.applyChanges}
          </Button>
          <Button variant="outline" onClick={onBack} disabled={isApplying}>
            {t.cancel}
          </Button>
        </div>
      </div>
    </div>
  )
}
