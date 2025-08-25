"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Wifi, Cable, Shield, Signal, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import type { Connection } from "@/app/page"

interface ConnectionManagerProps {
  connections: Connection[]
  onToggleConnection: (id: string) => void
  onBack: () => void
}

interface AvailableNetwork {
  id: string
  name: string
  signalStrength: number
  secured: boolean
  connected?: boolean
}

export function ConnectionManager({ connections, onToggleConnection, onBack }: ConnectionManagerProps) {
  const [availableNetworks, setAvailableNetworks] = useState<AvailableNetwork[]>([
    { id: "net1", name: "WiFi-Home", signalStrength: 85, secured: true },
    { id: "net2", name: "Office-Network", signalStrength: 70, secured: true },
    { id: "net3", name: "Guest-WiFi", signalStrength: 45, secured: false },
    { id: "net4", name: "Neighbor-5G", signalStrength: 30, secured: true },
  ])

  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [connecting, setConnecting] = useState(false)

  const getConnectionIcon = (type: Connection["type"]) => {
    switch (type) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "ethernet":
        return <Cable className="h-4 w-4" />
      case "vpn":
        return <Shield className="h-4 w-4" />
    }
  }

  const getSignalBars = (strength?: number) => {
    if (!strength) return null
    const bars = Math.ceil(strength / 25)
    return (
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" />
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((bar) => (
            <div key={bar} className={`w-1 h-2 rounded-sm ${bar <= bars ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-1">{strength}%</span>
      </div>
    )
  }

  const handleConnectToNetwork = async (networkId: string) => {
    const network = availableNetworks.find((n) => n.id === networkId)
    if (!network) return

    if (network.secured) {
      setSelectedNetwork(networkId)
      setPassword("")
      setError("")
    } else {
      setConnecting(true)
      setTimeout(() => {
        setConnecting(false)
        setAvailableNetworks((prev) =>
          prev.map((net) => ({
            ...net,
            connected: net.id === networkId,
          })),
        )
      }, 1500)
    }
  }

  const handlePasswordSubmit = async () => {
    if (password === "1234") {
      setConnecting(true)
      setError("")
      setTimeout(() => {
        setConnecting(false)
        setSelectedNetwork(null)
        setPassword("")
        setAvailableNetworks((prev) =>
          prev.map((net) => ({
            ...net,
            connected: net.id === selectedNetwork,
          })),
        )
      }, 1500)
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  const handleDisconnectNetwork = (networkId: string) => {
    setAvailableNetworks((prev) =>
      prev.map((net) => ({
        ...net,
        connected: net.id === networkId ? false : net.connected,
      })),
    )
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack} className="mb-3 p-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Network Connections</h1>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <CardContent className="p-4">
          <h2 className="font-medium text-sm mb-3 text-foreground">Available Networks</h2>
          <div className="space-y-2">
            {availableNetworks.map((network) => (
              <div
                key={network.id}
                className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Wifi className="h-4 w-4" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{network.name}</h3>
                      {network.secured && <Lock className="h-3 w-3 text-muted-foreground" />}
                      {network.connected && (
                        <Badge variant="default" className="text-xs px-2 py-0">
                          Connected
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">{getSignalBars(network.signalStrength)}</div>
                  </div>
                </div>
                {network.connected ? (
                  <Button
                    onClick={() => handleDisconnectNetwork(network.id)}
                    size="sm"
                    variant="destructive"
                    className="text-xs px-3"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleConnectToNetwork(network.id)}
                    size="sm"
                    variant="outline"
                    className="text-xs px-3"
                    disabled={connecting}
                  >
                    {connecting ? "Connecting..." : "Connect"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedNetwork && (
        <Card className="border-0 shadow-sm mb-4">
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-3">
              Enter password for {availableNetworks.find((n) => n.id === selectedNetwork)?.name}
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Network password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div className="flex gap-2">
                <Button onClick={handlePasswordSubmit} size="sm" disabled={!password || connecting}>
                  {connecting ? "Connecting..." : "Connect"}
                </Button>
                <Button onClick={() => setSelectedNetwork(null)} size="sm" variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
