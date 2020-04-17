import React, {useContext} from "react"
import {StudentsContext} from "../context/students/StudentsContext"

export const MailTable = () => {
    const {state, addMark} = useContext(StudentsContext)

    return (
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
            {state.list.map((student, i) => (
                    <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{student[0]}</td>
                        <td className={student[2] ? "red" : null}>{student[1] || 'Нет почты'}</td>
                        <td>
                            <input
                                className="form-control mark"
                                value = {state.marks[student[1]] || ''}
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
   )
}