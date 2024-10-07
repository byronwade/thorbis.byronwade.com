"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, ChevronLeft, ChevronRight, BarChart, FileText, Layout, LogOut, Package2, Rocket, Search, Settings, User, Image, Zap, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AdminInterface({ children }) {
const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
const [activeSection, setActiveSection] = useState("dashboard")
const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
const [deploymentProgress, setDeploymentProgress] = useState(null)
const [hasChanges, setHasChanges] = useState(false)

const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed)

const sidebarItems = [
  { icon: <Layout className="w-4 h-4" />, label: "Dashboard", value: "" },
  { icon: <FileText className="w-4 h-4" />, label: "Content", value: "content" },
  { icon: <Package2 className="w-4 h-4" />, label: "Blueprints", value: "blueprints" },
  { icon: <Rocket className="w-4 h-4" />, label: "Deployments", value: "deployments" },
  { icon: <Zap className="w-4 h-4" />, label: "Integrations", value: "integrations" },
  { icon: <Image className="w-4 h-4" />, label: "Media", value: "media" },
  { icon: <Settings className="w-4 h-4" />, label: "Settings", value: "settings" },
]

const contextualActions = {
  dashboard: ["View site statistics", "Recent activity", "Pending tasks", "Quick actions"],
  content: ["View all content", "Create new content", "Manage content types", "Content calendar"],
  blueprints: ["View all blueprints", "Create new blueprint", "Edit blueprint settings", "Blueprint marketplace"],
  deployments: ["View deployment logs", "Trigger new deployment", "Deployment settings", "Rollback options"],
  integrations: ["View all integrations", "Add new integration", "Manage API keys", "Integration marketplace"],
  media: ["View media library", "Upload new media", "Manage folders", "Media settings"],
  settings: ["General settings", "User management", "Site configuration", "Backup and restore"],
}

useEffect(() => {
  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault()
      setIsCommandPaletteOpen(true)
    }
  }
  window.addEventListener("keydown", handleKeyDown)
  return () => window.removeEventListener("keydown", handleKeyDown)
}, [])

const handleDeploy = () => {
  setDeploymentProgress(0)
  const interval = setInterval(() => {
    setDeploymentProgress((prev) => {
      if (prev === null) return 0
      if (prev >= 100) {
        clearInterval(interval)
        setHasChanges(false)
        return 100
      }
      return prev + 10
    })
  }, 500)
}

// Simulate changes for demonstration purposes
useEffect(() => {
  const timer = setTimeout(() => setHasChanges(true), 5000)
  return () => clearTimeout(timer)
}, [])

return (
  <TooltipProvider>
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`flex flex-col border-r transition-all duration-300 ${
        isSidebarCollapsed ? "w-16" : "w-64"
      }`}>
        <div className="flex items-center justify-between p-2">
          <Link href="/" className={`flex items-center space-x-2 ${isSidebarCollapsed ? "hidden" : ""}`}>
            <Package2 className="w-5 h-5" />
            <span className="text-sm font-semibold">Thorbis</span>
          </Link>
          <Button variant="ghost" size="sm" className="w-6 h-6 p-0" onClick={toggleSidebar}>
            {isSidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </Button>
        </div>
        <nav className="flex-1 px-1">
          {sidebarItems.map((item) => (
            <Tooltip key={item.value} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={`/admin/${item.value}`} passHref>
                  <Button
                    variant={activeSection === item.value ? "secondary" : "ghost"}
                    size="sm"
                    className={`w-full justify-center my-1 ${
                      isSidebarCollapsed ? "h-8 px-1" : "justify-start px-2 py-1"
                    }`}
                    onClick={() => setActiveSection(item.value)}
                  >
                    {item.icon}
                    {!isSidebarCollapsed && <span className="ml-2 text-xs">{item.label}</span>}
                  </Button>
                </Link>
              </TooltipTrigger>
              {isSidebarCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
            </Tooltip>
          ))}
        </nav>
        {/* Donate Button */}
        <div className="p-2 border-t">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`w-full justify-center ${isSidebarCollapsed ? "px-1" : "px-2"}`}
                onClick={() => window.open("https://example.com/donate", "_blank")}
              >
                <Heart className="w-4 h-4 text-red-500" />
                {!isSidebarCollapsed && <span className="ml-2 text-xs">Donate</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isSidebarCollapsed ? "right" : "top"}>Support Thorbis</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="w-64" onClick={() => setIsCommandPaletteOpen(true)}>
              <Search className="w-4 h-4 mr-2" />
              <span className="text-sm">Search...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant={hasChanges ? "default" : "outline"} 
                  size="sm"
                  className="relative transition-colors duration-300"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Deploy
                  {hasChanges && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                      !
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deploy Your Site</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to deploy your site? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                  {deploymentProgress !== null && (
                    <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
                        style={{width: `${deploymentProgress}%`}}
                      ></div>
                    </div>
                  )}
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setDeploymentProgress(null)}>Cancel</Button>
                    <Button size="sm" onClick={handleDeploy}>
                      {deploymentProgress !== null && deploymentProgress < 100
                        ? `Deploying ${deploymentProgress.toFixed(0)}%`
                        : deploymentProgress === 100
                        ? "Deployed!"
                        : "Deploy"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative w-8 h-8 p-0">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">New comment</span>
                    <span className="text-xs text-muted-foreground">John Doe commented on your post</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Deployment successful</span>
                    <span className="text-xs text-muted-foreground">Your site was deployed successfully</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm text-blue-500 cursor-pointer">View all notifications</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>

    <CommandDialog open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <FileText className="w-4 h-4 mr-2" />
            <span>Create new content</span>
          </CommandItem>
          <CommandItem>
            <Rocket className="w-4 h-4 mr-2" />
            <span>Deploy site</span>
          </CommandItem>
          <CommandItem>
            <Settings className="w-4 h-4 mr-2" />
            <span>Open settings</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="w-4 h-4 mr-2" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="w-4 h-4 mr-2" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </TooltipProvider>
)
}