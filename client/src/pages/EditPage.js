import React, {useContext} from "react"
import {Loader} from "../components/Loader"
import {Nav} from "../components/Nav"
import {EditTable} from "../components/EditTable";
import {StudentsContext} from "../context/students/StudentsContext";


export const EditPage = () => {

const {state,groupHandle} = useContext(StudentsContext)
    const postEdits = async () => {
        const response = await fetch(`/api/edits/${state.group}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(state.list)
        }

    )
        const data = await response.json()
        window.alert(data.message)
        groupHandle(state.group)
    }



    return (
        <div className="container-fluid mt-2">
            <div className="row">

                <div className="col-sm-2">
                    <Nav />
                </div>

                <div className="col-sm-7 ">
                    {state.loading ? <Loader/> : <EditTable />}
                </div>


                <div className="col-md-3 mt-2">
                    <button type="button" onClick={postEdits} className="btn btn-outline-success">Сохранить изменения</button>
                </div>

            </div>
        </div>
    )
}