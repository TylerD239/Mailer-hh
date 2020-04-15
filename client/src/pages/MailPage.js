import React, {useState} from "react"
import {} from 'email-validator'
import {Loader} from "../components/Loader";

export const MailPage = () => {

    const selections = {
        '5a':'5а',
        '5b':'5б',
        '5v':'5в',
        '6a':'6а',
        '6b':'6б',
        '6v':'6в',
        '7a':'7а',
        '7b':'7б',
        '7v':'7в',
        '8a':'8а',
        '8b':'8б',
        '8v':'8в',
        'test':'Тест'
    }


    const [cls, setCls] = useState('')
    const [loading, setLoading] = useState(false)
    const [accept, setAccept] = useState(false)
    const [students, setStudents] = useState([])
    const [marks, setMarks] = useState({})
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')

    const addMark = (e,student) => {
        if (!student) return
        setMarks({...marks, [student]: e.target.value})
        // console.log(marks)
    }

    const getStudents = async (c) => {
        const response = await fetch(`/api/getList/${c}`)
        const data = await response.json()
        // setStudents(data.map((el) => [...el, []]))
        setStudents(data)
        setLoading(false)
    }

    const postMarks = async () => {
        const response = await fetch('/api/send', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subject, text, marks
            })
        })
        const data = await response.json()

        setAccept(false)

        alert(data.message)

        if (response.ok) setMarks({})
    }


    const changeClass = (c) => {
        setLoading(true)
        setCls(c)
        getStudents(c)
    }



    return (
        <div className="container-fluid mt-2">
            <div className="row">

                <div className="col-sm-2">

                    <div className="list-group">
                        {Object.keys(selections).map((key) => {
                            return(
                                <button
                                    key={key}
                                    type="button"
                                    className={key === cls ?
                                        "list-group-item list-group-item-action active"
                                        :
                                        "list-group-item list-group-item-action"
                                    }
                                    onClick={()=>{changeClass(key)}}
                                >
                                    {selections[key]}
                                </button>
                            )
                        })}


                    </div>

                </div>



                    <div className="col-sm-7 ">
                        {loading ? <Loader/> :
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mark</th>
                                </tr>
                                </thead>
                                <tbody>
                                {students.map((student, i) => (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{student[0]}</td>
                                            <td className={student[2] ? "red" : null}>{student[1] || 'Нет почты'}</td>
                                            <td>
                                                <input
                                                    className="form-control mark"
                                                    type="text"
                                                    maxLength="1"
                                                    onChange={(e) => {
                                                        addMark(e, student[1])
                                                    }}
                                                    disabled={!student[1]}
                                                />
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>

                            </table>
                        }
                    </div>




                <div className="col-md-3 mt-2">
                    {!accept &&
                    <>
                        <div className="form-group">
                            <label htmlFor="subject">Тема письма</label>
                            <input type="text"
                                   className="form-control"
                                   id="subject"
                                   onChange={(e)=>{setSubject(e.target.value)}}
                                   placeholder="Введите тему"
                                   name="subject"/>


                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Текст письма</label>
                            <textarea
                                className="form-control"
                                id="content"
                                rows="5"
                                name="mail"
                                onChange={(e)=>{setText(e.target.value)}}
                                placeholder="Ведите текст письма. Вместо оценки используйте слово mark." />
                        </div>
                        <button onClick={()=>{if (Object.keys(marks).length) setAccept(true)}} className="btn btn-outline-success">Отправить оценки</button>
                    </>}
                    {accept &&
                        <>
                            <ul className="list-group">

                                <li className="list-group-item list-group-item-primary">Письма отправятся:</li>
                                {Object.keys(marks).map((mail) => (
                                    <li key = {mail} className="list-group-item">{mail}</li>
                                    ))
                                }
                            </ul>
                            <button onClick={()=>{postMarks()}} className="btn btn-outline-success mr-3 mt-3">Подтвердить</button>
                            <button onClick={()=>{setAccept(false)}} className="btn btn-outline-danger mt-3">отменить</button>
                        </>}
                </div>
           </div>
        </div>
    )
}