import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div>
                            <a href="/" className="navbar-brand">
                                <b>Employee Management System (EMS)</b>
                            </a>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header
