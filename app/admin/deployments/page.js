"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Globe, ExternalLink, Clock, GitBranch, History, AlertTriangle } from "lucide-react"

export default function AdminDeploymentPage() {
  const [deploymentStatus, setDeploymentStatus] = useState({ status: 'pending_changes', message: 'You have changes that need to be deployed' })
  const [lastDeployment, setLastDeployment] = useState(null)
  const [siteUrl, setSiteUrl] = useState("https://your-site.thorbis.com")
  const [currentBranch, setCurrentBranch] = useState("main")
  const [deploymentHistory, setDeploymentHistory] = useState([])

  useEffect(() => {
    fetchDeploymentData()
    fetchDeploymentHistory()
  }, [])

  const fetchDeploymentData = async () => {
    try {
      // Simulating API call to get deployment data
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLastDeployment(new Date(Date.now() - 86400000).toLocaleString()) // 24 hours ago
    } catch (error) {
      console.error('Error fetching deployment data:', error)
    }
  }

  const fetchDeploymentHistory = async () => {
    try {
      // Simulating API call to get deployment history
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDeploymentHistory([
        { id: '1', date: '2023-06-07 14:30', status: 'success', branch: 'main', commit: 'abc1234' },
        { id: '2', date: '2023-06-06 10:15', status: 'success', branch: 'main', commit: 'def5678' },
        { id: '3', date: '2023-06-05 16:45', status: 'error', branch: 'feature/new-layout', commit: 'ghi9012' },
      ])
    } catch (error) {
      console.error('Error fetching deployment history:', error)
    }
  }

  return (
    <div className="container p-4 mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Deployments</h1>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold">Production Deployment</CardTitle>
            <Badge variant={deploymentStatus.status === 'live' ? 'default' : 'secondary'}>
              {deploymentStatus.status === 'live' ? 'Live' : 'Changes Pending'}
            </Badge>
          </div>
          <CardDescription>{siteUrl}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4" />
                <span className="text-sm font-medium">{currentBranch}</span>
              </div>
              <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-600 hover:underline">
                Visit Site <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Last deployed on {lastDeployment || 'N/A'}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {deploymentStatus.status === 'pending_changes' && (
            <Alert>
              <AlertTriangle className="w-4 h-4" />
              <AlertTitle>Changes Pending</AlertTitle>
              <AlertDescription>
                {deploymentStatus.message}
              </AlertDescription>
            </Alert>
          )}
          {deploymentStatus.status === 'live' && (
            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertTitle>Live</AlertTitle>
              <AlertDescription>
                Your site is live and up to date.
              </AlertDescription>
            </Alert>
          )}
          {deploymentStatus.status === 'error' && (
            <Alert variant="destructive">
              <XCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error with your last deployment. Please check the logs and try again.
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
            <History className="w-6 h-6" />
            Deployment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Commit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deploymentHistory.map((deployment) => (
                <TableRow key={deployment.id}>
                  <TableCell>{deployment.date}</TableCell>
                  <TableCell>
                    <Badge variant={deployment.status === 'success' ? 'default' : 'destructive'}>
                      {deployment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{deployment.branch}</TableCell>
                  <TableCell>{deployment.commit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}