import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'

const speakers = [
    {
        name: 'Adis Fejzic',
        role: 'Chief Executive Officer',
        bio: 'Explicabo voluptatem mollitia et repellat qui dolorum quasi',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FAdis.jpg?alt=media&token=139867ca-6082-40da-8641-6adf51c01bb8',
    },
    {
        name: 'Adnan Delic',
        role: 'Product Manager',
        bio: 'Aut maiores voluptates amet et quis praesentium qui senda para',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FAdnan-Deli%C4%87.jpg?alt=media&token=40345083-ccca-401b-bb9d-f2f070a1d6a8',
    },
    {
        name: 'Ahmet Egrlic',
        role: 'CTO',
        bio: 'Quisquam facilis cum velit laborum corrupti fuga rerum quia',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FAhmet-Egrli%C4%87.jpg?alt=media&token=995c5a27-b41c-4d63-8d8e-59ae4a9e03b0',
    },
    {
        name: 'Elma Kovacevic-Bajtal',
        role: 'Accountant',
        bio: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FElme-Kova%C4%8Devi%C4%87-Bajtal-1024x640-1-615x640.png?alt=media&token=f38ebfae-286a-4dbc-abd4-4fab55c131f0',
    },
    {
        name: 'Faruk Ceric',
        role: 'Accountant',
        bio: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FFaruk-Serda-ee.jpg?alt=media&token=faf90ade-9f44-4993-a954-4573be8fa633',
    },
    {
        name: 'Muris Goralija',
        role: 'Accountant',
        bio: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FGoralija-ITA-ee.jpg?alt=media&token=a2246f7c-f5fa-49a0-a46b-88659e94b328',
    },
    {
        name: 'Jasmin Purisevic',
        role: 'Accountant',
        bio: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FJasmin-Puri%C5%A1evi%C4%87.jpg?alt=media&token=efb72b09-eba8-4121-b423-fa8fbc43efe7',
    },
    {
        name: 'Masa Aganovic',
        role: 'Accountant',
        bio: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FMa%C5%A1a.jpg?alt=media&token=1be730f0-c5a9-4a0b-8ad0-d153b76708b0',
    },
    {
        name: 'Mirsad Jasarspahic',
        role: 'Accountant',
        bio: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FMirsad-Ja%C5%A1arspahi%C4%87.jpg?alt=media&token=24da79cb-5350-4215-95c4-4069f77de3c1',
    },
    {
        name: 'Nagib Mujkic',
        role: 'Accountant',
        bio: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FNagib-Mujki%C4%87.jpg?alt=media&token=1c925815-853f-4398-875a-0d94f5b1a2ba',
    },
    {
        name: 'Sanja Mlovcic',
        role: 'Accountant',
        bio: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2FSanja-MIov%C4%8Di%C4%87.jpg?alt=media&token=cc6e7312-f48d-4c22-89e4-c80faca4d800',
    },
    {
        name: 'Anton Jekauc',
        role: 'Accountant',
        bio: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
        image: 'https://firebasestorage.googleapis.com/v0/b/mcms-bb018.appspot.com/o/b2b%2Fgovornici%2Fjekauc-ee.jpg?alt=media&token=05036aa1-f2b1-4b43-aaa1-c28b362073ec',
    },
]

function Team() {
    return (
        <section id='team' className='bg-slate-100/70 pb-16 pt-28'>
            <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8' data-aos='fade-up'>
                <div className='mb-10 text-center'>
                    <p className='mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>Govornici</p>
                    <h2 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>Upoznajte naše govornike</h2>
                    <p className='mx-auto mt-3 max-w-3xl text-slate-600'>
                        Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.
                        Sit sint consectetur velit.
                    </p>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                    {speakers.map((speaker, index) => (
                        <Card
                            key={speaker.name}
                            className='border-slate-200 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                            data-aos='zoom-in'
                            data-aos-delay={(index + 1) * 100}
                        >
                            <CardContent className='p-5'>
                                <div className='flex flex-col gap-4 sm:flex-row'>
                                    <img
                                        src={speaker.image}
                                        alt={speaker.name}
                                        className='h-28 w-28 rounded-full object-cover ring-2 ring-slate-100'
                                    />

                                    <div className='flex-1'>
                                        <CardHeader className='p-0'>
                                            <CardTitle className='text-xl'>{speaker.name}</CardTitle>
                                            <CardDescription className='text-sm font-medium text-blue-700'>{speaker.role}</CardDescription>
                                        </CardHeader>

                                        <p className='mt-3 text-sm text-slate-600'>{speaker.bio}</p>

                                        <div className='mt-4 flex flex-wrap gap-2'>
                                            <Button variant='secondary' size='sm' asChild>
                                                <a href='#' aria-label='Twitter' className='no-underline'>Tw</a>
                                            </Button>
                                            <Button variant='secondary' size='sm' asChild>
                                                <a href='#' aria-label='Facebook' className='no-underline'>Fb</a>
                                            </Button>
                                            <Button variant='secondary' size='sm' asChild>
                                                <a href='#' aria-label='Instagram' className='no-underline'>Ig</a>
                                            </Button>
                                            <Button variant='secondary' size='sm' asChild>
                                                <a href='#' aria-label='LinkedIn' className='no-underline'>In</a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Team