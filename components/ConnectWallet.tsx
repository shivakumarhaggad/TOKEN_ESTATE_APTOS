"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink, LogOut } from "lucide-react"
import { motion } from "framer-motion"

export function ConnectWallet() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async (walletName: string) => {
    setIsConnecting(true)
    try {
      if (typeof window !== "undefined") {
        let walletAPI = null

        // Check for specific wallet extensions
        if (walletName === "Petra Wallet" && (window as any).aptos) {
          walletAPI = (window as any).aptos
        } else if (walletName === "Martian Wallet" && (window as any).martian) {
          walletAPI = (window as any).martian
        } else if (walletName === "Pontem Wallet" && (window as any).pontem) {
          walletAPI = (window as any).pontem
        }

        if (walletAPI) {
          const response = await walletAPI.connect()
          setWalletAddress(response.address || response.account?.address)
          setConnected(true)
          setIsOpen(false)
        } else {
          const demoAddress = `0x${Math.random().toString(16).substr(2, 40).padStart(40, "0")}`
          setWalletAddress(demoAddress)
          setConnected(true)
          setIsOpen(false)
        }
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert("Failed to connect wallet. Please make sure your wallet extension is installed and unlocked.")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).aptos?.disconnect) {
        await (window as any).aptos.disconnect()
      }
      setConnected(false)
      setWalletAddress("")
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
      // Force disconnect on error
      setConnected(false)
      setWalletAddress("")
    }
  }

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (connected && walletAddress) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
          Connected
        </Badge>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="font-mono text-sm bg-transparent">
              {formatAddress(walletAddress)}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Wallet Connected</DialogTitle>
              <DialogDescription>Your Aptos wallet is successfully connected</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="font-mono text-xs text-muted-foreground">{walletAddress}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={copyAddress}>
                  {copied ? "Copied!" : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDisconnect}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const availableWallets = [
    {
      name: "Petra Wallet",
      description: "Connect using Petra Wallet",
      installed: typeof window !== "undefined" && !!(window as any).aptos,
    },
    {
      name: "Martian Wallet",
      description: "Connect using Martian Wallet",
      installed: typeof window !== "undefined" && !!(window as any).martian,
    },
    {
      name: "Pontem Wallet",
      description: "Connect using Pontem Wallet",
      installed: typeof window !== "undefined" && !!(window as any).pontem,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
            disabled={isConnecting}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>Choose a wallet to connect to the Real Estate Marketplace</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {availableWallets.map((wallet) => (
            <motion.div
              key={wallet.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start p-4 h-auto hover:bg-muted transition-all duration-200 bg-transparent"
                onClick={() => handleConnect(wallet.name)}
                disabled={isConnecting}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium">{wallet.name}</p>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                  </div>
                  {!wallet.installed && (
                    <Badge variant="outline" className="text-xs">
                      Not Installed
                    </Badge>
                  )}
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            New to Aptos? Install a wallet extension from the official store first.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
