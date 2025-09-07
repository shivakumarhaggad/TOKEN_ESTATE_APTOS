"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building,
  Headphones,
  Globe,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    contact: "hello@realestate3d.com",
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    contact: "+1 (555) 123-4567",
    action: "Call Now",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with support",
    contact: "Available 24/7",
    action: "Start Chat",
  },
]

const offices = [
  {
    city: "San Francisco",
    address: "123 Market Street, Suite 500",
    zipcode: "San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "sf@realestate3d.com",
  },
  {
    city: "New York",
    address: "456 Broadway, Floor 20",
    zipcode: "New York, NY 10013",
    phone: "+1 (555) 987-6543",
    email: "ny@realestate3d.com",
  },
  {
    city: "London",
    address: "789 Canary Wharf",
    zipcode: "London E14 5AB, UK",
    phone: "+44 20 7123 4567",
    email: "london@realestate3d.com",
  },
]

const inquiryTypes = [
  "General Inquiry",
  "Investment Opportunities",
  "Technical Support",
  "Partnership",
  "Media & Press",
  "Careers",
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log("[v0] Submitting contact form:", formData)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    // Reset form or show success message
    setFormData({
      name: "",
      email: "",
      company: "",
      inquiryType: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-background via-muted/30 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif font-bold text-4xl md:text-6xl text-foreground mb-6 text-balance">
            Get in{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Ready to revolutionize your real estate investment journey? Our team is here to help you navigate the future
            of blockchain-powered property ownership.
          </p>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <Card
                  key={index}
                  className="p-8 text-center hover-lift bg-card border-border cursor-pointer transform-3d perspective-1000"
                  onMouseEnter={() => setHoveredMethod(index)}
                  onMouseLeave={() => setHoveredMethod(null)}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                      hoveredMethod === index ? "scale-110 shadow-lg" : ""
                    }`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-foreground mb-2">{method.title}</h3>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <p className="font-medium text-foreground mb-4">{method.contact}</p>
                  <Button
                    className={`bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white transition-all duration-200 ${
                      hoveredMethod === index ? "scale-105 shadow-lg" : ""
                    }`}
                  >
                    {method.action}
                  </Button>
                </Card>
              )
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="p-8 bg-card border-border">
              <div className="mb-8">
                <h2 className="font-serif font-bold text-2xl text-foreground mb-2">Send us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="John Doe"
                      required
                      className="bg-background border-border focus:ring-2 focus:ring-secondary transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                      required
                      className="bg-background border-border focus:ring-2 focus:ring-secondary transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Company</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your Company"
                      className="bg-background border-border focus:ring-2 focus:ring-secondary transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Inquiry Type *</label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) => handleInputChange("inquiryType", value)}
                    >
                      <SelectTrigger className="bg-background border-border focus:ring-2 focus:ring-secondary transition-all duration-200 hover:shadow-md">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject *</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="How can we help you?"
                    required
                    className="bg-background border-border focus:ring-2 focus:ring-secondary transition-all duration-200 hover:shadow-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    className="bg-background border-border focus:ring-2 focus:ring-secondary transition-all duration-200 hover:shadow-md resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-medium py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Locations */}
            <Card className="p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-foreground">Our Offices</h3>
                  <p className="text-muted-foreground">Visit us at one of our locations</p>
                </div>
              </div>

              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <h4 className="font-medium text-foreground mb-2">{office.city}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{office.address}</span>
                      </div>
                      <div className="ml-6">{office.zipcode}</div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{office.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-foreground">Business Hours</h3>
                  <p className="text-muted-foreground">When you can reach us</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Headphones className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">24/7 Support available via live chat</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-foreground">Follow Us</h3>
                  <p className="text-muted-foreground">Stay updated with our latest news</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="bg-transparent hover:bg-secondary hover:text-white">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent hover:bg-secondary hover:text-white">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent hover:bg-secondary hover:text-white">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
