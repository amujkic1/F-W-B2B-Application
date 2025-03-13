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
        <section class="min-height-100 gradient-custom">
            <div class="container py-5 h-100">
                <div class="row justify-content-center align-items-center h-100">
                <div class="col-12 col-sm-9 col-xl-7">
                    <div class="card border border-1 shadow-2-strong card-registration rounded shadow-lg" >
                    <div class="card-body p-4 p-md-5">
                        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Registracija kompanije</h3>
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

                        <input type="file" 
                            onChange={(event) => 
                            {setImageUpload(event.target.files[0])}}/>

                        <div class="row">
                            <div class="mt-4 pt-2">
                                <input data-mdb-ripple-init class="btn btn-primary btn-md w-100" type="submit" value="Kreiraj račun"/>
                            </div>
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