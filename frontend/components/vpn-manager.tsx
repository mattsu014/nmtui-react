"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Globe, Lock, Zap } from "lucide-react"

interface VPNManagerProps {
  onBack: () => void
}

export function VPNManager({ onBack }: VPNManagerProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [selectedServer, setSelectedServer] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const vpnServers = [
    { id: "us-east", name: "US East", location: "New York", ping: "12ms", load: "Low" },
    { id: "us-west", name: "US West", location: "Los Angeles", ping: "28ms", load: "Medium" },
    { id: "eu-central", name: "EU Central", location: "Frankfurt", ping: "45ms", load: "Low" },
    { id: "asia-pacific", name: "Asia Pacific", location: "Singapore", ping: "78ms", load: "High" },
  ]

  const handleConnect = async () => {
    if (!selectedServer) return

    setIsConnecting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnected(true)
    setIsConnecting(false)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setSelectedServer("")
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-lg font-semibold">VPN Manager</h2>
          <p className="text-sm text-muted-foreground">Secure your internet connection</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-full ${isConnected ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
              >
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{isConnected ? "VPN Connected" : "VPN Disconnected"}</h3>
                <p className="text-sm text-muted-foreground">
                  {isConnected
                    ? `Connected to ${vpnServers.find((s) => s.id === selectedServer)?.name}`
                    : "Your connection is not protected"}
                </p>
              </div>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"}>{isConnected ? "Protected" : "Unprotected"}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Select VPN Server</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {vpnServers.map((server) => (
            <div
              key={server.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedServer === server.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
              }`}
              onClick={() => !isConnected && setSelectedServer(server.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{server.name}</p>
                    <p className="text-xs text-muted-foreground">{server.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{server.ping}</span>
                  <Badge variant="outline" className="text-xs">
                    {server.load}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        {!isConnected ? (
          <Button onClick={handleConnect} disabled={!selectedServer || isConnecting} className="flex-1">
            {isConnecting ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Connect VPN
              </>
            )}
          </Button>
        ) : (
          <Button onClick={handleDisconnect} variant="outline" className="flex-1 bg-transparent">
            Disconnect VPN
          </Button>
        )}
      </div>
    </div>
  )
}
