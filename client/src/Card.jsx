function CardContainer() {

    const cards = Array(8).fill({
        title: "Card title",
        text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        imgSrc: "../assets/img/skills.png",
    });

    return (
        <>
        <div class="section-title" style={{marginTop: "130px"}}>
            <h2>Baza kompanija</h2>
        </div>

        <div style={{
            display: "flex",
            flexWrap: "wrap",  
            gap: "20px",
            justifyContent: "center", 
            padding: "20px",
            marginTop: "20px"
        }}>
            {cards.map((card, index) => (
                <div key={index} className="card" style={{ width: "20rem", marginTop: "20px" }}>
                    <img src={card.imgSrc} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.text}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            ))}
        </div>

        </>
    );
}

export default CardContainer;