"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Beaker, BookOpen, BrainCircuit, Lightbulb, RefreshCw, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import OnboardingFlow from "@/components/onboarding-flow"
import { storage, type Project } from "@/lib/storage"

/**
 * Landing page for Introspect. Now includes a project selector dropdown in the header.
 */

/**
 * Home (landing) page. Shows app intro and a dropdown menu for project navigation.
 */
export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const router = useRouter()

  // Load projects from storage on mount.
  useEffect(() => {
    const data = storage.loadData()
    setProjects(data?.projects || [])
  }, [])

  // Render landing page with header dropdown.
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-purple-600" />
            <h1 className="text-xl font-bold">Introspect</h1>
            {/* Project dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-4 flex items-center gap-1">
                  Projects
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>All Projects</DropdownMenuItem>
                {projects.length === 0 ? (
                  <DropdownMenuItem disabled>No projects found</DropdownMenuItem>
                ) : (
                  projects.map((project) => (
                    <DropdownMenuItem
                      key={project.id}
                      onClick={() => router.push(`/dashboard/project/${project.id}/overview`)}
                    >
                      {project.title}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 container px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Research Process</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Introspect helps researchers systematize their thinking, track inputs, evaluate results, and maintain
              perspective.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowOnboarding(true)}>
              Get Started
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Lightbulb className="h-6 w-6 text-purple-600 mb-2" />
                <CardTitle>Systematize Hypotheses</CardTitle>
                <CardDescription>Organize your research hypotheses and key assumptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Create structured frameworks for your research questions, track evolving hypotheses, and document key
                  assumptions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-6 w-6 text-purple-600 mb-2" />
                <CardTitle>Track Readings & Inputs</CardTitle>
                <CardDescription>Manage your research sources and notes</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Organize literature reviews, capture key insights from readings, and connect sources to your
                  hypotheses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Beaker className="h-6 w-6 text-purple-600 mb-2" />
                <CardTitle>Evaluate Results</CardTitle>
                <CardDescription>Analyze findings and draw conclusions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Document experimental results, evaluate evidence against hypotheses, and track the evolution of your
                  conclusions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <RefreshCw className="h-6 w-6 text-purple-600 mb-2" />
                <CardTitle>Iterate & See the Big Picture</CardTitle>
                <CardDescription>Maintain perspective on your research</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Receive timely reminders to revisit your research model, visualize connections between components, and
                  maintain the big picture.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 bg-white dark:bg-gray-950">
        <div className="container px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Introspect. All rights reserved.
        </div>
      </footer>

      <OnboardingFlow open={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  )
}
