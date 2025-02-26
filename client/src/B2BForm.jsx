import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie'

function B2BForm() {

    const [startDate, setStartDate] = useState(new Date());
    const [companies, setCompanies] = useState([]);
    const [timeDate, setTimeDate] = useState('')
    const [companyA, setCompanyA] = useState('')
    const [companyB, setCompanyB] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const handleSchedule = (e) => {
        e.preventDefault(); 
        setCompanyA(Cookies.get('company'))

        const selectedCompanyB = companies.find(company => company.id === companyB);
        const companyBName = selectedCompanyB ? selectedCompanyB.company : '';

        fetch('http://localhost:5000/schedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ timeDate, companyA, companyB: companyBName })
        })
        .then(async response => {
            if (response.ok) {
                const { message } = await response.json()
                console.log(message)
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .catch(err => {
            console.error('Greška prilikom zakazivanja sastanka: ', err)
            setErrorMessage('Greška prilikom zakazivanja sastanka.');
        })
    }

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://localhost:5000/companies', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const { companies } = await response.json();
                    console.log('kompanije ', companies)
                    setCompanies(companies); 
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }
            } catch (err) {
                console.error('Greška prilikom dohvatanja kompanija:', err);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-sm-8 col-md-8 col-lg-5">
                        <div className="card shadow-lg card-registration" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Zakažite sastanak</h3>
                                <form onSubmit={handleSchedule}>
                                    <div className="row">
                                    <div className="col12 mb-2">
                                        <div className="input-group">
                                            <select 
                                                className="form-control form-control-md border-primary shadow-sm" 
                                                value={companyB} 
                                                onChange={(e) => setCompanyB(e.target.value)}>
                                                <option value="" disabled selected>Izaberite kompaniju</option>
                                                {companies.map((company, index) => (
                                                    <option key={index} value={company.id}>{company.company}</option>
                                                ))}
                                            </select>
                                            <span className="input-group-text">
                                                <i className="bi bi-caret-down"></i>
                                            </span>
                                        </div>
                                        <label className="form-label select-label">Izaberite kompaniju</label>
                                    </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12 mb-3">
                                        <div className="input-group">
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        setTimeDate(date);
                                                    }}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={30}
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    minTime={new Date(new Date().setHours(9, 0, 0))} 
                                                    maxTime={new Date(new Date().setHours(16, 30, 0))} 
                                                    className="form-control rounded shadow-sm border-primary"
                                                    withPortal
                                                />
                                                <span className="input-group-text">
                                                    <i className="bi bi-calendar"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-2">
                                        <input className="btn btn-primary btn-md w-100" type="submit" value="Zakaži" />
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

export default B2BForm;