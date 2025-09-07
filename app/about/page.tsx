"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Shield, Zap, Globe, Award, Building, Linkedin, Twitter, Mail, ChevronRight } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former Goldman Sachs VP with 15+ years in real estate finance and blockchain technology.",
    image: "/professional-woman-ceo.png",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer specializing in 3D visualization and smart contract development.",
    image: "/professional-man-cto.png",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Emily Watson",
    role: "Head of AI & Analytics",
    bio: "PhD in Machine Learning from MIT, former Tesla AI researcher with expertise in predictive modeling.",
    image: "/professional-ai-researcher.png",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "James Park",
    role: "Head of Blockchain",
    bio: "Ethereum Foundation contributor and smart contract security expert with 8+ years experience.",
    image: "/professional-man-blockchain-developer.jpg",
    linkedin: "#",
    twitter: "#",
  },
]

const milestones = [
  { year: "2023", title: "Company Founded", description: "RealEstate3D launched with seed funding" },
  { year: "2023", title: "First Property Tokenized", description: "Successfully tokenized $10M Manhattan penthouse" },
  { year: "2024", title: "AI Integration", description: "Launched AI-powered property valuation system" },
  { year: "2024", title: "3D Platform Launch", description: "Released immersive 3D property visualization" },
  { year: "2024", title: "Series A Funding", description: "$25M Series A led by Andreessen Horowitz" },
]

const stats = [
  { value: "$2.5B+", label: "Properties Tokenized", icon: Building },
  { value: "10,000+", label: "Active Users", icon: Users },
  { value: "500+", label: "Properties Listed", icon: Globe },
  { value: "99.9%", label: "Uptime", icon: Shield },
]

export default function AboutPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-background via-muted/30 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif font-bold text-4xl md:text-6xl text-foreground mb-6 text-balance">
            Revolutionizing Real Estate with{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Blockchain Technology
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            We're building the future of property investment through innovative blockchain solutions, immersive 3D
            experiences, and AI-powered insights that democratize real estate access for everyone.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            Join Our Mission
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To democratize real estate investment by leveraging blockchain technology, making property ownership
                accessible, transparent, and efficient for investors worldwide.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-foreground mb-2">Accessibility</h3>
                    <p className="text-muted-foreground">
                      Breaking down barriers to real estate investment through fractional ownership and blockchain
                      technology.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-foreground mb-2">Transparency</h3>
                    <p className="text-muted-foreground">
                      Providing complete transparency in transactions, ownership, and property performance through
                      blockchain.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-foreground mb-2">Innovation</h3>
                    <p className="text-muted-foreground">
                      Pioneering the integration of 3D visualization, AI analytics, and smart contracts in real estate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Building className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-muted-foreground">Interactive 3D Mission Visualization</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="p-6 text-center hover-lift bg-card border-border">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-2xl md:text-3xl text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry experts and visionaries driving the future of blockchain real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover-lift bg-card border-border cursor-pointer transform-3d perspective-1000"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      hoveredMember === index ? "scale-110 brightness-110" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                      hoveredMember === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
                      hoveredMember === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-lg text-foreground mb-1">{member.name}</h3>
                  <Badge className="bg-secondary text-white mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to revolutionize real estate
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-secondary to-accent"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="p-6 hover-lift bg-card border-border">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-secondary text-white">{milestone.year}</Badge>
                        <Award className="w-5 h-5 text-secondary" />
                      </div>
                      <h3 className="font-serif font-bold text-lg text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-gradient-to-br from-secondary to-accent rounded-full border-4 border-background"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-r from-secondary to-accent text-white">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Ready to Join the Revolution?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Be part of the future of real estate investment. Connect with our team and discover how blockchain
              technology can transform your investment strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-secondary hover:bg-white/90 font-medium px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-secondary px-8 py-3 rounded-lg transition-all duration-200 bg-transparent"
              >
                Contact Our Team
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
