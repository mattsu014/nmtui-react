"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Monitor, Check } from "lucide-react"

interface HostnameSettingsProps {
  onBack: () => void
}

export function HostnameSettings({ onBack }: HostnameSettingsProps) {
  const [currentHostname] = useState("desktop-pc-001")
  const [newHostname, setNewHostname] = useState("")
  const [isApplied, setIsApplied] = useState(false)

  const handleApply = () => {
    if (newHostname.trim()) {
      setIsApplied(true)
      setTimeout(() => setIsApplied(false), 2000)
      setNewHostname("")
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Main Menu
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">System Hostname</h1>
        <p className="text-muted-foreground">Configure your system's network hostname</p>
      </div>

      <div className="space-y-6">
        {/* Current Hostname */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Current Hostname
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-mono text-lg">{currentHostname}</p>
            </div>
          </CardContent>
        </Card>

        {/* Change Hostname */}
        <Card>
          <CardHeader>
            <CardTitle>Change Hostname</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="hostname">New Hostname</Label>
                <Input
                  id="hostname"
                  value={newHostname}
                  onChange={(e) => setNewHostname(e.target.value)}
                  placeholder="Enter new hostname"
                  className="font-mono"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Hostname should contain only letters, numbers, and hyphens
                </p>
              </div>

              <Button onClick={handleApply} disabled={!newHostname.trim() || isApplied} className="w-full">
                {isApplied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Applied Successfully
                  </>
                ) : (
                  "Apply Hostname"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Information */}
        <Card>
          <CardHeader>
            <CardTitle>Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• The hostname identifies your computer on the network</p>
              <p>• Changes may require a system restart to take full effect</p>
              <p>• Use lowercase letters, numbers, and hyphens only</p>
              <p>• Maximum length is 63 characters</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
