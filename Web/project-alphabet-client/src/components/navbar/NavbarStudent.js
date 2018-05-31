import React, {Component} from 'react';
import decode from 'jwt-decode';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';



class NavbarStudent extends Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');

        this.state = {
            user: decode(token)
        }
    }

    handleLogout = (event) => {
        localStorage.clear('token');
    }

    render () {
        return (
            <div className = "navdiv">
                <Navbar inverse collapseOnSelect className = "navigator">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand" className = "main-title">Project Alphabet<span className = "pre-release">ALPHA</span></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={2} href="/view-skills">
                                View Skills
                            </NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                {this.state.user.Username}
                            </NavItem>
                            <NavItem eventKey={2}href = "/login" onClick = {this.handleLogout}>
                                LOGOUT
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>   
            </div>
        );
    }

}

export default NavbarStudent;