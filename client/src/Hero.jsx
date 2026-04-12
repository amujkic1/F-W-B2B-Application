function Hero() {
    return (
        <section id='hero' className='relative overflow-hidden bg-gradient-to-b from-slate-100 to-white pt-28 sm:pt-32'>
            <div className='mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8'>
                <div className='flex max-w-3xl flex-col justify-center gap-5 text-left' data-aos='fade-up' data-aos-delay='200'>
                    <h1 className='text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl'>Sarajevo BAU</h1>
                    <h2 className='text-lg text-slate-600 sm:text-xl'>
                        Internacionalni sajam opremanja, gradnje i uređenja
                    </h2>

                    <div className='flex flex-wrap items-center justify-start gap-3'>
                        <a
                            href='/login'
                            className='rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-blue-800'
                        >
                            Prijavi se
                        </a>
                        <a
                            href='/register'
                            className='rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 no-underline transition hover:border-slate-400 hover:bg-slate-50'
                        >
                            Postani izlagač
                        </a>
                        <a
                            href='https://www.youtube.com/watch?v=jDDaplaOz7Q'
                            className='inline-flex items-center gap-2 text-sm font-medium text-slate-700 no-underline transition hover:text-slate-900'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <span className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300'>
                                ▶
                            </span>
                            <span>Pogledaj video</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero