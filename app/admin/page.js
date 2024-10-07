"use client"

import * as React from "react"
import { useState } from 'react'
import { BarChart, FileText, Image, Layout, Plus, Settings, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Dashboard() {
  const [deploymentStatus, setDeploymentStatus] = useState({ status: 'pending_changes', message: 'You have changes that need to be deployed' })
  const [lastDeployment, setLastDeployment] = useState(new Date(Date.now() - 86400000).toLocaleString())

  return (
    <div className="p-6 space-y-6">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Quick Actions */}
        <Card className="row-span-3 col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="justify-start w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              New Page
            </Button>
            <Button className="justify-start w-full" variant="outline">
              <Image className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
            <Button className="justify-start w-full" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
            <Button className="justify-start w-full" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Site Settings
            </Button>
          </CardContent>
        </Card>

        {/* Total Pages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <Layout className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="mt-1 text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="mt-1 text-xs text-muted-foreground">+18 from last month</p>
          </CardContent>
        </Card>

        {/* Page Views */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <BarChart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="mt-1 text-xs text-muted-foreground">+201 from yesterday</p>
          </CardContent>
        </Card>

        {/* Recent Pages */}
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Pages</CardTitle>
            <CardDescription>Your recently edited pages</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {["Home", "About Us", "Services", "Contact", "Blog", "Products", "Team"].map((page, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex items-center justify-center mr-3 rounded-full w-9 h-9 bg-primary/10">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{page}</p>
                      <p className="text-sm text-muted-foreground">
                        Edited {Math.floor(Math.random() * 60) + 1} minutes ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Site Health */}
        <Card className="col-span-full md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Site Health</CardTitle>
            <CardDescription>Overview of your site's performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="ml-4 text-sm font-medium">95%</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                  SEO: Excellent
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></span>
                  Performance: Good
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                  Security: Strong
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on your site</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {[
                  { action: "Page edited", user: "John Doe", item: "Home" },
                  { action: "Media uploaded", user: "Jane Smith", item: "hero-image.jpg" },
                  { action: "User registered", user: "New User", item: "contact@example.com" },
                  { action: "Comment posted", user: "Alice Johnson", item: "Blog Post #1" },
                  { action: "Plugin updated", user: "System", item: "SEO Optimizer" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{activity.action}</span> - {activity.item}
                    </div>
                    <div className="text-muted-foreground">{activity.user}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}