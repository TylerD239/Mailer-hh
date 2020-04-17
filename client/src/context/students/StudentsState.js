import React, {useReducer} from "react"
import {StudentsContext} from "./StudentsContext";
import {StudentsReducer} from "./StudentsReducer";

export const StudentsState = ({children}) => {

    const [state, dispatch] = useReducer(StudentsReducer, {list: [], marks: {}, group: ''})

    const showLoader = () => dispatch({type : 'SHOW_LOADER'})

    const addMark = (event, email) => {
        const mark = event.target.value
        if (!mark) {
            dispatch({type: 'DELETE_MARK', email})
        } else dispatch({type: 'ADD_MARK', mark, email})
    }
    const groupHandle = async (group) => {
        showLoader()
        const response = await fetch(`/api/getList/${group}`)
        const list = await response.json()
        dispatch({type: 'CHANGE_GROUP', list, group})
    }

    const addStudent = () => {
        const name = 'Фамилия Имя'
        const email = 'Email'
        dispatch({type: 'ADD_STUDENT',name, email})
    }

    const deleteStudent = (studentId) => {

        dispatch({type: 'DELETE_STUDENT', studentId})
        console.log(state.list)
    }

    const changeMail = (e, studentId) => {
        const email = e.target.value.trim()
        const oldEmail = state.list[studentId][1]
        dispatch({type: 'DELETE_MARK', email: oldEmail})
        dispatch({type: 'CHANGE_MAIL', email, studentId})
    }

    const changeName = (e, studentId) => {
        const name = e.target.value.trim()
        dispatch({type: 'CHANGE_NAME' , name, studentId})
    }
    const clearMarks = () => {
        dispatch({type: 'CLEAR_MARKS'})
    }



    return (
        <StudentsContext.Provider value={{groupHandle, addMark, addStudent, deleteStudent, clearMarks, changeName, changeMail, state}}>
            {children}
        </StudentsContext.Provider>
    )
}