import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { storage } from './firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import { Alert, AlertDescription } from './components/ui/alert'

function Registration() {

    const [company, setCompany] = useState('')
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [officialEmail, setOfficialEmail] = useState('')
    const [registrationEmail, setRegistrationEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [imageUpload, setImageUpload] = useState(null)

/*    const upload = () => {
        if(imageUpload==null) return
        const imageRef = ref(storage, `b2b/${imageUpload.name + v4()}`)
        setImageUrl(imageRef)
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image uploaded")
        })
    }
*/

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleRegistration = async () => {
        if (!isValidEmail(officialEmail)) {
            console.log('not a valid email address')
            setErrorMessage('Please enter a valid email address.')
            return
        }

        let uploadedImageUrl = ''

        if (imageUpload) {
            try {
                const imageRef = ref(storage, `b2b/${imageUpload.name + v4()}`)
                await uploadBytes(imageRef, imageUpload)
                uploadedImageUrl = imageRef.fullPath
                console.log('Image uploaded:', uploadedImageUrl)
            } catch (error) {
                console.error('Image upload failed:', error)
                setErrorMessage('Image upload failed. Try again.')
                return
            }
        }

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                company,
                id,
                name,
                address,
                phone,
                officialEmail,
                registrationEmail,
                password,
                imageUrl: uploadedImageUrl,
            }),
        })
        .then(async response => {
            if (response.ok) {
                await response.json()
                Cookies.set('email', registrationEmail)
                navigate('/')
                setErrorMessage('')
            } else {
                return response.json().then(data => {
                    throw new Error(data.message)
                })
            }
        })
        .catch(err => {
            console.error('Greška prilikom registracije: ', err)
            setErrorMessage('Failed to register. Please try again.')
        })
    }

    return (
        <section className='h-screen overflow-hidden bg-slate-100'>
            <div className='relative mx-auto grid h-screen max-w-7xl items-center gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_560px] lg:px-8'>
                <div className='pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-blue-300/40 blur-3xl' />
                <div className='pointer-events-none absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-emerald-300/40 blur-3xl' />

                <div className='relative hidden rounded-2xl bg-slate-900 p-10 text-white shadow-2xl lg:flex lg:flex-col lg:justify-between'>
                    <div>
                        <p className='mb-4 inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200'>
                            Business Registration
                        </p>
                        <h1 className='text-4xl font-semibold leading-tight'>Register your company</h1>
                        <p className='mt-4 max-w-md text-slate-300'>
                            Create a business account to access meetings, collaboration tools, and company management features.
                        </p>
                    </div>

                    <div className='grid grid-cols-2 gap-4 border-t border-white/15 pt-8 text-sm text-slate-300'>
                        <div>
                            <p className='font-semibold text-white'>Fast Setup</p>
                            Quick registration process
                        </div>
                        <div>
                            <p className='font-semibold text-white'>Verified</p>
                            Professional verification
                        </div>
                    </div>
                </div>

                <Card className='relative border-slate-200 bg-white/95 shadow-2xl backdrop-blur'>
                    <CardHeader className='space-y-2'>
                        <p className='inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700'>
                            Create Account
                        </p>
                        <CardTitle className='text-3xl'>Registracija kompanije</CardTitle>
                        <CardDescription>
                            Unesite podatke vase kompanije da biste kreirali poslovni racun.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            className='grid gap-4 sm:grid-cols-2'
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleRegistration()
                            }}
                        >
                            <div className='space-y-2'>
                                <Label htmlFor='company'>Naziv kompanije</Label>
                                <Input
                                    type='text'
                                    id='company'
                                    placeholder='Naziv kompanije'
                                    value={company}
                                    onChange={e => setCompany(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='id'>ID broj</Label>
                                <Input
                                    type='text'
                                    id='id'
                                    placeholder='ID broj'
                                    value={id}
                                    onChange={e => setID(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='name'>Ime i prezime ovlastenog lica</Label>
                                <Input
                                    type='text'
                                    id='name'
                                    placeholder='Ime i prezime'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='address'>Adresa</Label>
                                <Input
                                    type='text'
                                    id='address'
                                    placeholder='Adresa kompanije'
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='phone'>Sluzbeni broj telefona</Label>
                                <Input
                                    type='text'
                                    id='phone'
                                    placeholder='+385 1 234 5678'
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='officialEmail'>Sluzbeni email</Label>
                                <Input
                                    type='email'
                                    id='officialEmail'
                                    placeholder='info@kompanija.com'
                                    value={officialEmail}
                                    onChange={e => setOfficialEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='registrationEmail'>Email za prijavu</Label>
                                <Input
                                    type='email'
                                    id='registrationEmail'
                                    placeholder='vasa@kompanija.com'
                                    value={registrationEmail}
                                    onChange={e => setRegistrationEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='password'>Lozinka</Label>
                                <Input
                                    type='password'
                                    id='password'
                                    placeholder='Unesite lozinku'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-2 sm:col-span-2'>
                                <Label htmlFor='logoUpload'>Logo kompanije (opciono)</Label>
                                <Input
                                    type='file'
                                    id='logoUpload'
                                    onChange={(event) => setImageUpload(event.target.files[0])}
                                />
                            </div>

                            {errorMessage && (
                                <div className='sm:col-span-2'>
                                    <Alert variant='destructive'>
                                        <AlertDescription>{errorMessage}</AlertDescription>
                                    </Alert>
                                </div>
                            )}

                            <div className='sm:col-span-2'>
                                <Button type='submit' className='h-11 w-full text-base'>
                                    Kreiraj racun
                                </Button>
                            </div>
                        </form>

                        <p className='mt-6 border-t border-slate-100 pt-4 text-sm text-slate-600'>
                            Vec imate racun?{' '}
                            <Link to='/login' className='font-semibold text-blue-700 hover:text-blue-800'>
                                Prijavite se
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default Registration;