"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Eye, TrendingUp, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export interface Property {
  id: number
  title: string
  location: string
  price: string
  usdPrice: string
  bedrooms: number
  bathrooms: number
  sqft: number
  image: string
  aiScore: number
  type: string
  status: string
  description?: string
}

interface PropertyCardProps {
  property: Property
  className?: string
  showFavorite?: boolean
  onView3D?: (property: Property) => void
  onViewDetails?: (property: Property) => void
  onFavorite?: (property: Property) => void
}

export function PropertyCard({
  property,
  className,
  showFavorite = true,
  onView3D,
  onViewDetails,
  onFavorite,
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const router = useRouter()

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    onFavorite?.(property)
  }

  const handle3DView = () => {
    onView3D?.(property)
  }

  const handleViewDetails = () => {
    router.push(`/property/${property.id}`)
  }

  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3, ease: "easeOut" }}>
      <Card
        className={cn(
          "group overflow-hidden bg-card border-border cursor-pointer transform-3d perspective-1000 transition-all duration-500 ease-out",
          "hover:shadow-2xl hover:shadow-secondary/20",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with 3D Effects */}
        <div className="relative overflow-hidden h-64">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            width={400}
            height={300}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 ease-out",
              isHovered && "scale-110 brightness-110",
            )}
          />

          {/* Gradient Overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-secondary text-white shadow-lg backdrop-blur-sm">{property.type}</Badge>
            <Badge
              variant="outline"
              className="bg-background/90 backdrop-blur-sm border-white/20 text-foreground shadow-lg"
            >
              AI Score: {property.aiScore}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            {showFavorite && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="secondary"
                  className={cn(
                    "bg-black/80 backdrop-blur-sm hover:bg-black/90 transition-all duration-200 shadow-lg text-white",
                    isFavorited && "bg-red-500 hover:bg-red-600 text-white",
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFavorite()
                  }}
                >
                  <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
                </Button>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant="secondary"
                className={cn(
                  "bg-black/80 backdrop-blur-sm hover:bg-purple-600 transition-all duration-200 shadow-lg text-white",
                  "hover:scale-105",
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  handle3DView()
                }}
              >
                <Eye className="w-4 h-4 mr-1" />
                Virtual Tour
              </Button>
            </motion.div>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge
              className={cn(
                "shadow-lg backdrop-blur-sm",
                property.status === "Available"
                  ? "bg-green-500 text-white"
                  : property.status === "Sold"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-500 text-white",
              )}
            >
              {property.status}
            </Badge>
          </div>

          {/* 3D Floating Elements */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
              isHovered ? "opacity-20 scale-150" : "opacity-0 scale-100",
            )}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-xl animate-pulse" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-serif font-bold text-xl text-foreground mb-1 line-clamp-1">{property.title}</h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{property.location}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="font-bold text-lg text-secondary">{property.price}</div>
              <div className="text-sm text-muted-foreground">{property.usdPrice}</div>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>

          {/* Description */}
          {property.description && <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:shadow-lg"
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewDetails()
                }}
              >
                View Details
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                className="px-3 bg-transparent hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  // Add to watchlist or trending functionality
                }}
              >
                <TrendingUp className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* 3D Transform Effect on Hover */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-all duration-500",
            isHovered && "transform rotate-x-2 rotate-y-1",
          )}
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)"
              : "transparent",
          }}
        />
      </Card>
    </motion.div>
  )
}

// Skeleton loader for PropertyCard
export function PropertyCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden bg-card border-border", className)}>
      <div className="h-64 bg-muted animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-5 bg-muted rounded animate-pulse w-48" />
            <div className="h-4 bg-muted rounded animate-pulse w-32" />
          </div>
          <div className="space-y-1">
            <div className="h-5 bg-muted rounded animate-pulse w-20" />
            <div className="h-4 bg-muted rounded animate-pulse w-24" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-4 bg-muted rounded animate-pulse w-16" />
          <div className="h-4 bg-muted rounded animate-pulse w-16" />
          <div className="h-4 bg-muted rounded animate-pulse w-16" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-muted rounded animate-pulse flex-1" />
          <div className="h-10 bg-muted rounded animate-pulse w-12" />
        </div>
      </div>
    </Card>
  )
}
