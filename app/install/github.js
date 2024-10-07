import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, FileCode, GitBranch, Users } from 'lucide-react'

export default function GitHubIntegration() {
  const handleGitHubConnect = () => {
    // Implement GitHub OAuth flow here
    console.log("Connecting to GitHub...")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Image Section */}
      <div className="items-center justify-center hidden p-12 lg:flex lg:w-1/2 bg-muted">
        <Image
          src="/placeholder.svg?height=400&width=400"
          alt="GitHub Integration Illustration"
          width={400}
          height={400}
          className="object-contain max-w-md"
        />
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center w-full p-8 lg:w-1/2">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-3xl font-bold">
              <Github className="w-8 h-8" />
              <span>Connect to GitHub</span>
            </CardTitle>
            <CardDescription className="mt-2 text-lg">
              Thorbis will use GitHub to manage your site&apos;s blueprints and components.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full h-12 mt-4 mb-6 text-lg"
              onClick={handleGitHubConnect}
            >
              <Github className="w-5 h-5 mr-2" /> Connect with GitHub
            </Button>

            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold">Why use GitHub for Thorbis?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FileCode className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-primary" />
                  <span>
                    <strong>Version Control:</strong> GitHub allows you to track changes to your website&apos;s blueprints and components over time, making it easy to revert to previous versions if needed.
                  </span>
                </li>
                <li className="flex items-start">
                  <GitBranch className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-primary" />
                  <span>
                    <strong>Branching and Experimentation:</strong> Create separate branches to experiment with new features or designs without affecting your live site.
                  </span>
                </li>
                <li className="flex items-start">
                  <Users className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-primary" />
                  <span>
                    <strong>Collaboration:</strong> Easily collaborate with team members or developers by sharing your repository and managing contributions through pull requests.
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}