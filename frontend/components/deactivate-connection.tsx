"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wifi, Cable, Shield } from "lucide-react"
import type { Connection } from "@/app/page"

interface DeactivateConnectionProps {
  connections: Connection[]
  onDisconnect: (id: string) => void
  onBack: () => void
}

export function DeactivateConnection({ connections, onDisconnect, onBack }: DeactivateConnectionProps) {
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Main Menu
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">Deactivate Connection</h1>
        <p className="text-muted-foreground">Disconnect from active network connections</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Connections</CardTitle>
        </CardHeader>
        <CardContent>
          {connections.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No active connections to disconnect</p>
            </div>
          ) : (
            <div className="space-y-4">
              {connections.map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getConnectionIcon(connection.type)}
                    <div>
                      <h3 className="font-semibold">{connection.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{connection.type} Connection</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="default">Connected</Badge>
                    <Button variant="destructive" onClick={() => onDisconnect(connection.id)} className="min-w-[100px]">
                      Disconnect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
