import React from "react"
import {NavLink} from 'react-router-dom'

function NavBar() {

    return (

        <nav className = "navbar navbar-expand-lg navbar-light bg-light" >

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav mr-auto">
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


