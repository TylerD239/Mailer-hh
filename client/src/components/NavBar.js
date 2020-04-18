import React from "react"
import {NavLink} from 'react-router-dom'
import logo from '../mail.svg'

function NavBar() {

    return (

        <nav className = "navbar navbar-expand-lg navbar-light bg-light sticky-top" >

                <div className="navbar">
                    <NavLink className="navbar-brand" to="/mail">
                        <img src={logo} width="30" height="30"
                             className="d-inline-block align-top mr-1" alt=""
                        />
                        SchoolMailer <small>2.0.1</small>
                    </NavLink>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/mail">Отправка писем</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/edit">Редактирование</NavLink>
                        </li>

                    </ul>

                </div>
        </nav>
    )
}

export default NavBar


