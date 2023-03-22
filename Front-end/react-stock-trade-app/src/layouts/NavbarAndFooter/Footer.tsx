import React from "react"
import { Link } from "react-router-dom"
import "./Footer.css"

export const Footer=() => {
    return(
        <div className="main-color">
            <footer className="container d-flex flex-wrap justify-content-between align-items-center py-5 main-color">
                <p className="col-md-4 mb-0 text-white">Stock Trading App INC</p>
                <ul className="nav navbar-dark col-md-4 justify-content-end">
                    <li className="nav-item">
                        <a href='/home' className="nav-link px-2 text-white">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link to='/stocks' className="nav-link px-2 text-white">
                            Stocks
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    )
}