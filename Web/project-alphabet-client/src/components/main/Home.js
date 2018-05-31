import React, {Component} from 'react';
import decode from 'jwt-decode';

import NavbarComponent from '../navbar/Navbar';
import NavbarStudent from '../navbar/NavbarStudent';

class Home extends Component {

    renderTeacher() {
        return (
            <div>
                <NavbarComponent />
            </div>
        );
    }

    renderStudent() {
        return(
            <div>
                <NavbarStudent />
            </div>
        );
    }

    render() {
        const token = localStorage.getItem('token');
        const user = decode(token);
        if(user.Role_idRole == 1 || user.Role_idRole == 2){
            return this.renderTeacher();
        } else {
            return this.renderStudent();
        }
    }

}

export default Home;