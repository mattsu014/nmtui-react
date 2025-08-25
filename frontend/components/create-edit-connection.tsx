"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from "lucide-react"
import type { Connection } from "@/app/page"

interface CreateEditConnectionProps {
  connection?: Connection | null
  onSave: (connection: Connection) => void
  onCancel: () => void
}

export function CreateEditConnection({ connection, onSave, onCancel }: CreateEditConnectionProps) {
  const [formData, setFormData] = useState<Partial<Connection>>({
    name: connection?.name || "",
    type: connection?.type || "wifi",
    ipConfig: connection?.ipConfig || "auto",
    ip: connection?.ip || "",
    gateway: connection?.gateway || "",
    dns: connection?.dns || "",
    security: connection?.security || "wpa",
    password: connection?.password || "",
    status: connection?.status || "disconnected",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.type) return

    onSave({
      id: connection?.id || "",
      name: formData.name,
      type: formData.type as Connection["type"],
      status: formData.status as Connection["status"],
      ipConfig: formData.ipConfig as "auto" | "manual",
      ip: formData.ipConfig === "manual" ? formData.ip : undefined,
      gateway: formData.ipConfig === "manual" ? formData.gateway : undefined,
      dns: formData.ipConfig === "manual" ? formData.dns : undefined,
      security: formData.type === "wifi" ? (formData.security as Connection["security"]) : undefined,
      password: formData.type === "wifi" ? formData.password : undefined,
      signalStrength: formData.type === "wifi" ? 0 : undefined,
    })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onCancel} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Main Menu
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {connection ? "Edit Connection" : "Create New Connection"}
        </h1>
        <p className="text-muted-foreground">Configure network connection settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connection Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Settings */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Connection Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter connection name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Connection Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as Connection["type"] }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select connection type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wifi">Wi-Fi</SelectItem>
                    <SelectItem value="ethernet">Ethernet</SelectItem>
                    <SelectItem value="vpn">VPN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* IP Configuration */}
            <div className="space-y-4">
              <Label>IP Configuration</Label>
              <RadioGroup
                value={formData.ipConfig}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, ipConfig: value as "auto" | "manual" }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auto" id="auto" />
                  <Label htmlFor="auto">Automatic (DHCP)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="manual" />
                  <Label htmlFor="manual">Manual</Label>
                </div>
              </RadioGroup>

              {formData.ipConfig === "manual" && (
                <div className="space-y-4 pl-6 border-l-2 border-muted">
                  <div>
                    <Label htmlFor="ip">IP Address</Label>
                    <Input
                      id="ip"
                      value={formData.ip}
                      onChange={(e) => setFormData((prev) => ({ ...prev, ip: e.target.value }))}
                      placeholder="192.168.1.100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gateway">Gateway</Label>
                    <Input
                      id="gateway"
                      value={formData.gateway}
                      onChange={(e) => setFormData((prev) => ({ ...prev, gateway: e.target.value }))}
                      placeholder="192.168.1.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dns">DNS Server</Label>
                    <Input
                      id="dns"
                      value={formData.dns}
                      onChange={(e) => setFormData((prev) => ({ ...prev, dns: e.target.value }))}
                      placeholder="8.8.8.8"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Wi-Fi Security Settings */}
            {formData.type === "wifi" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="security">Security</Label>
                  <Select
                    value={formData.security}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, security: value as Connection["security"] }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select security type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wpa">WPA/WPA2</SelectItem>
                      <SelectItem value="wep">WEP</SelectItem>
                      <SelectItem value="none">None (Open)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.security !== "none" && (
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter network password"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {connection ? "Save Changes" : "Create Connection"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
