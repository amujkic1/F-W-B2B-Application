import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, buttonVariants } from '@/components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    if (!email.trim() || !password.trim()) {
      setMessage('Unesi email i password.')
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setMessage(
        `Prijava uspješna za ${email}${rememberMe ? ' (remember me uključen)' : ''}.`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--foreground)/0.08),_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.3))]" />
      <Card className="relative z-10 w-full max-w-md backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Prijava</CardTitle>
          <CardDescription>
            Prijavi se na svoj B2B račun da nastaviš.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="ime@firma.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="size-4 rounded border-input text-primary focus:ring-ring"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Zapamti me
            </label>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Prijava u toku...' : 'Prijavi se'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2">
          <p className="text-sm text-muted-foreground">{message || ' '}</p>
          <p className="text-sm text-muted-foreground">
            Nemaš račun?{' '}
            <Link to="/register" className={buttonVariants({ variant: 'link', className: 'h-auto p-0' })}>
              Registruj se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}