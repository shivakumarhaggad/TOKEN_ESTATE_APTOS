"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Filter, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { PropertyCard, type Property } from "@/components/PropertyCard"
import { PropertyModals } from "@/components/PropertyModals"
import { motion } from "framer-motion"
import { useState } from "react"

const featuredProperties: Property[] = [
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
    description: "Stunning penthouse with panoramic city views, modern amenities, and premium finishes throughout.",
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
    description: "Exclusive beachfront villa with private beach access, infinity pool, and breathtaking ocean views.",
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
    description: "Tech-enabled smart apartment in the heart of Austin with automated systems and modern design.",
  },
]

export default function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [modalType, setModalType] = useState<"buy" | "mint" | "upload" | "fraction" | null>(null)
  const router = useRouter()

  const handleVirtualTour = (property: Property) => {
    // Future: Open virtual tour viewer
  }

  const handleViewDetails = (property: Property) => {
    router.push(`/property/${property.id}`)
  }

  const handleFavorite = (property: Property) => {
    // Future: Add to favorites
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 text-balance"
          >
            The Future of{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Real Estate</span>{" "}
            is Here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty"
          >
            Experience revolutionary blockchain-based property trading with immersive virtual tours, secure Aptos wallet
            integration, and AI-powered property insights.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/marketplace">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  Explore Properties
                </Button>
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg transition-all duration-200 bg-transparent"
                >
                  Learn More
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
        />
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">Featured Properties</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover premium blockchain-verified properties with immersive virtual experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PropertyCard
                  property={property}
                  onView3D={handleVirtualTour}
                  onViewDetails={handleViewDetails}
                  onFavorite={handleFavorite}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/marketplace">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent px-8 py-3"
                >
                  View All Properties
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">Revolutionary Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how blockchain technology and virtual visualization transform real estate investment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Virtual Property Tours",
                description:
                  "Immersive virtual tours let you explore properties in detail before making investment decisions.",
              },
              {
                icon: Shield,
                title: "Blockchain Security",
                description:
                  "Secure, transparent transactions powered by Aptos blockchain technology and smart contracts.",
              },
              {
                icon: Zap,
                title: "AI-Powered Insights",
                description:
                  "Advanced AI algorithms provide property valuations, market trends, and investment recommendations.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 hover-lift bg-card border-border h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Search Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">
              Find Your Perfect Property
            </h2>
            <p className="text-lg text-muted-foreground">Search through thousands of blockchain-verified properties</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4 p-6 bg-card rounded-xl border border-border shadow-lg">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by location, property type, or price range..."
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
              <Link href="/marketplace">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Search Properties
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif font-bold text-3xl md:text-4xl text-white mb-6"
          >
            Ready to Start Your Real Estate Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of investors who are already using blockchain technology to revolutionize their real estate
            portfolio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/marketplace">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  Get Started Today
                </Button>
              </motion.div>
            </Link>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg transition-all duration-200 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

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