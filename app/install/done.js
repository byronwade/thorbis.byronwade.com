"use client"

import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle } from 'lucide-react'

export default function FinalReviewDeployment() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Trigger confetti effect when component mounts
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

  const handleDeploy = async () => {
    setIsDeploying(true)
    setDeploymentStatus('idle')

    try {
      // Simulating deployment process
      await new Promise(resolve => setTimeout(resolve, 3000))
      setDeploymentStatus('success')
    } catch (error) {
      setDeploymentStatus('error')
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Ready to Go!</CardTitle>
          <CardDescription className="text-center">
            Your site is ready for deployment. Review your settings and click the button below to deploy your website.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Website Details</h3>
            <p><strong>Site Name:</strong> My Awesome Website</p>
            <p><strong>URL:</strong> https://myawesomewebsite.com</p>
            <p><strong>Admin Email:</strong> admin@myawesomewebsite.com</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Selected Features</h3>
            <ul className="list-disc list-inside">
              <li>User Registration Enabled</li>
              <li>Comments Moderation</li>
              <li>Media Library</li>
              <li>SEO Optimization</li>
              <li>Google Analytics Integration</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch space-y-4">
          <Button 
            onClick={handleDeploy} 
            disabled={isDeploying}
            className="w-full py-6 text-lg"
          >
            {isDeploying ? "Deploying..." : "Deploy My Site"}
          </Button>
          {deploymentStatus === 'success' && (
            <Alert variant="default">
              <CheckCircle2 className="w-4 h-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your website has been successfully deployed. You can now access your admin panel to start creating content.
              </AlertDescription>
            </Alert>
          )}
          {deploymentStatus === 'error' && (
            <Alert variant="destructive">
              <AlertTriangle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error deploying your website. Please try again or contact support if the problem persists.
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}