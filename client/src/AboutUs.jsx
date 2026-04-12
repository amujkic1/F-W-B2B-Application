import { CheckCircle2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

function AboutUs() {
    const highlights = [
        'Mjesto susreta vodećih kompanija i investitora',
        'Fokus na inovacije, održivost i digitalizaciju',
        'Sajam, B2B sastanci, konferencije i radionice',
    ]

    return (
        <section id='about' className='py-16 sm:py-20'>
            <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8' data-aos='fade-up'>
                <div className='mb-8 sm:mb-10'>
                    <p className='mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>O nama</p>
                    <h2 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
                        Zašto posjetiti Sarajevo BAU 2025?
                    </h2>
                </div>

                <div className='grid gap-6 lg:grid-cols-2'>
                    <Card className='border-slate-200 bg-white'>
                        <CardHeader>
                            <CardTitle>Ključne prednosti</CardTitle>
                            <CardDescription>
                                Događaj koji povezuje biznis, inovacije i stručnjake na jednom mjestu.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className='space-y-3'>
                                {highlights.map(item => (
                                    <li key={item} className='flex items-start gap-3 text-slate-700'>
                                        <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-emerald-600' />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className='border-slate-200 bg-white'>
                        <CardHeader>
                            <CardTitle>Sarajevo BAU 2025</CardTitle>
                            <CardDescription>
                                Međunarodni sajam posvećen gradnji, opremanju i inovacijama.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-5'>
                            <p className='text-slate-700'>
                                Sarajevo BAU 2025 je međunarodni sajam posvećen gradnji, opremanju i inovacijama.
                                Okupljamo stručnjake, kompanije i investitore s ciljem unapređenja privrede kroz
                                poslovno povezivanje, promociju inovativnih rješenja i edukativne sadržaje.
                            </p>

                            <Button asChild>
                                <a href='/contact' className='no-underline'>Saznaj više</a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default AboutUs