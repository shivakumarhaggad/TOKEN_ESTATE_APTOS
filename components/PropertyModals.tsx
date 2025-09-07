"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { Upload, DollarSign, FileText, Share } from "lucide-react"
import type { Property } from "./PropertyCard"

interface PropertyModalsProps {
  property: Property | null
  modalType: "buy" | "mint" | "upload" | "fraction" | null
  onClose: () => void
}

export function PropertyModals({ property, modalType, onClose }: PropertyModalsProps) {
  const [fractionAmount, setFractionAmount] = useState([10])
  const [buyAmount, setBuyAmount] = useState("")
  const [uploadFile, setUploadFile] = useState<File | null>(null)

  const handleBuyFraction = () => {
    console.log("[v0] Buying fraction:", fractionAmount[0], "% of", property?.title)
    // Placeholder for buy fraction logic
    onClose()
  }

  const handleMint = () => {
    console.log("[v0] Minting property:", property?.title)
    // Placeholder for mint logic
    onClose()
  }

  const handleUpload = () => {
    console.log("[v0] Uploading document for:", property?.title, uploadFile?.name)
    // Placeholder for upload logic
    onClose()
  }

  if (!property || !modalType) return null

  return (
    <>
      {/* Buy Fraction Modal */}
      <Dialog open={modalType === "fraction"} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share className="w-5 h-5 text-secondary" />
              Buy Property Fraction
            </DialogTitle>
            <DialogDescription>Purchase a fraction of {property.title}</DialogDescription>
          </DialogHeader>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Property Value</span>
                <span className="font-bold">{property.usdPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Blockchain Price</span>
                <Badge variant="secondary">{property.price}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Fraction Percentage: {fractionAmount[0]}%</Label>
              <Slider
                value={fractionAmount}
                onValueChange={setFractionAmount}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Cost: $
                  {(
                    (Number.parseFloat(property.usdPrice.replace(/[$,]/g, "")) * fractionAmount[0]) /
                    100
                  ).toLocaleString()}
                </span>
                <span>
                  ETH: {((Number.parseFloat(property.price.replace(" ETH", "")) * fractionAmount[0]) / 100).toFixed(3)}{" "}
                  ETH
                </span>
              </div>
            </div>

            <Button onClick={handleBuyFraction} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <DollarSign className="w-4 h-4 mr-2" />
              Buy {fractionAmount[0]}% Fraction
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Mint Property Modal */}
      <Dialog open={modalType === "mint"} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              Mint Property NFT
            </DialogTitle>
            <DialogDescription>Create a blockchain NFT for {property.title}</DialogDescription>
          </DialogHeader>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Property Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{property.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span>{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{property.sqft} sqft</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mint-description">NFT Description</Label>
              <Textarea
                id="mint-description"
                placeholder="Enter a description for this property NFT..."
                defaultValue={property.description}
              />
            </div>

            <Button onClick={handleMint} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Mint Property NFT
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Upload Document Modal */}
      <Dialog open={modalType === "upload"} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-secondary" />
              Upload Document
            </DialogTitle>
            <DialogDescription>Upload documents for {property.title}</DialogDescription>
          </DialogHeader>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document-type">Document Type</Label>
              <select id="document-type" className="w-full p-2 border border-border rounded-lg bg-background">
                <option>Property Deed</option>
                <option>Inspection Report</option>
                <option>Appraisal Report</option>
                <option>Insurance Documents</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-upload">Select File</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-sm text-muted-foreground">
                    {uploadFile ? uploadFile.name : "Click to upload or drag and drop"}
                  </span>
                </label>
              </div>
            </div>

            <Button onClick={handleUpload} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Buy Property Modal */}
      <Dialog open={modalType === "buy"} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-secondary" />
              Purchase Property
            </DialogTitle>
            <DialogDescription>Complete purchase of {property.title}</DialogDescription>
          </DialogHeader>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Total Price</span>
                <span className="font-bold text-lg">{property.usdPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Blockchain Price</span>
                <Badge variant="secondary" className="text-sm">
                  {property.price}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="offer-amount">Your Offer (ETH)</Label>
              <Input
                id="offer-amount"
                type="number"
                placeholder={property.price.replace(" ETH", "")}
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
              />
            </div>

            <Button
              onClick={() => {
                console.log("[v0] Purchasing property:", property.title, "for", buyAmount, "ETH")
                onClose()
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Purchase Property
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  )
}
