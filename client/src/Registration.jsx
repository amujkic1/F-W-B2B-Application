import React, {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

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

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const handleRegistration = () => {
        if (!isValidEmail(officialEmail)) {
            console.log('not a valid email address')
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ company, id, name, address, phone, officialEmail, registrationEmail, password })
        })
        .then(async response => {
            if(response.ok){
                const { message } = await response.json()
                Cookies.set('email', registrationEmail)
                navigate('/')
                setErrorMessage('')
            }else{
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .catch(err => {
            console.error('Greška prilikom registracije: ', err)
            setErrorMessage('Failed to login. Please try again.');
        })
    } 

    return (
        <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row justify-content-center align-items-center h-100">
            <div class="col-12 col-sm-9 col-xl-7">
                <div class="card shadow-2-strong card-registration" style={{borderRadius: "15px"}}>
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Registracija kompanije</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleRegistration(); }}>

                    <div class="row">
                        <div class="col-md-6 mb-4">

                        <div data-mdb-input-init class="form-outline">
                            <input type="text" id="firstName" class="form-control form-control-sm" value={company} onChange={e => setCompany(e.target.value)} />
                            <label class="form-label" for="firstName">Naziv kompanije</label>
                        </div>

                        </div>
                        <div class="col-md-6 mb-4">

                        <div data-mdb-input-init class="form-outline">
                            <input type="text" id="lastName" class="form-control form-control-sm" value={id} onChange={e => setID(e.target.value)} />
                            <label class="form-label" for="lastName">ID broj</label>
                        </div>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-4">

                        <div data-mdb-input-init class="form-outline">
                            <input type="text" id="firstName" class="form-control form-control-sm" value={name} onChange={e => setName(e.target.value)}/>
                            <label class="form-label" for="firstName">Ime i prezime ovlaštenog lica</label>
                        </div>

                        </div>
                        <div class="col-md-6 mb-4">

                        <div data-mdb-input-init class="form-outline">
                            <input type="text" id="lastName" class="form-control form-control-sm" value={address} onChange={e => setAddress(e.target.value)}/>
                            <label class="form-label" for="lastName">Adresa</label>
                        </div>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-4 d-flex align-items-center">

                        <div data-mdb-input-init class="form-outline datepicker w-100">
                            <input type="text" class="form-control form-control-sm" id="birthdayDate" value={phone} onChange={e => setPhone(e.target.value)}/>
                            <label for="birthdayDate" class="form-label">Službeni broj telefona</label>
                        </div>

                        </div>
 
                        <div class="col-md-6 mb-4 d-flex align-items-center">

                        <div data-mdb-input-init class="form-outline datepicker w-100">
                            <input type="text" class="form-control form-control-sm" id="birthdayDate" value={officialEmail} onChange={e => setOfficialEmail(e.target.value)}/>
                            <label for="birthdayDate" class="form-label">Službeni email</label>
                        </div>

                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-4 pb-2">

                        <div data-mdb-input-init class="form-outline">
                            <input type="email" id="emailAddress" class="form-control form-control-sm" value={registrationEmail} onChange={e => setRegistrationEmail(e.target.value)}/>
                            <label class="form-label" for="emailAddress">Email za prijavu</label>
                        </div>

                        </div>
                        <div class="col-md-6 mb-4 pb-2">

                        <div data-mdb-input-init class="form-outline">
                            <input type="tel" id="phoneNumber" class="form-control form-control-sm" value={password} onChange={e => setPassword(e.target.value)}/>
                            <label class="form-label" for="phoneNumber">Lozinka</label>
                        </div>

                        </div>
                    </div>

                    <div class="mt-4 pt-2">
                        <input data-mdb-ripple-init class="btn btn-primary btn-sm" type="submit" value="Kreiraj račun"/>
                    </div>

                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}

export default Registration;