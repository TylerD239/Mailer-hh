import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {MailPage} from './pages/MailPage'
import {EditPage} from './pages/EditPage'

export const useRoutes = () => {


        return (
            <Switch>
                <Route path="/edit" exact>
                    <EditPage />
                </Route>
                <Route path="/mail" exact>
                    <MailPage />
                </Route>

                <Redirect to="/mail" />
            </Switch>
        )

}