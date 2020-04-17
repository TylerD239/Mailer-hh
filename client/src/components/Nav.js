import React, {useContext} from 'react'
import {StudentsContext} from "../context/students/StudentsContext";
import {groups} from '../context/students/groups'

export const Nav = () => {

    const {groupHandle, state} = useContext(StudentsContext)

    return (
        <div className="list-group">
            {Object.keys(groups).map((group) => {
                return(
                    <button
                        key={group}
                        type="button"
                        className={group === state.group ?
                            "list-group-item list-group-item-action active"
                            :
                            "list-group-item list-group-item-action"
                        }
                        onClick={()=>{groupHandle(group)}}
                    >
                        {groups[group]}
                    </button>
                )
            })}
        </div>
    )
}