"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Search, Plus } from "lucide-react"

const integrations = [
  {
    id: 1,
    name: "Stripe",
    description: "Payment processing for internet businesses",
    category: "Payments",
    logo: "/placeholder.svg?height=40&width=40",
    installed: true,
  },
  {
    id: 2,
    name: "Algolia",
    description: "Search and discovery platform",
    category: "Search",
    logo: "/placeholder.svg?height=40&width=40",
    installed: false,
  },
  {
    id: 3,
    name: "Cloudinary",
    description: "Cloud-based image and video management",
    category: "Media",
    logo: "/placeholder.svg?height=40&width=40",
    installed: false,
  },
  {
    id: 4,
    name: "Mailchimp",
    description: "Marketing automation platform",
    category: "Marketing",
    logo: "/placeholder.svg?height=40&width=40",
    installed: true,
  },
  {
    id: 5,
    name: "Auth0",
    description: "Authentication and authorization platform",
    category: "Authentication",
    logo: "/placeholder.svg?height=40&width=40",
    installed: false,
  },
  {
    id: 6,
    name: "Sentry",
    description: "Application monitoring and error tracking",
    category: "Developer Tools",
    logo: "/placeholder.svg?height=40&width=40",
    installed: false,
  },
]

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = ["All", ...new Set(integrations.map(i => i.category))]

  const filteredIntegrations = integrations.filter(integration =>
    (selectedCategory === "All" || integration.category === selectedCategory) &&
    (integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container px-4 py-6 mx-auto sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Integrations</h1>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Integration
        </Button>
      </div>

      <div className="flex flex-col gap-4 mb-6 sm:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    className="object-contain w-10 h-10"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{integration.category}</Badge>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={integration.installed}
                      onCheckedChange={() => {
                        // Handle installation toggle
                      }}
                    />
                    <span className="text-sm font-medium">
                      {integration.installed ? "Installed" : "Not Installed"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}