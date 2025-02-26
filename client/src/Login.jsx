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
            <section class="vh-100 gradient-custom mt-5">
                <div class="container-sm py-5 h-100 mt-5">
                    <div class="row justify-content-center">
                        <div class="col-sm-4 border p-4 rounded shadow-lg"> 
                        <h2 class="mb-3 text-center">Prijava</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                                <div data-mdb-input-init class="form-outline mb-4">
                                    <input type="email" id="form2Example1" class="form-control" onChange={e => setEmail(e.target.value)} />
                                    <label class="form-label" for="form2Example1">Email</label>
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <input type="password" id="form2Example2" class="form-control" onChange={e => setPassword(e.target.value)} />
                                    <label class="form-label" for="form2Example2">Lozinka</label>
                                </div>

                                <div class="row mb-4">
                                    <div class="col text-center">
                                        <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block" onClick={handleLogin}>Prijavi se</button>
                                    </div>
                                </div>
                            </form>
                            <p class="mt-3">
                                <small>Nemate račun? <a href="/register" class="text-primary">Otvorite novi račun</a></small>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login