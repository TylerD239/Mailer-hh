import React, {useState} from "react"
import {Loader} from "../components/Loader";


export const EditPage = () => {

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


    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])
    const [cls, setCls] = useState('')

    // const [text, setText] = useState('')


    const postEdits = async () => {
        const response = await fetch(`/api/edits/${cls}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(students)
        }

    )
        const data = await response.json()
        window.alert(data.message)
    }

    const changeName = (e,id) => {
        setStudents(students.map((el,i) =>{
            if (i === id) el[0] = e.target.value
            return el
        }))
    }
    const changeMail = (e,id) => {
        setStudents(students.map((el,i) =>{
            if (i === id) el[1] = e.target.value
            return el
        }))
    }

    const deleteStudent = (id) => {
        setStudents(students.filter((_,i) => i !== id))
    }

    const getStudents = async (c) => {
        setCls(c)
        const response = await fetch(`/api/getList/${c}`)
        const data = await response.json()

        setStudents(data)
        setLoading(false)
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
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student, i) => (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>
                                        <input
                                            className="form-control"
                                            type="text"
                                            defaultValue={student[0] || 'Пусто'}
                                            onChange={(e) => {
                                                changeName(e, i)
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={student[2] ? "form-control red" : "form-control"}
                                            type="text"
                                            onChange={(e) => {
                                                changeMail(e, i)
                                            }}
                                            defaultValue={student[1] || 'Пусто'}
                                        />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => {
                                            deleteStudent(i)
                                        }} className="btn btn-outline-danger ml-5">&times;</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    }
                </div>


                <div className="col-md-3 mt-2">
                    <button type="button" onClick={postEdits} className="btn btn-outline-success">Сохранить изменения</button>
                </div>
            </div>
        </div>
    )
}