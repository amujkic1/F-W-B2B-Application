function Hero(){

    return(
        <>
          <section id="hero" class="d-flex align-items-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                    <h1>Sarajevo BAU</h1>
                    <h2>Internacionalni sajam opremanja, gradnje i uređenja</h2>
                    <div class="d-flex justify-content-center justify-content-lg-start">
                        <a href="/login" class="btn-get-started scrollto text-decoration-none mx-3">Prijavi se</a>
                        <a href="/register" class="btn-get-started-register scrollto text-decoration-none">Postani izlagač</a>
                        <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" class="glightbox btn-watch-video text-decoration-none"><i class="bi bi-play-circle"></i><span>Pogledaj video</span></a>
                    </div>
                    </div>
                    <div class="col-lg-6 order-1 order-lg-2 hero-img d-none d-lg-block" data-aos="zoom-in" data-aos-delay="200">
                    <img src="assets/banner3.png" className="h-100"  alt=""/>
                    </div>
                </div>
            </div>
            </section>
        </>
    )
}

export default Hero;