"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function WebsiteSettings() {
  const [authMethod, setAuthMethod] = useState('clark')
  const [clarkTier, setClarkTier] = useState('free')
  const [isCommentsEnabled, setIsCommentsEnabled] = useState(false)
  const [isMediaLibraryEnabled, setIsMediaLibraryEnabled] = useState(true)
  const [isSitemapEnabled, setIsSitemapEnabled] = useState(true)
  const [isGoogleAnalyticsEnabled, setIsGoogleAnalyticsEnabled] = useState(false)
  const [allowUserRegistration, setAllowUserRegistration] = useState(false)
  const [defaultUserRole, setDefaultUserRole] = useState('subscriber')
  const [postsPerPage, setPostsPerPage] = useState(10)
  const [moderateComments, setModerateComments] = useState(true)
  const [maxUploadSize, setMaxUploadSize] = useState(2)
  const [permalinkStructure, setPermalinkStructure] = useState('post-name')
  const [enableCaching, setEnableCaching] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Form submitted')
    // Implement form submission logic here
  }

  const handleGoogleAnalyticsSetup = () => {
    // Implement Google Analytics OAuth setup logic here
    console.log('Setting up Google Analytics with OAuth')
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Configure Your Website</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" placeholder="My Awesome Website" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input id="siteUrl" type="url" placeholder="https://myawesomewebsite.com" required />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Admin Authentication</h3>
              <Tabs defaultValue="clark" onValueChange={(value) => setAuthMethod(value)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="clark">Use Clark</TabsTrigger>
                  <TabsTrigger value="local">Local Credentials</TabsTrigger>
                </TabsList>
                <TabsContent value="clark" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Clark provides secure authentication for your admin panel. Choose a tier to get started:
                  </p>
                  <RadioGroup defaultValue="free" onValueChange={(value) => setClarkTier(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free">Free Tier - Basic authentication features</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paid" id="paid" />
                      <Label htmlFor="paid">Paid Tier - Advanced security, custom branding, and priority support</Label>
                    </div>
                  </RadioGroup>
                  <Button type="button" variant="outline">Set up Clark</Button>
                </TabsContent>
                <TabsContent value="local" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input id="adminEmail" type="email" placeholder="admin@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Admin Password</Label>
                    <Input id="adminPassword" type="password" placeholder="Enter a strong password" required />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="UTC">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="CST">Central Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">User Registration</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="allowRegistration" 
                  checked={allowUserRegistration}
                  onCheckedChange={setAllowUserRegistration}
                />
                <Label htmlFor="allowRegistration">Allow new user registrations</Label>
              </div>
              {allowUserRegistration && (
                <div className="space-y-2">
                  <Label htmlFor="defaultUserRole">Default user role</Label>
                  <Select value={defaultUserRole} onValueChange={setDefaultUserRole}>
                    <SelectTrigger id="defaultUserRole">
                      <SelectValue placeholder="Select default role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscriber">Subscriber</SelectItem>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Content Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="postsPerPage">Posts per page</Label>
                <Slider
                  id="postsPerPage"
                  min={1}
                  max={50}
                  step={1}
                  value={[postsPerPage]}
                  onValueChange={(value) => setPostsPerPage(value[0])}
                />
                <p className="text-sm text-muted-foreground">{postsPerPage} posts per page</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Discussion Settings</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="comments" 
                  checked={isCommentsEnabled}
                  onCheckedChange={setIsCommentsEnabled}
                />
                <Label htmlFor="comments">Enable Comments</Label>
              </div>
              {isCommentsEnabled && (
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="moderateComments" 
                    checked={moderateComments}
                    onCheckedChange={setModerateComments}
                  />
                  <Label htmlFor="moderateComments">Moderate comments before publishing</Label>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Media Settings</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="mediaLibrary" 
                  checked={isMediaLibraryEnabled}
                  onCheckedChange={setIsMediaLibraryEnabled}
                />
                <Label htmlFor="mediaLibrary">Enable Media Library</Label>
              </div>
              {isMediaLibraryEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="maxUploadSize">Maximum upload file size (MB)</Label>
                  <Slider
                    id="maxUploadSize"
                    min={1}
                    max={50}
                    step={1}
                    value={[maxUploadSize]}
                    onValueChange={(value) => setMaxUploadSize(value[0])}
                  />
                  <p className="text-sm text-muted-foreground">Maximum upload size: {maxUploadSize} MB</p>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Permalink Structure</h3>
              <RadioGroup value={permalinkStructure} onValueChange={setPermalinkStructure}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="post-name" id="post-name" />
                  <Label htmlFor="post-name">Post name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="date-and-name" id="date-and-name" />
                  <Label htmlFor="date-and-name">Date and name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="numeric" id="numeric" />
                  <Label htmlFor="numeric">Numeric</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Performance</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enableCaching" 
                  checked={enableCaching}
                  onCheckedChange={setEnableCaching}
                />
                <Label htmlFor="enableCaching">Enable caching</Label>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SEO Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea id="siteDescription" placeholder="Enter a brief description of your website" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input id="keywords" placeholder="website, awesome, thorbis" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="sitemap" 
                  checked={isSitemapEnabled}
                  onCheckedChange={setIsSitemapEnabled}
                />
                <Label htmlFor="sitemap">Generate Sitemap</Label>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Analytics</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="googleAnalytics" 
                  checked={isGoogleAnalyticsEnabled}
                  onCheckedChange={setIsGoogleAnalyticsEnabled}
                />
                <Label htmlFor="googleAnalytics">Enable Google Analytics</Label>
              </div>
              {isGoogleAnalyticsEnabled && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Connect your website to Google Analytics using OAuth for secure and easy setup.
                  </p>
                  <Button type="button" onClick={handleGoogleAnalyticsSetup} variant="outline">
                    Connect with Google Analytics
                  </Button>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">Complete Setup</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}