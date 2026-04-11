import React, {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { storage } from './firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

function Registration() {

    const [company, setCompany] = useState('')
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [officialEmail, setOfficialEmail] = useState('')
    const [registrationEmail, setRegistrationEmail] = useState('')
    const [password, setPassword] = useState('') 
    const navigate = useNavigate('')
    const [errorMessage, setErrorMessage] = useState('');
    const [imageUpload, setImageUpload] = useState(null)
    const [imageUrl, setImageUrl] = useState('')

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
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const handleRegistration = async () => {
        if (!isValidEmail(officialEmail)) {
            console.log('not a valid email address');
            setErrorMessage('Please enter a valid email address.');
            return;
        }
    
        let uploadedImageUrl = ''; 
    
        if (imageUpload) {
            try {
                const imageRef = ref(storage, `b2b/${imageUpload.name + v4()}`);
                await uploadBytes(imageRef, imageUpload);
                uploadedImageUrl = imageRef.fullPath; 
                console.log('Image uploaded:', uploadedImageUrl);
            } catch (error) {
                console.error('Image upload failed:', error);
                setErrorMessage('Image upload failed. Try again.');
                return; 
            }
        }
    
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ company, id, name, address, phone, officialEmail, registrationEmail, password, imageUrl: uploadedImageUrl })
        })
        .then(async response => {
            if (response.ok) {
                const { message } = await response.json();
                Cookies.set('email', registrationEmail);
                navigate('/');
                setErrorMessage('');
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .catch(err => {
            console.error('Greška prilikom registracije: ', err);
            setErrorMessage('Failed to register. Please try again.');
        });
    };
    

    return (
        <>
            <section
                className="vh-100 d-flex align-items-center position-relative overflow-hidden"
                style={{
                    background:
                        "radial-gradient(circle at top left, rgba(13, 110, 253, 0.18), transparent 32%), radial-gradient(circle at bottom right, rgba(32, 201, 151, 0.16), transparent 28%), linear-gradient(180deg, #f8fafc 0%, #eef3f9 100%)",
                }}
            >
                <div
                    className="position-absolute top-0 end-0 translate-middle-y rounded-circle"
                    style={{
                        width: "22rem",
                        height: "22rem",
                        background: "rgba(13, 110, 253, 0.08)",
                        filter: "blur(18px)",
                    }}
                />
                <div
                    className="position-absolute bottom-0 start-0 translate-middle-y rounded-circle"
                    style={{
                        width: "18rem",
                        height: "18rem",
                        background: "rgba(25, 135, 84, 0.08)",
                        filter: "blur(18px)",
                    }}
                />

                <div className="container position-relative">
                    <div className="row justify-content-center align-items-stretch g-0">
                        <div className="col-12 col-lg-5 d-none d-lg-flex">
                            <div
                                className="w-100 h-100 text-white p-5 rounded-start-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0d6efd 0%, #084298 45%, #031633 100%)",
                                    boxShadow: "0 1.5rem 4rem rgba(13, 110, 253, 0.22)",
                                }}
                            >
                                <div className="d-flex flex-column justify-content-between h-100">
                                    <div>
                                        <span className="badge bg-light text-primary rounded-pill px-3 py-2 mb-4">
                                            Business Registration
                                        </span>
                                        <h1 className="display-6 fw-semibold mb-3">
                                            Register your company
                                        </h1>
                                        <p className="text-white-50 mb-0">
                                            Create a business account to access meetings, collaboration tools, and company management features.
                                        </p>
                                    </div>

                                    <div className="mt-5 pt-4 border-top border-white border-opacity-25">
                                        <div className="row g-3 text-white-50">
                                            <div className="col-6">
                                                <div className="fw-semibold text-white">Fast Setup</div>
                                                Quick registration process
                                            </div>
                                            <div className="col-6">
                                                <div className="fw-semibold text-white">Verified</div>
                                                Professional verification
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5">
                            <div
                                className="bg-white h-100 p-3 p-md-4 rounded-4 rounded-lg-end-4 shadow-lg border border-light overflow-y-auto"
                                style={{ boxShadow: "0 1.5rem 4rem rgba(15, 23, 42, 0.12)", maxHeight: "100vh" }}
                            >
                                <div className="mb-3">
                                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-2">
                                        Create Account
                                    </span>
                                    <h2 className="h5 fw-bold mb-2 text-dark">Registracija kompanije</h2>
                                    <p className="text-muted mb-0 small">
                                        Unesite podatke vaše kompanije da biste kreirali poslovni račun.
                                    </p>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); handleRegistration(); }}>
                                    <div className="row g-2">
                                        <div className="col-md-6">
                                            <label htmlFor="company" className="form-label small fw-semibold text-secondary">
                                                Naziv kompanije
                                            </label>
                                            <input
                                                type="text"
                                                id="company"
                                                className="form-control border-0 shadow-sm"
                                                style={{ backgroundColor: "#f8fafc" }}
                                                placeholder="Naziv kompanije"
                                                value={company}
                                                onChange={e => setCompany(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="id" className="form-label small fw-semibold text-secondary">
                                                ID broj
                                            </label>
                                            <input
                                                type="text"
                                                id="id"
                                                className="form-control border-0 shadow-sm"
                                                style={{ backgroundColor: "#f8fafc" }}
                                                placeholder="ID broj"
                                                value={id}
                                                onChange={e => setID(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="name" className="form-label small fw-semibold text-secondary">
                                                Ime i prezime ovlaštenog lica
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="form-control border-0 shadow-sm"
                                                style={{ backgroundColor: "#f8fafc" }}
                                                placeholder="Ime i prezime"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="address" className="form-label small fw-semibold text-secondary">
                                                Adresa
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="form-control border-0 shadow-sm"
                                                style={{ backgroundColor: "#f8fafc" }}
                                                placeholder="Adresa kompanije"
                                                value={address}
                                                onChange={e => setAddress(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="phone" className="form-label small fw-semibold text-secondary">
                                                Službeni broj telefona
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                className="form-control border-0 shadow-sm"
                                                style={{ backgroundColor: "#f8fafc" }}
                                                placeholder="+385 1 234 5678"
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="officialEmail" className="form-label small fw-semibold text-secondary">
                                                Službeni email
                                            </label>
                                            <input
                                                type="email"
                                                id="officialEmail"
                                                className="form-control border-0 shadow-sm"
                                                style={{ backgroundColor: "#f8fafc" }}
                                                placeholder="info@kompanija.com"
                                                value={officialEmail}
                                                onChange={e => setOfficialEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="registrationEmail" className="form-label small fw-semibold text-secondary">
                                                Email za prijavu
                                            </label>
                                            <input
                                                type="email"
                                                id="registrationEmail"
                                                className="form-control border-0 shadow-sm"
                                                style={{ backgroundColor: "#f8fafc" }}
                                                placeholder="vasa@kompanija.com"
                                                value={registrationEmail}
                                                onChange={e => setRegistrationEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="password" className="form-label small fw-semibold text-secondary">
                                                Lozinka
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control border-0 shadow-sm"
                                                style={{ backgroundColor: "#f8fafc" }}
                                                placeholder="Unesite lozinku"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="logoUpload" className="form-label small fw-semibold text-secondary">
                                                Logo kompanije (opciono)
                                            </label>
                                            <input
                                                type="file"
                                                id="logoUpload"
                                                className="form-control border-0 shadow-sm"
                                                style={{ backgroundColor: "#f8fafc" }}
                                                onChange={(event) => setImageUpload(event.target.files[0])}
                                            />
                                        </div>
                                    </div>

                                    {errorMessage && (
                                        <div className="alert alert-danger py-2 small mb-2 mt-2" role="alert">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="d-grid gap-2 mt-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-sm fw-semibold shadow-sm"
                                            style={{ background: "linear-gradient(135deg, #0d6efd 0%, #084298 100%)", border: "none" }}
                                        >
                                            Kreiraj račun
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-3 pt-2 border-top">
                                    <p className="mb-0 text-muted small">
                                        Već imate račun? <a href="/login" className="fw-semibold text-primary text-decoration-none">Prijavite se</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Registration;