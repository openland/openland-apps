import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Stats from './Stats'
export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/stats/homelessness" />
                <Route path="/stats" component={Stats}/>
            </Switch>
        </BrowserRouter>
    )
}