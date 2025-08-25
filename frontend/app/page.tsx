"use client"

import { useState } from "react"
import { MainMenu } from "@/components/main-menu"
import { ConnectionManager } from "@/components/connection-manager"
import { CreateEditConnection } from "@/components/create-edit-connection"
import { HostnameSettings } from "@/components/hostname-settings"
import { EditConnections } from "@/components/edit-connections"
import { VPNManager } from "@/components/vpn-manager"
import { PersonalizationSettings } from "@/components/personalization-settings"

export type Screen = "main" | "activate" | "create" | "edit" | "hostname" | "vpn" | "personalization"

export interface Connection {
  id: string
  name: string
  type: "wifi" | "ethernet" | "vpn"
  status: "connected" | "disconnected"
  signalStrength?: number
  ipConfig: "auto" | "manual"
  ip?: string
  gateway?: string
  dns?: string
  security?: "wpa" | "wep" | "none"
  password?: string
}

export default function NetworkManager() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("main")
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null)
  const [connectionHistory, setConnectionHistory] = useState<Connection[]>([])
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "1",
      name: "Home WiFi",
      type: "wifi",
      status: "connected",
      signalStrength: 85,
      ipConfig: "auto",
      security: "wpa",
    },
    {
      id: "2",
      name: "Office Network",
      type: "ethernet",
      status: "disconnected",
      ipConfig: "manual",
      ip: "192.168.1.100",
      gateway: "192.168.1.1",
      dns: "8.8.8.8",
    },
    {
      id: "3",
      name: "VPN Connection",
      type: "vpn",
      status: "disconnected",
      ipConfig: "auto",
    },
  ])

  const handleEditConnection = (connection: Connection) => {
    setEditingConnection(connection)
    setCurrentScreen("create")
  }

  const handleSaveConnection = (connection: Connection) => {
    if (editingConnection) {
      setConnections((prev) => prev.map((c) => (c.id === connection.id ? connection : c)))
      setConnectionHistory((prev) => prev.map((c) => (c.id === connection.id ? connection : c)))
    } else {
      const newConnection = { ...connection, id: Date.now().toString() }
      setConnections((prev) => [...prev, newConnection])
    }
    setEditingConnection(null)
    setCurrentScreen("main")
  }

  const handleToggleConnection = (id: string) => {
    setConnections((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updatedConnection = { ...c, status: c.status === "connected" ? "disconnected" : ("connected" as const) }
          if (updatedConnection.status === "connected" && !connectionHistory.find((h) => h.id === id)) {
            setConnectionHistory((prevHistory) => [...prevHistory, updatedConnection])
          }
          return updatedConnection
        }
        return c
      }),
    )
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "activate":
        return (
          <ConnectionManager
            connections={connections}
            onToggleConnection={handleToggleConnection}
            onBack={() => setCurrentScreen("main")}
          />
        )
      case "create":
        return (
          <CreateEditConnection
            connection={editingConnection}
            onSave={handleSaveConnection}
            onCancel={() => {
              setEditingConnection(null)
              setCurrentScreen("main")
            }}
          />
        )
      case "edit":
        return (
          <EditConnections
            connections={connectionHistory}
            onBack={() => setCurrentScreen("main")}
            onEditConnection={handleEditConnection}
            onOpenSettings={() => setCurrentScreen("personalization")}
          />
        )
      case "hostname":
        return <HostnameSettings onBack={() => setCurrentScreen("main")} />
      case "vpn":
        return <VPNManager onBack={() => setCurrentScreen("main")} />
      case "personalization":
        return <PersonalizationSettings onBack={() => setCurrentScreen("edit")} />
      default:
        return (
          <MainMenu connections={connections} onNavigate={setCurrentScreen} onEditConnection={handleEditConnection} />
        )
    }
  }

  return <div className="min-h-screen bg-background">{renderScreen()}</div>
}
