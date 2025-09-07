"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { PropertyCard, type Property } from "@/components/PropertyCard"
import { Search, SlidersHorizontal, TrendingUp, TrendingDown, MapPin, X, Grid3X3, List, BarChart3 } from "lucide-react"

// Mock marketplace data
const marketplaceProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Penthouse",
    location: "Manhattan, NY",
    price: "2.5 ETH",
    usdPrice: "$4,250,000",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2400,
    image: "/modern-penthouse-interior.png",
    aiScore: 95,
    type: "Penthouse",
    status: "Available",
    description: "Stunning penthouse with panoramic city views and premium finishes.",
  },
  {
    id: 2,
    title: "Luxury Beachfront Villa",
    location: "Malibu, CA",
    price: "4.2 ETH",
    usdPrice: "$7,140,000",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    image: "/luxury-beachfront-villa.png",
    aiScore: 92,
    type: "Villa",
    status: "Available",
    description: "Exclusive beachfront villa with private beach access and infinity pool.",
  },
  {
    id: 3,
    title: "Smart City Apartment",
    location: "Austin, TX",
    price: "0.8 ETH",
    usdPrice: "$1,360,000",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    image: "/smart-city-apartment.jpg",
    aiScore: 88,
    type: "Apartment",
    status: "Available",
    description: "Tech-enabled smart apartment with automated systems.",
  },
  {
    id: 4,
    title: "Historic Brownstone",
    location: "Boston, MA",
    price: "1.9 ETH",
    usdPrice: "$3,230,000",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    image: "/modern-penthouse-interior.png",
    aiScore: 89,
    type: "Townhouse",
    status: "Available",
    description: "Beautifully restored historic brownstone in prime location.",
  },
  {
    id: 5,
    title: "Mountain Retreat Cabin",
    location: "Aspen, CO",
    price: "1.2 ETH",
    usdPrice: "$2,040,000",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    image: "/luxury-beachfront-villa.png",
    aiScore: 85,
    type: "Cabin",
    status: "Available",
    description: "Cozy mountain retreat with stunning alpine views.",
  },
  {
    id: 6,
    title: "Commercial Office Space",
    location: "Seattle, WA",
    price: "3.8 ETH",
    usdPrice: "$6,460,000",
    bedrooms: 0,
    bathrooms: 4,
    sqft: 8500,
    image: "/smart-city-apartment.jpg",
    aiScore: 91,
    type: "Commercial",
    status: "Available",
    description: "Prime commercial office space in downtown Seattle.",
  },
]

const marketStats = [
  { label: "Total Volume", value: "125.8 ETH", change: "+12.5%", trend: "up" },
  { label: "Active Listings", value: "1,247", change: "+8.2%", trend: "up" },
  { label: "Avg. Price", value: "2.1 ETH", change: "-2.1%", trend: "down" },
  { label: "Properties Sold", value: "89", change: "+15.3%", trend: "up" },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 10])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("price-low")

  const propertyTypes = ["All", "Penthouse", "Villa", "Apartment", "Townhouse", "Cabin", "Commercial"]
  const locations = ["All", "Manhattan, NY", "Malibu, CA", "Austin, TX", "Boston, MA", "Aspen, CO", "Seattle, WA"]

  const filteredProperties = marketplaceProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || property.type.toLowerCase() === selectedType.toLowerCase()
    const matchesLocation = selectedLocation === "all" || property.location === selectedLocation
    const priceInEth = Number.parseFloat(property.price.replace(" ETH", ""))
    const matchesPrice = priceInEth >= priceRange[0] && priceInEth <= priceRange[1]

    return matchesSearch && matchesType && matchesLocation && matchesPrice
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = Number.parseFloat(a.price.replace(" ETH", ""))
    const priceB = Number.parseFloat(b.price.replace(" ETH", ""))

    switch (sortBy) {
      case "price-low":
        return priceA - priceB
      case "price-high":
        return priceB - priceA
      case "ai-score":
        return b.aiScore - a.aiScore
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  const handle3DView = (property: Property) => {
    console.log("[v0] Opening 3D view for marketplace property:", property.title)
  }

  const handleViewDetails = (property: Property) => {
    console.log("[v0] Viewing details for marketplace property:", property.title)
  }

  const handleFavorite = (property: Property) => {
    console.log("[v0] Toggled favorite for marketplace property:", property.title)
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-2">Property Marketplace</h1>
          <p className="text-lg text-muted-foreground">Discover and trade blockchain-verified real estate</p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {marketStats.map((stat, index) => (
            <Card key={index} className="p-4 hover-lift bg-card border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
              </div>
              <p className="font-bold text-xl text-foreground">{stat.value}</p>
              <p className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>{stat.change}</p>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 bg-card border-border">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search properties by name, location, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-transparent hover:bg-muted"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-background">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="ai-score">AI Score</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Property Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location.toLowerCase()}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Price Range: {priceRange[0]} - {priceRange[1]} ETH
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* Active Filters */}
            {(selectedType !== "all" || selectedLocation !== "all" || searchQuery) && (
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchQuery}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                {selectedType !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Type: {selectedType}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType("all")} />
                  </Badge>
                )}
                {selectedLocation !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Location: {selectedLocation}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation("all")} />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif font-bold text-2xl text-foreground">
              {sortedProperties.length} Properties Found
            </h2>
            <p className="text-muted-foreground">Showing results for your search criteria</p>
          </div>
          <Button className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Market Analytics
          </Button>
        </div>

        {/* Property Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onView3D={handle3DView}
                onViewDetails={handleViewDetails}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProperties.map((property) => (
              <Card key={property.id} className="p-6 hover-lift bg-card border-border">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 relative overflow-hidden rounded-lg">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-serif font-bold text-xl text-foreground mb-1">{property.title}</h3>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-secondary">{property.price}</div>
                        <div className="text-sm text-muted-foreground">{property.usdPrice}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{property.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.sqft} sqft</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handle3DView(property)}
                          className="bg-transparent"
                        >
                          3D View
                        </Button>
                        <Button
                          onClick={() => handleViewDetails(property)}
                          className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {sortedProperties.length === 0 && (
          <Card className="p-12 text-center bg-card border-border">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif font-bold text-xl text-foreground mb-2">No Properties Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more properties.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedType("all")
                setSelectedLocation("all")
                setPriceRange([0, 10])
              }}
              variant="outline"
              className="bg-transparent"
            >
              Clear All Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
