"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Search, Check } from 'lucide-react'

interface Blueprint {
  id: string
  title: string
  description: string
  image: string
  category: string
}

const blueprints: Blueprint[] = [
  {
    id: '1',
    title: 'Modern Portfolio',
    description: 'Showcase your work with this sleek, minimalist portfolio design.',
    image: '/placeholder.svg?height=300&width=400',
    category: 'Personal'
  },
  {
    id: '2',
    title: 'E-commerce Store',
    description: 'A fully-featured online store template with product listings and cart functionality.',
    image: '/placeholder.svg?height=300&width=400',
    category: 'Business'
  },
  {
    id: '3',
    title: 'Blog',
    description: 'Start your writing journey with this clean and readable blog template.',
    image: '/placeholder.svg?height=300&width=400',
    category: 'Personal'
  },
  {
    id: '4',
    title: 'Corporate Website',
    description: 'Present your company professionally with this modern corporate template.',
    image: '/placeholder.svg?height=300&width=400',
    category: 'Business'
  },
  {
    id: '5',
    title: 'Landing Page',
    description: 'Capture leads and showcase your product with this high-converting landing page.',
    image: '/placeholder.svg?height=300&width=400',
    category: 'Marketing'
  },
  {
    id: '6',
    title: 'Restaurant Menu',
    description: 'Display your culinary offerings with style using this appetizing menu template.',
    image: '/placeholder.svg?height=300&width=400',
    category: 'Food & Beverage'
  },
]

const categories = ['All', ...new Set(blueprints.map(b => b.category))]

export default function BlueprintSelection() {
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredBlueprints = blueprints.filter(blueprint => 
    (activeCategory === 'All' || blueprint.category === activeCategory) &&
    (blueprint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blueprint.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalPages = Math.ceil(filteredBlueprints.length / itemsPerPage)
  const paginatedBlueprints = filteredBlueprints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleBlueprintSelect = (blueprint: Blueprint) => {
    setSelectedBlueprint(blueprint)
  }

  const handleUseTemplate = () => {
    if (selectedBlueprint) {
      console.log(`Using template: ${selectedBlueprint.title}`)
      // Implement logic to use the selected template
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-grow md:flex-row">
        <div className="w-full p-4 overflow-y-auto md:w-2/3">
          <h1 className="mb-2 text-3xl font-bold">Choose a Blueprint</h1>
          <p className="mb-6 text-gray-600">Select a starting point for your website. You can customize it later.</p>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input
                type="text"
                placeholder="Search blueprints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="All" className="mb-6">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => {
                    setActiveCategory(category)
                    setCurrentPage(1)
                  }}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
            {paginatedBlueprints.map((blueprint) => (
              <Card
                key={blueprint.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedBlueprint?.id === blueprint.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleBlueprintSelect(blueprint)}
              >
                <CardContent className="p-4">
                  <div className="relative mb-2">
                    <Image
                      src={blueprint.image}
                      alt={blueprint.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-40 rounded"
                    />
                    <Badge className="absolute top-2 left-2">{blueprint.category}</Badge>
                    {selectedBlueprint?.id === blueprint.id && (
                      <div className="absolute p-1 rounded-full top-2 right-2 bg-primary text-primary-foreground">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <h3 className="mb-1 font-semibold">{blueprint.title}</h3>
                  <p className="text-sm text-gray-600">{blueprint.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="w-full p-4 md:w-1/3 bg-gray-50">
          <div className="sticky top-4">
            {selectedBlueprint ? (
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-2 text-xl font-semibold">Selected Blueprint</h2>
                  <Image
                    src={selectedBlueprint.image}
                    alt={selectedBlueprint.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 mb-4 rounded"
                  />
                  <h3 className="mb-1 font-semibold">{selectedBlueprint.title}</h3>
                  <p className="mb-4 text-sm text-gray-600">{selectedBlueprint.description}</p>
                  <Button onClick={handleUseTemplate} className="w-full">Use This Template</Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-2 text-xl font-semibold">No Blueprint Selected</h2>
                  <p className="mb-4 text-gray-600">Click on a blueprint to see more details and use it as your starting point.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}