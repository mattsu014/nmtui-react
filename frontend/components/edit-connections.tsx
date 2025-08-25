"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wifi, Edit2, Trash2 } from "lucide-react"
import type { Connection } from "@/app/page"

interface EditConnectionsProps {
  connections: Connection[]
  onBack: () => void
  onEditConnection: (connection: Connection) => void
}

export function EditConnections({ connections, onBack, onEditConnection }: EditConnectionsProps) {
  const previouslyConnectedWifi = connections.filter((c) => c.type === "wifi")

  const handleDelete = (connectionId: string) => {
    console.log("[v0] Delete connection:", connectionId)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Edit Connections</h2>
          <p className="text-sm text-muted-foreground">Modify previously connected WiFi networks</p>
        </div>
        <span className="text-sm text-muted-foreground">{previouslyConnectedWifi.length} Total Connections</span>
      </div>

      {previouslyConnectedWifi.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Wifi className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No WiFi Networks Connected Yet</h3>
            <p className="text-sm text-muted-foreground">Connect to WiFi networks first to see them here for editing</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {previouslyConnectedWifi.map((connection) => (
            <Card key={connection.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-primary">
                      <Wifi className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{connection.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">WiFi Network</span>
                        {connection.signalStrength && (
                          <span className="text-xs text-muted-foreground">{connection.signalStrength}% signal</span>
                        )}
                        <Badge
                          variant={connection.status === "connected" ? "default" : "secondary"}
                          className="text-xs px-2 py-0.5"
                        >
                          {connection.status === "connected" ? "Connected" : "Previously Connected"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditConnection(connection)}
                      className="text-xs px-3"
                    >
                      <Edit2 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(connection.id)}
                      className="text-xs px-3 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
