"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard, type Property } from "@/components/PropertyCard"
import {
  TrendingUp,
  Wallet,
  Home,
  PieChart,
  Activity,
  Plus,
  Filter,
  Search,
  Calendar,
  DollarSign,
  BarChart3,
} from "lucide-react"

// Mock data for user's properties
const userProperties: Property[] = [
  {
    id: 1,
    title: "Downtown Loft",
    location: "San Francisco, CA",
    price: "1.8 ETH",
    usdPrice: "$3,060,000",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    image: "/modern-penthouse-interior.png",
    aiScore: 91,
    type: "Loft",
    status: "Owned",
    description: "Modern loft in the heart of downtown with city views and premium amenities.",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "Austin, TX",
    price: "0.9 ETH",
    usdPrice: "$1,530,000",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: "/smart-city-apartment.jpg",
    aiScore: 87,
    type: "House",
    status: "Owned",
    description: "Spacious family home with large backyard and modern smart home features.",
  },
]

const propertyShares = [
  {
    id: 3,
    title: "Luxury Beach Resort",
    location: "Miami, FL",
    totalValue: "12.5 ETH",
    userShares: "0.25 ETH",
    sharePercentage: 2,
    monthlyReturn: "+$1,240",
    image: "/luxury-beachfront-villa.png",
    aiScore: 94,
  },
  {
    id: 4,
    title: "Commercial Office Building",
    location: "New York, NY",
    totalValue: "25.0 ETH",
    userShares: "0.5 ETH",
    sharePercentage: 2,
    monthlyReturn: "+$2,180",
    image: "/modern-penthouse-interior.png",
    aiScore: 89,
  },
]

const recentTransactions = [
  {
    id: 1,
    type: "Purchase",
    property: "Downtown Loft",
    amount: "1.8 ETH",
    usdAmount: "$3,060,000",
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: 2,
    type: "Share Purchase",
    property: "Luxury Beach Resort",
    amount: "0.25 ETH",
    usdAmount: "$425,000",
    date: "2024-01-10",
    status: "Completed",
  },
  {
    id: 3,
    type: "Dividend",
    property: "Commercial Office Building",
    amount: "+0.02 ETH",
    usdAmount: "+$2,180",
    date: "2024-01-05",
    status: "Received",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const totalPortfolioValue = "3.55 ETH"
  const totalUsdValue = "$6,035,000"
  const monthlyReturn = "+$3,420"
  const totalProperties = userProperties.length
  const totalShares = propertyShares.length

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-2">Portfolio Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage your blockchain real estate investments</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover-lift bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              <p className="font-bold text-2xl text-foreground">{totalPortfolioValue}</p>
              <p className="text-sm text-muted-foreground">{totalUsdValue}</p>
            </div>
          </Card>

          <Card className="p-6 hover-lift bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-green-100 text-green-800">+12.5%</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Monthly Return</p>
              <p className="font-bold text-2xl text-green-600">{monthlyReturn}</p>
              <p className="text-sm text-muted-foreground">vs last month</p>
            </div>
          </Card>

          <Card className="p-6 hover-lift bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Properties Owned</p>
              <p className="font-bold text-2xl text-foreground">{totalProperties}</p>
              <p className="text-sm text-muted-foreground">Full ownership</p>
            </div>
          </Card>

          <Card className="p-6 hover-lift bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Property Shares</p>
              <p className="font-bold text-2xl text-foreground">{totalShares}</p>
              <p className="text-sm text-muted-foreground">Fractional ownership</p>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="shares" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Shares
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Transactions
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Performance Chart */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif font-bold text-xl text-foreground">Portfolio Performance</h3>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last 30 days
                  </Button>
                </div>
                <div className="h-64 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-2" />
                    <p className="text-muted-foreground">Portfolio performance chart</p>
                    <p className="text-sm text-muted-foreground">3D visualization coming soon</p>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 bg-card border-border">
                <h3 className="font-serif font-bold text-xl text-foreground mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">{transaction.property}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{transaction.amount}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <h3 className="font-serif font-bold text-2xl text-foreground mb-2">Your Properties</h3>
                <p className="text-muted-foreground">Properties you fully own</p>
              </div>
              <Button className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  showFavorite={false}
                  onView3D={(prop) => console.log("[v0] Opening 3D view for owned property:", prop.title)}
                  onViewDetails={(prop) => console.log("[v0] Viewing details for owned property:", prop.title)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Shares Tab */}
          <TabsContent value="shares" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <h3 className="font-serif font-bold text-2xl text-foreground mb-2">Property Shares</h3>
                <p className="text-muted-foreground">Fractional ownership investments</p>
              </div>
              <Button className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Buy Shares
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {propertyShares.map((share) => (
                <Card key={share.id} className="overflow-hidden hover-lift bg-card border-border">
                  <div className="relative h-48">
                    <img
                      src={share.image || "/placeholder.svg"}
                      alt={share.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-white">{share.sharePercentage}% Share</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif font-bold text-lg text-foreground mb-2">{share.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{share.location}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Your Investment</p>
                        <p className="font-bold text-secondary">{share.userShares}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Return</p>
                        <p className="font-bold text-green-600">{share.monthlyReturn}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white">
                        View Details
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        Sell Shares
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <h3 className="font-serif font-bold text-2xl text-foreground mb-2">Transaction History</h3>
                <p className="text-muted-foreground">All your blockchain transactions</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">{transaction.property}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-foreground">{transaction.amount}</p>
                        <p className="text-sm text-muted-foreground">{transaction.usdAmount}</p>
                        <Badge
                          className={
                            transaction.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "Received"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
