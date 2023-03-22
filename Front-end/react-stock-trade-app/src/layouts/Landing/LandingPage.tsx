import React from "react"

export const LandingPage=()=>{
    return(
        <div className="p-5 mb-4 big-dark header">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-3 fw-bold">Time to Invest</h1>
                    <p className="col-md-8 fs-5">What are you buying today?</p>
                    <div>
                    <a type="button" className="btn main-color btn-lg text-white" href='/register'>Join Us</a>
                    </div>
                </div>
            </div>
        </div>
    )
}