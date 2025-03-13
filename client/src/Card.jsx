import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";

function CardContainer() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await fetch("http://localhost:5000/companies", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            // Obrada slika iz Firebase Storage-a
            const updatedCompanies = await Promise.all(
                data.companies.map(async (company) => {
                    if (company.image) {
                        try {
                            const imageUrl = await getDownloadURL(ref(storage, company.image));
                            return { ...company, imageUrl };
                        } catch (error) {
                            console.error("Greška pri dohvaćanju slike: ", error);
                            return { ...company, imageUrl: "../assets/img/skills.png" };
                        }
                    }
                    return { ...company, imageUrl: "../assets/img/skills.png" };
                })
            );

            setCompanies(updatedCompanies);
        } catch (err) {
            console.error("Greška prilikom dohvatanja kompanija: ", err);
        }
    };

    return (
        <>
            <div className="section-title" style={{ marginTop: "130px" }}>
                <h2>Baza kompanija</h2>
            </div>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                    padding: "20px",
                    marginTop: "20px"
                }}
            >
                {companies.map((company, index) => (
                    <div key={index} className="card company-card" style={{ width: "20rem", marginTop: "20px" }}>
                        <img src={company.imageUrl} className="card-img-top" alt={company.name} />
                        <div className="card-body">
                            <h5 className="card-title">{company.company}</h5>
                            {company.officialEmail && (
                                <p className="card-text">
                                    <i className="bi bi-envelope-fill"></i> {company.officialEmail}
                                </p>
                            )}

                            {company.phone && (
                                <p className="card-text">
                                    <i className="bi bi-telephone-fill"></i> {company.phone}
                                </p>
                            )}
                            <a href={company.website || "#"} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                Posjeti
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CardContainer;
