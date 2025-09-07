"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard, type Property } from "@/components/PropertyCard"
import { PropertyModals } from "@/components/PropertyModals"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Shield,
  Eye,
  Heart,
  Share2,
  Download,
  Upload,
  Camera,
  Play,
  Maximize,
  RotateCcw,
  Move3D,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Share,
} from "lucide-react"

// Mock property data - in real app this would come from API
const propertyData: Property & {
  images: string[]
  virtualTour: string
  description: string
  features: string[]
  neighborhood: {
    walkScore: number
    transitScore: number
    bikeScore: number
    schools: { name: string; rating: number; distance: string }[]
    amenities: string[]
  }
  financials: {
    monthlyRent: string
    propertyTax: string
    hoa: string
    insurance: string
    capRate: string
    cashFlow: string
  }
  blockchain: {
    tokenId: string
    contractAddress: string
    mintDate: string
    lastSale: string
    transactionHistory: { date: string; price: string; type: string }[]
  }
  aiInsights: {
    priceScore: number
    investmentScore: number
    marketTrend: string
    priceHistory: { date: string; price: number }[]
    predictions: { timeframe: string; prediction: string; confidence: number }[]
  }
} = {
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
  images: [
    "/modern-penthouse-interior.png",
    "/luxury-beachfront-villa.png",
    "/smart-city-apartment.jpg",
    "/modern-penthouse-interior.png",
  ],
  virtualTour: "/virtual-tour-placeholder.mp4",
  description:
    "Experience luxury living at its finest in this stunning downtown penthouse. This exceptional property offers breathtaking panoramic city views, premium finishes throughout, and access to world-class amenities. The open-concept design seamlessly blends modern sophistication with comfort, featuring floor-to-ceiling windows, hardwood floors, and a gourmet kitchen with top-of-the-line appliances. The master suite includes a spa-like bathroom and private balcony overlooking the city skyline.",
  features: [
    "Panoramic city views",
    "Floor-to-ceiling windows",
    "Hardwood floors",
    "Gourmet kitchen",
    "Spa-like master bathroom",
    "Private balcony",
    "Smart home technology",
    "Concierge service",
    "Rooftop terrace access",
    "Fitness center",
    "Wine storage",
    "24/7 security",
  ],
  neighborhood: {
    walkScore: 98,
    transitScore: 95,
    bikeScore: 87,
    schools: [
      { name: "Manhattan Elementary", rating: 9, distance: "0.3 miles" },
      { name: "Central High School", rating: 8, distance: "0.5 miles" },
    ],
    amenities: [
      "Central Park - 0.2 miles",
      "Whole Foods - 0.1 miles",
      "Starbucks - 0.1 miles",
      "Gym - Building",
      "Restaurants - 0.1 miles",
    ],
  },
  financials: {
    monthlyRent: "$18,500",
    propertyTax: "$42,000/year",
    hoa: "$2,800/month",
    insurance: "$8,500/year",
    capRate: "4.2%",
    cashFlow: "+$2,400/month",
  },
  blockchain: {
    tokenId: "NYC-PENT-001",
    contractAddress: "0x1234...5678",
    mintDate: "2024-01-15",
    lastSale: "2.3 ETH",
    transactionHistory: [
      { date: "2024-01-15", price: "2.3 ETH", type: "Mint" },
      { date: "2024-01-10", price: "2.1 ETH", type: "Transfer" },
    ],
  },
  aiInsights: {
    priceScore: 95,
    investmentScore: 92,
    marketTrend: "Bullish",
    priceHistory: [
      { date: "Jan", price: 2.1 },
      { date: "Feb", price: 2.3 },
      { date: "Mar", price: 2.5 },
    ],
    predictions: [
      { timeframe: "6 months", prediction: "+8-12%", confidence: 85 },
      { timeframe: "1 year", prediction: "+15-20%", confidence: 78 },
      { timeframe: "2 years", prediction: "+25-35%", confidence: 65 },
    ],
  },
}

const relatedProperties: Property[] = [
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
  },
]

export default function PropertyDetailPage() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [is3DMode, setIs3DMode] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [modalType, setModalType] = useState<"buy" | "mint" | "upload" | "fraction" | null>(null)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length)
  }

  const handlePurchase = () => {
    setSelectedProperty(propertyData)
    setModalType("buy")
  }

  const handleMint = () => {
    setSelectedProperty(propertyData)
    setModalType("mint")
  }

  const handleUpload = () => {
    setSelectedProperty(propertyData)
    setModalType("upload")
  }

  const handleBuyFraction = () => {
    setSelectedProperty(propertyData)
    setModalType("fraction")
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-2">{propertyData.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{propertyData.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className="bg-transparent"
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-current text-red-500" : ""}`} />
                {isFavorited ? "Saved" : "Save"}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery & Virtual Viewer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="overflow-hidden bg-card border-border">
                <div className="relative h-96 md:h-[500px]">
                  <AnimatePresence mode="wait">
                    {!is3DMode ? (
                      <motion.div
                        key="gallery"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                      >
                        <img
                          src={propertyData.images[currentImageIndex] || "/placeholder.svg"}
                          alt={`${propertyData.title} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-secondary text-white">{propertyData.type}</Badge>
                          <Badge className="bg-green-500 text-white">{propertyData.status}</Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setIs3DMode(true)}
                              className="bg-black/90 backdrop-blur-sm hover:bg-purple-600 text-white"
                            >
                              <Move3D className="w-4 h-4 mr-1" />
                              Virtual Tour
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-black/90 backdrop-blur-sm hover:bg-purple-600 text-white"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Video Tour
                            </Button>
                          </motion.div>
                        </div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/90 backdrop-blur-sm hover:bg-purple-600 text-white"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/90 backdrop-blur-sm hover:bg-purple-600 text-white"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        </motion.div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {propertyData.images.map((_, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.2 }}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex ? "bg-white" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="3d-viewer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center"
                      >
                        <div className="text-center">
                          <motion.div
                            animate={{ rotateY: 360 }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4"
                          >
                            <Move3D className="w-12 h-12 text-white" />
                          </motion.div>
                          <h3 className="font-serif font-bold text-xl text-foreground mb-2">Virtual Model Viewer</h3>
                          <p className="text-muted-foreground mb-4">Interactive virtual property model</p>
                          <div className="flex gap-2 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Reset View
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                <Maximize className="w-4 h-4 mr-1" />
                                Fullscreen
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setIs3DMode(false)}
                                className="bg-transparent"
                              >
                                <Camera className="w-4 h-4 mr-1" />
                                Photos
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>

            {/* Property Details Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="overview" className="space-y-6">
                      <Card className="p-6 bg-card border-border">
                        <h3 className="font-serif font-bold text-xl text-foreground mb-4">Property Description</h3>
                        <p className="text-muted-foreground leading-relaxed">{propertyData.description}</p>
                      </Card>

                      <Card className="p-6 bg-card border-border">
                        <h3 className="font-serif font-bold text-xl text-foreground mb-4">Neighborhood</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Walkability Scores</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Walk Score</span>
                                <span className="font-medium">{propertyData.neighborhood.walkScore}/100</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Transit Score</span>
                                <span className="font-medium">{propertyData.neighborhood.transitScore}/100</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Bike Score</span>
                                <span className="font-medium">{propertyData.neighborhood.bikeScore}/100</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Schools</h4>
                            <div className="space-y-2">
                              {propertyData.neighborhood.schools.map((school, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">{school.name}</span>
                                    <span className="font-medium">{school.rating}/10</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{school.distance}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Nearby Amenities</h4>
                            <div className="space-y-1">
                              {propertyData.neighborhood.amenities.map((amenity, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                  {amenity}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TabsContent>

                    <TabsContent value="features" className="space-y-6">
                      <Card className="p-6 bg-card border-border">
                        <h3 className="font-serif font-bold text-xl text-foreground mb-4">Property Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {propertyData.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-secondary rounded-full" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </TabsContent>

                    <TabsContent value="financials" className="space-y-6">
                      <Card className="p-6 bg-card border-border">
                        <h3 className="font-serif font-bold text-xl text-foreground mb-4">Financial Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monthly Rent</span>
                              <span className="font-medium">{propertyData.financials.monthlyRent}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Property Tax</span>
                              <span className="font-medium">{propertyData.financials.propertyTax}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">HOA Fees</span>
                              <span className="font-medium">{propertyData.financials.hoa}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Insurance</span>
                              <span className="font-medium">{propertyData.financials.insurance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cap Rate</span>
                              <span className="font-medium text-green-600">{propertyData.financials.capRate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cash Flow</span>
                              <span className="font-medium text-green-600">{propertyData.financials.cashFlow}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TabsContent>

                    <TabsContent value="blockchain" className="space-y-6">
                      <Card className="p-6 bg-card border-border">
                        <h3 className="font-serif font-bold text-xl text-foreground mb-4">Blockchain Information</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm text-muted-foreground">Token ID</span>
                              <p className="font-mono text-sm">{propertyData.blockchain.tokenId}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Contract Address</span>
                              <p className="font-mono text-sm">{propertyData.blockchain.contractAddress}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Mint Date</span>
                              <p className="text-sm">{propertyData.blockchain.mintDate}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Last Sale</span>
                              <p className="text-sm">{propertyData.blockchain.lastSale}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Transaction History</h4>
                            <div className="space-y-2">
                              {propertyData.blockchain.transactionHistory.map((tx, index) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                  <div>
                                    <span className="text-sm font-medium">{tx.type}</span>
                                    <span className="text-xs text-muted-foreground ml-2">{tx.date}</span>
                                  </div>
                                  <span className="font-medium">{tx.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6 bg-card border-border">
                <div className="text-center mb-6">
                  <div className="font-bold text-3xl text-secondary mb-1">{propertyData.price}</div>
                  <div className="text-lg text-muted-foreground">{propertyData.usdPrice}</div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Bed className="w-4 h-4 mr-1" />
                      <span className="font-medium">{propertyData.bedrooms}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Bedrooms</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Bath className="w-4 h-4 mr-1" />
                      <span className="font-medium">{propertyData.bathrooms}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Bathrooms</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Square className="w-4 h-4 mr-1" />
                      <span className="font-medium">{propertyData.sqft}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Sq Ft</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handlePurchase} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Wallet className="w-4 h-4 mr-2" />
                      Purchase Property
                    </Button>
                  </motion.div>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button onClick={handleBuyFraction} variant="outline" className="w-full bg-transparent text-sm">
                        <Share className="w-4 h-4 mr-1" />
                        Buy Fraction
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button onClick={handleMint} variant="outline" className="w-full bg-transparent text-sm">
                        <Shield className="w-4 h-4 mr-1" />
                        Mint NFT
                      </Button>
                    </motion.div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleUpload} variant="outline" className="w-full bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-serif font-bold text-lg text-foreground mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Score</span>
                  <Badge className="bg-secondary text-white">{propertyData.aiScore}/100</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Investment Score</span>
                  <span className="font-medium">{propertyData.aiInsights.investmentScore}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Market Trend</span>
                  <Badge className="bg-green-100 text-green-800">{propertyData.aiInsights.marketTrend}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Price Predictions</h4>
                  <div className="space-y-2">
                    {propertyData.aiInsights.predictions.map((prediction, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{prediction.timeframe}</span>
                        <span className="font-medium text-green-600">{prediction.prediction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-serif font-bold text-lg text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Listed</span>
                  </div>
                  <span className="text-sm font-medium">15 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Views</span>
                  </div>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Favorites</span>
                  </div>
                  <span className="text-sm font-medium">89</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Properties */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="font-serif font-bold text-2xl text-foreground mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <PropertyCard
                  property={property}
                  onView3D={(prop) => console.log("[v0] Opening virtual tour for related property:", prop.title)}
                  onViewDetails={(prop) => (window.location.href = `/property/${prop.id}`)}
                  onFavorite={(prop) => console.log("[v0] Toggled favorite for related property:", prop.title)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <PropertyModals
        property={selectedProperty}
        modalType={modalType}
        onClose={() => {
          setSelectedProperty(null)
          setModalType(null)
        }}
      />
    </div>
  )
}
