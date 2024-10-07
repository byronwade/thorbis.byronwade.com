import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Check } from 'lucide-react'

const databaseOptions = [
  {
    name: 'supabase',
    displayName: 'Supabase',
    description: 'PostgreSQL-based, easy to use, with generous free tier options.',
    oauthSupport: true,
    recommended: true,
    plans: {
      free: {
        name: 'Free',
        price: '$0/month',
        features: ['500MB Database', '1GB File Storage', 'Up to 50,000 Auth Users']
      },
      pro: {
        name: 'Pro',
        price: '$25/month',
        features: ['8GB Database', '100GB File Storage', 'Unlimited Auth Users']
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Unlimited Database', 'Unlimited File Storage', 'Custom Support']
      }
    }
  },
  {
    name: 'planetscale',
    displayName: 'PlanetScale',
    description: 'MySQL serverless database designed for scalability and branching.',
    oauthSupport: false,
    plans: {
      free: {
        name: 'Free',
        price: '$0/month',
        features: ['1 Database', '5GB Storage', '1 Billion Rows Read/Month']
      },
      pro: {
        name: 'Scaler',
        price: '$29/month',
        features: ['3 Databases', '50GB Storage', '10 Billion Rows Read/Month']
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Unlimited Databases', 'Custom Storage', 'Dedicated Support']
      }
    }
  },
  {
    name: 'mongodb',
    displayName: 'MongoDB Atlas',
    description: 'NoSQL database with a flexible document model and global distribution.',
    oauthSupport: false,
    plans: {
      free: {
        name: 'Free',
        price: '$0/month',
        features: ['512MB Storage', 'Shared Clusters', 'Community Support']
      },
      pro: {
        name: 'Dedicated',
        price: 'Starting at $57/month',
        features: ['Dedicated Clusters', 'Backup', 'Performance Advisor']
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Advanced Security', 'On-Prem Deployment', 'Dedicated Support']
      }
    }
  },
  {
    name: 'cockroachdb',
    displayName: 'CockroachDB',
    description: 'Distributed SQL database for cloud-native applications.',
    oauthSupport: false,
    plans: {
      free: {
        name: 'Serverless',
        price: '$0/month',
        features: ['5GB Storage', '50M Request Units/month', 'Automatic Scaling']
      },
      pro: {
        name: 'Dedicated',
        price: 'Starting at $299/month',
        features: ['Dedicated Cluster', 'High Availability', 'Advanced Security']
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Custom Deployment', 'Enterprise Support', 'Advanced Features']
      }
    }
  },
  {
    name: 'neon',
    displayName: 'Neon',
    description: 'Serverless Postgres with a generous free tier.',
    oauthSupport: true,
    plans: {
      free: {
        name: 'Free',
        price: '$0/month',
        features: ['3GB Storage', '100 Hours Compute/month', 'Unlimited Projects']
      },
      pro: {
        name: 'Pro',
        price: 'Starting at $10/month',
        features: ['Pay per use', 'Autoscaling', 'Priority Support']
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Custom Limits', 'SLA', 'Dedicated Support']
      }
    }
  }
]

export default function DatabaseSelection() {
  const [selectedDatabase, setSelectedDatabase] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState('free')

  return (
    <div className="container max-w-5xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Select Your Database</h1>
      <p className="mb-8 text-center text-muted-foreground">
        Choose the database to store your content and settings. We recommend Supabase for easy setup.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {databaseOptions.map((db) => (
          <Card
            key={db.name}
            className={`cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md ${
              selectedDatabase === db.name ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedDatabase(db.name)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                    {db.displayName[0]}
                  </div>
                  <span>{db.displayName}</span>
                </div>
              </CardTitle>
              <div className="flex items-center space-x-2">
                {db.recommended && (
                  <Badge variant="secondary">Recommended</Badge>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Info className="w-4 h-4" />
                        <span className="sr-only">Database info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>OAuth Support: {db.oauthSupport ? 'Yes' : 'No'}</p>
                      <p>{db.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="free" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="free">Free</TabsTrigger>
                  <TabsTrigger value="pro">Pro</TabsTrigger>
                  <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                </TabsList>
                {Object.entries(db.plans).map(([planKey, plan]) => (
                  <TabsContent key={planKey} value={planKey}>
                    <div className="pt-2">
                      <h3 className="font-semibold">{plan.name}</h3>
                      <p className="text-2xl font-bold">{plan.price}</p>
                      <ul className="mt-2 space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        className="w-full max-w-md mx-auto mt-8"
        disabled={!selectedDatabase}
      >
        Continue with {selectedDatabase ? databaseOptions.find(db => db.name === selectedDatabase)?.displayName : 'selected database'}
      </Button>
    </div>
  )
}