import React, {useContext} from "react"
import {StudentsContext} from "../context/students/StudentsContext"

export const EditTable = () => {
    const {state, addStudent, changeName, changeMail, deleteStudent} = useContext(StudentsContext)


    return (
        <div>
            <table className="table table-hover">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col" />
                </tr>
                </thead>
                <tbody>
                {state.list.map((student, i) => (
                    <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>
                            <input
                                className="form-control"
                                type="text"
                                value={student[0] || ''}
                                onChange={evt => changeName(evt, i)}
                            />
                        </td>
                        <td>
                            <input
                                className={student[2] ? "form-control red" : "form-control"}
                                type="text"
                                onChange={evt => changeMail(evt, i)}
                                value={student[1] || ''}
                            />
                        </td>
                        <td>
                            <button
                                type="button"
                                onClick={() => deleteStudent(i)}
                                className="btn btn-outline-link red"
                            >
                                &times;
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {state.group &&
            <button type="button" onClick={addStudent} className="btn btn-outline-primary btn-block">Добавить</button>}
        </div>
    )
}