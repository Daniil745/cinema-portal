import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import AccountMenu from './AccountMenu'

export default class mainer extends Component {
    render() {
        return (
            <>
                <AccountMenu />
                <Outlet />
            </>
        )
    }
}