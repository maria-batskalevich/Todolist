import React from 'react'
import {Navigate} from "react-router-dom";

export const NotFound = () => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>404. Page not found </h1>
            <Navigate to={'/login/'}/>
        </div>
    )
}