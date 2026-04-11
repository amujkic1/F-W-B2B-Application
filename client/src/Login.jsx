import React, {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = () => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({email, password})
        })
        .then(async response => {
            if(response.ok){
                const { token } = await response.json()
                Cookies.set('email', email)
                Cookies.set('token', token)
                findCompanyByEmail()
                navigate('/')
                window.location.reload()
            }else{
                return response.json().then(data => {
                    throw new Error(data.error);
                });
            }
        })
        .catch(err => {
            console.error('Greška prilikom prijave: ', err)
            setErrorMessage('Greška prilikom prijave. Pokušajte ponovo.');
        })
    }

    const findCompanyByEmail = () => {
        fetch('http://localhost:5000/company', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email })
        })
        .then(async response => {
            if(response.ok){
                const { company } = await response.json()
                Cookies.set('company', company.company)
            }else{
                return response.json().then(data => {
                    throw new Error(data.error)
                })
            }
        })
        .catch(err => {
            console.error('Greška prilikom dohvatanja kompanije: ', err)
        })
    }

    return(
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
                                            Business Access
                                        </span>
                                        <h1 className="display-6 fw-semibold mb-3">
                                            Sign in to your company workspace
                                        </h1>
                                        <p className="text-white-50 mb-0">
                                            Access your meetings, profile, and company tools from one secure place.
                                        </p>
                                    </div>

                                    <div className="mt-5 pt-4 border-top border-white border-opacity-25">
                                        <div className="row g-3 text-white-50">
                                            <div className="col-6">
                                                <div className="fw-semibold text-white">Secure</div>
                                                Protected session handling
                                            </div>
                                            <div className="col-6">
                                                <div className="fw-semibold text-white">Responsive</div>
                                                Optimized for every screen
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5">
                            <div
                                className="bg-white h-100 p-4 p-md-5 rounded-4 rounded-lg-end-4 shadow-lg border border-light"
                                style={{ boxShadow: "0 1.5rem 4rem rgba(15, 23, 42, 0.12)" }}
                            >
                                <div className="mb-4">
                                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">
                                        Welcome back
                                    </span>
                                    <h2 className="h3 fw-bold mb-2 text-dark">Prijava</h2>
                                    <p className="text-muted mb-0">
                                        Prijavite se da nastavite sa svojim nalogom i poslovnim alatima.
                                    </p>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                                    <div className="mb-3">
                                        <label htmlFor="form2Example1" className="form-label fw-semibold text-secondary">
                                            Email adresa
                                        </label>
                                        <input
                                            type="email"
                                            id="form2Example1"
                                            className="form-control border-0 shadow-sm"
                                            style={{ backgroundColor: "#f8fafc" }}
                                            placeholder="ime@kompanija.com"
                                            autoComplete="email"
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="form2Example2" className="form-label fw-semibold text-secondary">
                                            Lozinka
                                        </label>
                                        <input
                                            type="password"
                                            id="form2Example2"
                                            className="form-control border-0 shadow-sm"
                                            style={{ backgroundColor: "#f8fafc" }}
                                            placeholder="Unesite lozinku"
                                            autoComplete="current-password"
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {errorMessage && (
                                        <div className="alert alert-danger py-2 small mb-3" role="alert">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="d-grid gap-2 mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg fw-semibold shadow-sm"
                                            style={{ background: "linear-gradient(135deg, #0d6efd 0%, #084298 100%)", border: "none" }}
                                        >
                                            Prijavi se
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-4 pt-3 border-top">
                                    <p className="mb-0 text-muted small">
                                        Nemate račun? <a href="/register" className="fw-semibold text-primary text-decoration-none">Otvorite novi račun</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login