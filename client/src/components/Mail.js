import React, {useContext, useState} from 'react'
import {StudentsContext} from "../context/students/StudentsContext";

export const Mail = () => {

    const [accept, setAccept] = useState(false)
    const [text, setText] = useState('\n\n\n\nС уважением.\nИрина Владимировна')
    const [subject, setSubject] = useState('')

    const {state, clearMarks} = useContext(StudentsContext)

    const postMarks = async () => {
        const response = await fetch('/api/send', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subject, text, marks: state.marks
            })
        })
        const data = await response.json()

        setAccept(false)

        alert(data.message)

        if (response.ok) clearMarks()
    }

console.log(Object.keys(state.marks).length)

    return (
        <div>
            {accept ?
                <div className="form-group">
                    <ul className="list-group">

                        <li className="list-group-item list-group-item-primary">Письма отправятся:</li>
                        {Object.keys(state.marks).map((mail) => (
                            <li key={mail} className="list-group-item">{mail}</li>
                            ))
                        }
                    </ul>
                    <button onClick={() => {
                        postMarks()
                    }} className="btn btn-outline-success mr-3 mt-3">Подтвердить
                    </button>
                    <button onClick={() => {
                        setAccept(false)
                    }} className="btn btn-outline-danger mt-3">отменить
                    </button>
                </div>
                :
                <div className="form-group">
                    <div className="form-group">
                        <label htmlFor="subject">Тема письма</label>
                        <input type="text"
                               value={subject}
                               className="form-control"
                               id="subject"
                               onChange={(e) => {
                                   setSubject(e.target.value)
                               }}
                               placeholder="Введите тему"
                               name="subject"/>


                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Текст письма</label>
                        <textarea
                            value={text}
                            className="form-control"
                            id="content"
                            rows="6"
                            name="mail"
                            onChange={(e) => {
                                setText(e.target.value)
                            }} />
                    </div>
                    {Object.keys(state.marks).length !== 0 &&
                        <button onClick={() => {
                            setAccept(true)
                        }} className="btn btn-outline-success">Отправить оценки</button>
                    }
                </div>
            }
        </div>
    )
}