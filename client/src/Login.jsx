import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import { Alert, AlertDescription } from './components/ui/alert'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = () => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        })
        .then(async response => {
            if (response.ok) {
                const { token } = await response.json()
                Cookies.set('email', email)
                Cookies.set('token', token)
                findCompanyByEmail()
                navigate('/')
                window.location.reload()
            } else {
                return response.json().then(data => {
                    throw new Error(data.error)
                })
            }
        })
        .catch(err => {
            console.error('Greška prilikom prijave: ', err)
            setErrorMessage('Greška prilikom prijave. Pokušajte ponovo.')
        })
    }

    const findCompanyByEmail = () => {
        fetch('http://localhost:5000/company', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email }),
        })
        .then(async response => {
            if (response.ok) {
                const { company } = await response.json()
                Cookies.set('company', company.company)
            } else {
                return response.json().then(data => {
                    throw new Error(data.error)
                })
            }
        })
        .catch(err => {
            console.error('Greška prilikom dohvatanja kompanije: ', err)
        })
    }

    return (
        <section className='h-screen overflow-hidden bg-slate-100'>
            <div className='relative mx-auto grid h-screen max-w-7xl items-center gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_500px] lg:px-8'>
                <div className='pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-blue-300/40 blur-3xl' />
                <div className='pointer-events-none absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-emerald-300/40 blur-3xl' />

                <div className='relative hidden rounded-2xl bg-slate-900 p-10 text-white shadow-2xl lg:flex lg:flex-col lg:justify-between'>
                    <div>
                        <p className='mb-4 inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200'>
                            Business Access
                        </p>
                        <h1 className='text-4xl font-semibold leading-tight'>
                            Sign in to your company workspace
                        </h1>
                        <p className='mt-4 max-w-md text-slate-300'>
                            Access your meetings, profile, and company tools from one secure place.
                        </p>
                    </div>

                    <div className='grid grid-cols-2 gap-4 border-t border-white/15 pt-8 text-sm text-slate-300'>
                        <div>
                            <p className='font-semibold text-white'>Secure</p>
                            Protected session handling
                        </div>
                        <div>
                            <p className='font-semibold text-white'>Responsive</p>
                            Optimized for every screen
                        </div>
                    </div>
                </div>

                <Card className='relative border-slate-200 bg-white/95 shadow-2xl backdrop-blur'>
                    <CardHeader className='space-y-2'>
                        <p className='inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700'>
                            Welcome back
                        </p>
                        <CardTitle className='text-3xl'>Prijava</CardTitle>
                        <CardDescription>
                            Prijavite se da nastavite sa svojim nalogom i poslovnim alatima.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className='space-y-4'
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleLogin()
                            }}
                        >
                            <div className='space-y-2'>
                                <Label htmlFor='email'>Email adresa</Label>
                                <Input
                                    type='email'
                                    id='email'
                                    placeholder='ime@kompanija.com'
                                    autoComplete='email'
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='password'>Lozinka</Label>
                                <Input
                                    type='password'
                                    id='password'
                                    placeholder='Unesite lozinku'
                                    autoComplete='current-password'
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {errorMessage && (
                                <Alert variant='destructive'>
                                    <AlertDescription>{errorMessage}</AlertDescription>
                                </Alert>
                            )}

                            <Button type='submit' className='h-11 w-full text-base'>
                                Prijavi se
                            </Button>
                        </form>

                        <p className='mt-6 border-t border-slate-100 pt-4 text-sm text-slate-600'>
                            Nemate račun?{' '}
                            <Link to='/register' className='font-semibold text-blue-700 hover:text-blue-800'>
                                Otvorite novi račun
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default Login