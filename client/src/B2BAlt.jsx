import DatePicker from "react-datepicker";

function B2BAlt(){
    
    return(
        <>
            <section class="vh-100 gradient-custom mt-5">
                <div class="container-sm py-5 h-100 mt-5">
                    <div class="row justify-content-center">
                        <div class="col-sm-4 border p-4 rounded shadow-lg"> 
                        <h2 class="mb-3 text-center">Prijava</h2>
                            <form onSubmit={(e) => { e.preventDefault(); }}>
                                <div className="row">
                                    <div className="col12 mb-2">
                                        <div className="input-group">
                                            <select 
                                                className="form-control form-control-md border-primary shadow-sm">
                                                <option value="" disabled selected>Izaberite kompaniju</option>
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
                                        <DatePicker
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={30}
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            minTime={new Date(new Date().setHours(9, 0, 0))} 
                                            maxTime={new Date(new Date().setHours(16, 30, 0))} 
                                            className="form-control w-100 rounded shadow-sm border-primary"
                                            withPortal
                                        />
                                    </div>
                                    </div>

                                <div class="row mb-4">
                                    <div class="col text-center">
                                        <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block" >Prijavi se</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default B2BAlt