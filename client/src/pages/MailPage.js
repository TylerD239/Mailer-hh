import React, {useContext} from "react"
import {Loader} from '../components/Loader'
import {Nav} from '../components/Nav'
import {MailTable} from "../components/MailTable"
import {Mail} from "../components/Mail"
import {StudentsContext} from "../context/students/StudentsContext";

export const MailPage = () => {

    const {state} = useContext(StudentsContext)
    return (
        <div className="container-fluid mt-2">
            <div className="row">

                <div className="col-sm-2">
                    <Nav />
                </div>

                <div className="col-sm-7 ">
                    {state.loading ? <Loader/> : <MailTable />}
                </div>

                <div className="col-sm-3">
                    <Mail />
                </div>

           </div>
        </div>
    )
}