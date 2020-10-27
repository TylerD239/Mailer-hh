import React, {useContext, useState} from "react"
import {AuthContext} from "../context/AuthContext";

export const Auth = () => {
    const [text, setText] = useState('')
    const {login} = useContext(AuthContext)


    const changeHandler = e => {
        setText(e.target.value)
    }
    return (

        <div className="container">
            <div className="row justify-content-md-center mt-5">
                <div className="form-inline">
                    <div className="form-group">
                        <input
                            // onKeyPress={(e)=>{if(e.key === 'Enter') login(text)}}
                            onKeyPress={e => e.key === 'Enter' && login(text)}
                            type="password"
                            id="inputPassword"
                            className="form-control mx-sm-3"
                            name="password"
                            aria-describedby="passwordHelpInline"
                            placeholder="Введите пароль"
                            onChange={changeHandler} />
                            <button  onClick={() => login(text)} className="btn btn-outline-success">Войти</button>
                    </div>
                </div>
            </div>
        </div>





    )
}