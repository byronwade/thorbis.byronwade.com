"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Settings, ShoppingCart, Search, Star, Download, Upload, Edit, BarChart, AlertTriangle, CheckCircle2, Filter } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for blueprints
const mockBlueprints = [
  { id: '1', title: 'Modern Portfolio', description: 'Sleek, minimalist portfolio design', active: true, version: '1.2.0', latestVersion: '1.2.0', categories: ['Portfolio', 'Personal'], downloads: 1200, lastUpdated: '2023-05-15' },
  { id: '2', title: 'E-commerce Store', description: 'Fully-featured online store template', active: true, version: '2.0.1', latestVersion: '2.1.0', categories: ['E-commerce', 'Business'], downloads: 3500, lastUpdated: '2023-06-02' },
  { id: '3', title: 'Blog', description: 'Clean and readable blog template', active: false, version: '1.1.5', latestVersion: '1.2.0', categories: ['Blog', 'Personal'], downloads: 800, lastUpdated: '2023-04-20' },
  { id: '4', title: 'Corporate Website', description: 'Professional corporate template', active: false, version: '1.3.2', latestVersion: '1.3.2', categories: ['Corporate', 'Business'], downloads: 2100, lastUpdated: '2023-05-28' },
]

// Mock data for marketplace blueprints
const mockMarketplaceBlueprints = [
  { id: 'm1', title: 'Restaurant Website', description: 'Elegant design for restaurants', price: 29.99, categories: ['Food & Beverage', 'Business'], rating: 4.5, sales: 120 },
  { id: 'm2', title: 'Fitness Tracker Dashboard', description: 'Interactive dashboard for fitness apps', price: 39.99, categories: ['Health & Fitness', 'Technology'], rating: 4.2, sales: 85 },
  { id: 'm3', title: 'Real Estate Listings', description: 'Property showcase and search template', price: 49.99, categories: ['Real Estate', 'Business'], rating: 4.7, sales: 200 },
]

export default function BlueprintsManagement() {
  const [blueprints, setBlueprints] = useState(mockBlueprints)
  const [marketplaceBlueprints, setMarketplaceBlueprints] = useState(mockMarketplaceBlueprints)
  const [deleteConfirmation, setDeleteConfirmation] = useState({ id: '', title: '', input: '' })
  const [activeCount, setActiveCount] = useState(blueprints.filter(bp => bp.active).length)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilters, setCategoryFilters] = useState([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [wishlist, setWishlist] = useState([])
  const [previewBlueprint, setPreviewBlueprint] = useState(null)
  const [activeTab, setActiveTab] = useState('my-blueprints')
  const fileInputRef = useRef(null)

  const allCategories = Array.from(new Set(blueprints.flatMap(bp => bp.categories).concat(marketplaceBlueprints.flatMap(bp => bp.categories))))

  const toggleBlueprint = (id) => {
    setBlueprints(blueprints.map(bp => 
      bp.id === id ? { ...bp, active: !bp.active } : bp
    ))
    setActiveCount(prev => blueprints.find(bp => bp.id === id)?.active ? prev - 1 : prev + 1)
  }

  const handleDeleteConfirmation = (id, title) => {
    setDeleteConfirmation({ id, title, input: '' })
  }

  const handleDelete = () => {
    if (deleteConfirmation.input === deleteConfirmation.title) {
      setBlueprints(blueprints.filter(bp => bp.id !== deleteConfirmation.id))
      setDeleteConfirmation({ id: '', title: '', input: '' })
      setActiveCount(blueprints.filter(bp => bp.active && bp.id !== deleteConfirmation.id).length)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file && file.name.endsWith('.zip')) {
      console.log('Zip file uploaded:', file.name)
      // Process the zip file here
    } else {
      alert('Please upload a zip file')
    }
  }

  const openFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const toggleCategoryFilter = (category) => {
    setCategoryFilters(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredBlueprints = blueprints.filter(bp => 
    bp.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilters.length === 0 || bp.categories.some(cat => categoryFilters.includes(cat)))
  )

  const filteredMarketplaceBlueprints = marketplaceBlueprints.filter(bp => 
    bp.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilters.length === 0 || bp.categories.some(cat => categoryFilters.includes(cat))) &&
    bp.price >= priceRange[0] && bp.price <= priceRange[1]
  )

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const updateBlueprint = (id) => {
    setBlueprints(blueprints.map(bp => 
      bp.id === id ? { ...bp, version: bp.latestVersion } : bp
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container p-4 mx-auto">
        <div className="mb-6">
          <h1 className="mb-4 text-3xl font-bold">Blueprints</h1>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search blueprints..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-shrink-0">
              <TabsList>
                <TabsTrigger value="my-blueprints">My Blueprints</TabsTrigger>
                <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              </TabsList>
            </Tabs>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {allCategories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => toggleCategoryFilter(category)}>
                    <Checkbox
                      checked={categoryFilters.includes(category)}
                      onCheckedChange={() => toggleCategoryFilter(category)}
                      className="mr-2"
                    />
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {activeTab === 'my-blueprints' && (
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".zip"
                  style={{ display: 'none' }}
                />
                <Button onClick={openFileUpload}>
                  <Plus className="w-4 h-4 mr-2" /> Add Blueprint
                </Button>
                <Badge variant="outline">Active: {activeCount}/3</Badge>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'my-blueprints' && (
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBlueprints.map((blueprint) => (
                    <TableRow key={blueprint.id}>
                      <TableCell className="font-medium">{blueprint.title}</TableCell>
                      <TableCell>{blueprint.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {blueprint.categories.map((category) => (
                            <Badge key={category} variant="secondary">{category}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{blueprint.version}</span>
                          {blueprint.version === blueprint.latestVersion ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Up to date</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Update available: {blueprint.latestVersion}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={blueprint.active ? "default" : "secondary"}>
                          {blueprint.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={blueprint.active}
                            onCheckedChange={() => toggleBlueprint(blueprint.id)}
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Settings className="w-4 h-4" />
                                <span className="sr-only">Settings for {blueprint.title}</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem asChild>
                                <a href={`/blueprints/${blueprint.id}`}>
                                  <Edit className="w-4 h-4 mr-2" /> View Details
                                </a>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart className="w-4 h-4 mr-2" /> View Usage
                              </DropdownMenuItem>
                              {blueprint.version !== blueprint.latestVersion && (
                                <DropdownMenuItem onSelect={() => updateBlueprint(blueprint.id)}>
                                  <Download className="w-4 h-4 mr-2" /> Update to {blueprint.latestVersion}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onSelect={() => handleDeleteConfirmation(blueprint.id, blueprint.title)}>
                                Delete Blueprint
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'marketplace' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMarketplaceBlueprints.map((blueprint) => (
              <Card key={blueprint.id}>
                <CardHeader>
                  <CardTitle>{blueprint.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{blueprint.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">${blueprint.price}</span>
                    <div className="flex flex-wrap gap-1">
                      {blueprint.categories.map((category) => (
                        <Badge key={category} variant="secondary">{category}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(blueprint.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({blueprint.sales} sales)</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => toggleWishlist(blueprint.id)}>
                    {wishlist.includes(blueprint.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                  <Button>
                    <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={deleteConfirmation.id !== ''} onOpenChange={() => setDeleteConfirmation({ id: '', title: '', input: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blueprint</DialogTitle>
            <DialogDescription>
              This action cannot be undone. To confirm, please type the blueprint name: <strong>{deleteConfirmation.title}</strong>
            </DialogDescription>
          </DialogHeader>
          <Input
            value={deleteConfirmation.input}
            onChange={(e) => setDeleteConfirmation({ ...deleteConfirmation, input: e.target.value })}
            placeholder="Type blueprint name here"
          />
          <Button onClick={handleDelete} disabled={deleteConfirmation.input !== deleteConfirmation.title}>
            Delete Blueprint
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}