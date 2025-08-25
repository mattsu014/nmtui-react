"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, Plus, Settings, LogOut, Edit, Shield, Palette } from "lucide-react"
import type { Connection, Screen } from "@/app/page"

interface MainMenuProps {
  connections: Connection[]
  onNavigate: (screen: Screen) => void
  onEditConnection: (connection: Connection) => void
}

export function MainMenu({ connections, onNavigate, onEditConnection }: MainMenuProps) {
  const connectedCount = connections.filter((c) => c.status === "connected").length

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Network Manager</h1>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Badge variant={connectedCount > 0 ? "default" : "secondary"} className="text-xs px-3 py-1">
              {connectedCount} Active
            </Badge>
            <div className="flex items-center gap-2">
              <span>{connections.length} Total Connections</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("personalization")}
                className="p-2 bg-transparent"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
            onClick={() => onNavigate("activate")}
          >
            <CardContent className="p-6 text-center">
              <Wifi className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-base mb-1">Connections</h3>
              <p className="text-sm text-muted-foreground">Manage networks</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
            onClick={() => onNavigate("create")}
          >
            <CardContent className="p-6 text-center">
              <Plus className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-base mb-1">Add New</h3>
              <p className="text-sm text-muted-foreground">Create connection</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
            onClick={() => onNavigate("edit")}
          >
            <CardContent className="p-6 text-center">
              <Edit className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-base mb-1">Edit Connections</h3>
              <p className="text-sm text-muted-foreground">Modify saved networks</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
            onClick={() => onNavigate("hostname")}
          >
            <CardContent className="p-6 text-center">
              <Settings className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-base mb-1">Hostname</h3>
              <p className="text-sm text-muted-foreground">System settings</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
            onClick={() => onNavigate("vpn")}
          >
            <CardContent className="p-6 text-center">
              <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-base mb-1">VPN</h3>
              <p className="text-sm text-muted-foreground">Secure connection</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105">
            <CardContent className="p-6 text-center">
              <LogOut className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-base mb-1">Exit</h3>
              <p className="text-sm text-muted-foreground">Close application</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
