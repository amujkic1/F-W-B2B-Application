import { Button } from '@/components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx'
import { useHelloQuery } from '@/hooks/useHelloQuery.js'

export function HomePage() {
  const { data, isLoading } = useHelloQuery()

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Hello World</CardTitle>
            <CardDescription>Vite + React + shadcn/ui + TanStack Query</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Loading...' : data}
            </p>
          </CardContent>
          <CardFooter>
            <Button>shadcn Button</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
