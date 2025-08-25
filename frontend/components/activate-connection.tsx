"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wifi, Cable, Shield, Signal } from "lucide-react"
import type { Connection } from "@/app/page"

interface ActivateConnectionProps {
  connections: Connection[]
  onConnect: (id: string) => void
  onBack: () => void
}

export function ActivateConnection({ connections, onConnect, onBack }: ActivateConnectionProps) {
  const getConnectionIcon = (type: Connection["type"]) => {
    switch (type) {
      case "wifi":
        return <Wifi className="h-5 w-5" />
      case "ethernet":
        return <Cable className="h-5 w-5" />
      case "vpn":
        return <Shield className="h-5 w-5" />
    }
  }

  const getSignalBars = (strength?: number) => {
    if (!strength) return null
    const bars = Math.ceil(strength / 25)
    return (
      <div className="flex items-center gap-1">
        <Signal className="h-4 w-4" />
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((bar) => (
            <div key={bar} className={`w-1 h-3 rounded-sm ${bar <= bars ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-1">{strength}%</span>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Main Menu
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activate Connection</h1>
        <p className="text-muted-foreground">Select a network connection to activate</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connections.map((connection) => (
              <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getConnectionIcon(connection.type)}
                  <div className="flex-1">
                    <h3 className="font-semibold">{connection.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{connection.type} Connection</p>
                    {connection.type === "wifi" && getSignalBars(connection.signalStrength)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={connection.status === "connected" ? "default" : "secondary"}>
                    {connection.status}
                  </Badge>
                  <Button
                    onClick={() => onConnect(connection.id)}
                    disabled={connection.status === "connected"}
                    className="min-w-[100px]"
                  >
                    {connection.status === "connected" ? "Connected" : "Connect"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
