"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, Search, Upload, Database, Key, Shield, Globe, Github, Zap } from 'lucide-react'

export default function SettingsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="container py-10 mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search settings"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="content">Content & Customization</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="security">Security & Privacy</TabsTrigger>
          <TabsTrigger value="users">User & Team</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your site&apos;s basic configuration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" placeholder="My Awesome Site" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" placeholder="admin@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-language">Site Language</Label>
                <Select>
                  <SelectTrigger id="site-language">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select>
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select a date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content & Customization</CardTitle>
              <CardDescription>Manage content types and blueprints.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="content-types">
                  <AccordionTrigger>Content Types</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Button>Add New Content Type</Button>
                      <div>
                        <h4 className="mb-2 font-medium">Existing Content Types</h4>
                        <ul className="list-disc list-inside">
                          <li>Posts</li>
                          <li>Pages</li>
                          <li>Products</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="custom-fields">
                  <AccordionTrigger>Custom Fields</AccordionTrigger>
                  <AccordionContent>
                    <Button>Add New Custom Field</Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="blueprints">
                  <AccordionTrigger>Blueprint Management</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Active Blueprint</Label>
                        <p className="text-sm text-muted-foreground">Default Theme</p>
                      </div>
                      <Button>Switch Blueprint</Button>
                      <div>
                        <Label htmlFor="upload-blueprint">Upload New Blueprint</Label>
                        <div className="flex mt-1">
                          <Input id="upload-blueprint" type="file" />
                          <Button size="icon" className="ml-2">
                            <Upload className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Settings</CardTitle>
              <CardDescription>Manage your database configuration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-secondary">
                <h3 className="mb-2 font-medium">Connected Database</h3>
                <p className="text-sm">Supabase (8GB used, 92GB available)</p>
              </div>
              <Button>Switch Database</Button>
              <div className="space-x-2">
                <Button variant="outline">Backup Database</Button>
                <Button variant="outline">Restore Database</Button>
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="credentials">
                  <AccordionTrigger>Database Credentials</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="db-host">Host</Label>
                        <Input id="db-host" className="w-2/3" />
                      </div>
                      <div className="flex justify-between">
                        <Label htmlFor="db-user">Username</Label>
                        <Input id="db-user" className="w-2/3" />
                      </div>
                      <div className="flex justify-between">
                        <Label htmlFor="db-pass">Password</Label>
                        <Input id="db-pass" type="password" className="w-2/3" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your site for search engines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Default Meta Title</Label>
                <Input id="meta-title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Default Meta Description</Label>
                <Textarea id="meta-description" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="xml-sitemap" />
                <Label htmlFor="xml-sitemap">Enable XML Sitemap</Label>
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="social-metadata">
                  <AccordionTrigger>Social Metadata</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="og-title">Open Graph Title</Label>
                        <Input id="og-title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="og-description">Open Graph Description</Label>
                        <Textarea id="og-description" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter-card">Twitter Card</Label>
                        <Select>
                          <SelectTrigger id="twitter-card">
                            <SelectValue placeholder="Select a card type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="summary">Summary</SelectItem>
                            <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security & Privacy</CardTitle>
              <CardDescription>Configure security settings and privacy options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="login-security">
                  <AccordionTrigger>Login Security</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="two-factor" />
                        <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-policy">Password Policy</Label>
                        <Select>
                          <SelectTrigger id="password-policy">
                            <SelectValue placeholder="Select a policy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="strong">Strong</SelectItem>
                            <SelectItem value="very-strong">Very Strong</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ssl-tls">
                  <AccordionTrigger>SSL/TLS Configuration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>SSL is currently enabled</span>
                      </div>
                      <Button variant="outline">Renew SSL Certificate</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="privacy-policy">
                  <AccordionTrigger>Privacy Policy</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Label htmlFor="privacy-policy">Privacy Policy Content</Label>
                      <Textarea id="privacy-policy" rows={10} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="data-retention">
                  <AccordionTrigger>Data Retention</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="content-retention">Content Retention Period</Label>
                        <Select>
                          <SelectTrigger id="content-retention">
                            <SelectValue placeholder="Select a period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="365">1 year</SelectItem>
                            <SelectItem value="forever">Forever</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="log-retention">Log Retention Period</Label>
                        <Select>
                          <SelectTrigger id="log-retention">
                            <SelectValue placeholder="Select a period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="365">1 year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User & Team Management</CardTitle>
              <CardDescription>Manage users, roles, and permissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button>Add New User</Button>
              <div className="space-y-2">
                <h3 className="font-medium">User Roles</h3>
                <ul className="list-disc list-inside">
                  <li>Admin</li>
                  <li>Editor</li>
                  <li>Author</li>
                  <li>Contributor</li>
                </ul>
              </div>
              <Button variant="outline">Manage Permissions</Button>
              <div>
                <h3 className="mb-2 font-medium">Activity Logs</h3>
                <div className="h-40 p-2 overflow-y-auto border rounded">
                  <p className="text-sm">User activity logs will be displayed here.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Manage connections with third-party services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="github">
                  <AccordionTrigger>GitHub Integration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Github className="w-5 h-5" />
                        <span>Connected to GitHub</span>
                      </div>
                      <Button variant="outline">Disconnect GitHub</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="vercel">
                  <AccordionTrigger>Vercel Integration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5" />
                        <span>Connected to Vercel</span>
                      </div>
                      <Button>Trigger Manual Deploy</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="third-party">
                  <AccordionTrigger>Third-Party Services</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="google-analytics">Google Analytics ID</Label>
                        <Input id="google-analytics" placeholder="UA-XXXXXXXXX-X" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mailchimp">Mailchimp API Key</Label>
                        <Input id="mailchimp" type="password" />
                      </div>
                      <Button variant="outline">Add New Service</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced options for developers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="custom-code">
                  <AccordionTrigger>Custom CSS/JS</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="custom-css">Custom CSS</Label>
                        <Textarea id="custom-css" rows={5} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="custom-js">Custom JavaScript</Label>
                        <Textarea id="custom-js" rows={5} />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="api-access">
                  <AccordionTrigger>API Access</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Button>Generate New API Key</Button>
                      <div className="space-y-2">
                        <Label>Active API Keys</Label>
                        <div className="p-2 border rounded">
                          <p className="text-sm">List of active API keys will be displayed here.</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="cache-performance">
                  <AccordionTrigger>Cache & Performance</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="enable-caching" />
                        <Label htmlFor="enable-caching">Enable Caching</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="lazy-loading" />
                        <Label htmlFor="lazy-loading">Enable Image Lazy Loading</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="minify-assets" />
                        <Label htmlFor="minify-assets">Minify CSS and JavaScript</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="debug-mode">
                  <AccordionTrigger>Debug Mode</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="debug-mode" />
                        <Label htmlFor="debug-mode">Enable Debug Mode</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Warning: Enabling debug mode may impact performance and should only be used during development.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and system notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="email-notifications">
                  <AccordionTrigger>Email Notifications</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="user-activity" />
                        <Label htmlFor="user-activity">User Activity Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="system-updates" />
                        <Label htmlFor="system-updates">System Update Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="error-alerts" />
                        <Label htmlFor="error-alerts">Error Alert Notifications</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="deployment-notifications">
                  <AccordionTrigger>Deployment Notifications</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="successful-deploy" />
                        <Label htmlFor="successful-deploy">Successful Deployment Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="failed-deploy" />
                        <Label htmlFor="failed-deploy">Failed Deployment Notifications</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="integration-notifications">
                  <AccordionTrigger>Integration Notifications</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="github-notifications" />
                        <Label htmlFor="github-notifications">GitHub Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="vercel-notifications" />
                        <Label htmlFor="vercel-notifications">Vercel Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="database-notifications" />
                        <Label htmlFor="database-notifications">Database Change Notifications</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save All Changes</Button>
      </div>
    </div>
  )
}