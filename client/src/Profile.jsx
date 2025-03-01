import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'

function Profile() {

    const [company, setCompany] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        findCompanyByEmail();
    }, []);

    const findCompanyByEmail = () => {
            fetch('http://localhost:5000/company', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email: Cookies.get('email') })
            })
            .then(async response => {
                if(response.ok){
                    const data = await response.json()
                    setCompany(data.company.company || '');
                    setEmail(data.company.email || '');
                    setAddress(data.company.address || '');
                    setPhone(data.company.phone || '');
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

    return (
        <>
            <div className="bg-light" style={{marginTop: "80px"}}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="profile-header position-relative mb-4">
                                <div className="position-absolute top-0 end-0 p-3">
                                    <button className="btn btn-light"><i className="fas fa-edit me-2"></i>Edit Cover</button>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="position-relative d-inline-block">
                                    <img src="../assets/zir.png" className="rounded-circle profile-pic" alt="Profile" />
                                    <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                                        <i className="fas fa-camera"></i>
                                    </button>
                                </div>
                                <h3 className="mt-3 mb-1">{company}</h3>
                                <p className="text-muted mb-3">Senior Product Designer</p>
                                <div className="d-flex justify-content-center gap-2 mb-4">
                                    <button className="btn btn-outline-primary"><i className="fas fa-envelope me-2"></i>Message</button>
                                    <button className="btn btn-primary"><i className="fas fa-user-plus me-2"></i>Connect</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-3 border-end">
                                            <div className="p-4">
                                                <div className="nav flex-column nav-pills">
                                                    <a className="nav-link active" href="#"><i className="fas fa-user me-2"></i>Personal Info</a>
                                                    <a className="nav-link" href="#"><i className="fas fa-lock me-2"></i>Security</a>
                                                    <a className="nav-link" href="#"><i className="fas fa-bell me-2"></i>Notifications</a>
                                                    <a className="nav-link" href="#"><i className="fas fa-credit-card me-2"></i>Billing</a>
                                                    <a className="nav-link" href="#"><i className="fas fa-chart-line me-2"></i>Activity</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-9">
                                            <div className="p-4">
                                                <div className="mb-4">
                                                    <h5 className="mb-4">Personal Information</h5>
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <label className="form-label">First Name</label>
                                                            <input type="text" className="form-control" value="Alex" readOnly />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Last Name</label>
                                                            <input type="text" className="form-control" value="Johnson" readOnly />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Email</label>
                                                            <input type="email" className="form-control" value="alex.johnson@example.com" readOnly />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Phone</label>
                                                            <input type="tel" className="form-control" value="+1 (555) 123-4567" readOnly />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label">Bio</label>
                                                            <textarea className="form-control" rows="4" readOnly>Product designer with 5+ years of experience in creating user-centered digital solutions.</textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;