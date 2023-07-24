import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

function UserAction() { 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [skillSet, setSkillset] = useState('');
    const [hobby, setHobby] = useState('');
    const loading = false;

    const getUserInfo = (username) => {
        try {
            if (username != '') {
                let response = await fetch(`https://localhost:7020/api/user/getuserinfo/${username}`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                console.log(response);
                let data = await response.json();
                this.setState({ username: data.username, email: data.email, phoneNo: data.phoneNo, skillSet: data.skillSet, hobby: data.hobby });
                this.loading = true;
            }
        }
        catch (err) {
            console.log(err.message);
        }
    };

    const renderUserInfo = () => {
        await getUserInfo(this.state.username);
        return (
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">User Form</h5>

                    <form onSubmit={getUserInfo}>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" value={ } id="inputUsername"/>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="inputEmail"/>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Phone No.</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="inputPhone"/>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Skillset</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="inputSkillset"/>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Hobby</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="inputHobby"/>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <button type="update" class="btn btn-primary">Update</button>
                            <button type="reset" class="btn btn-secondary">Delete</button>
                            <button type="cancel" class="btn btn-secondary">Cancel</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

let contents = null;
if (this.loading == false) {
    contents = <p><em>Loading...</em></p>
}
else {
    contents = UserAction.renderUserInfo()
}

return (
    <div>
        <header id="header" class="header fixed-top d-flex align-items-center">
            <div class="d-flex align-items-center justify-content-between">
                <a href="index.html" class="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt="" />
                    <span class="d-none d-lg-block">User Website</span>
                </a>
                <i class="bi bi-list toggle-sidebar-btn"></i>
            </div>

        </header>

        <aside id="sidebar" class="sidebar">

            <ul class="sidebar-nav" id="sidebar-nav">

                <li class="nav-item">
                    <a class="nav-link " href="index.html">
                        <i class="bi bi-grid"></i>
                        <span>Users</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link " href="forms-layouts.html">
                        <i class="bi bi-grid"></i>
                        <span>User Form</span>
                    </a>
                </li>                        
            </ul>

        </aside>
        {contents}
    </div>
);    

class UserAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', email: '', phoneNo: '', skillSet: '', hobby: '' , loading: false};
    }
}

export default UserAction;