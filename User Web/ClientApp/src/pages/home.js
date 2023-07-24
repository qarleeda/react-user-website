import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            loading: false,
            email: '',
            phoneNo: '',
            skillset: '',
            hobby: '',
            phoneNo: '',
            inForm: false,
            method: 0
        }
    }

    componentDidMount()  {
        this.populateUserData();
    }

    async populateUserData () {
        try {
            this.setState({ loading: false });
            let response = await fetch('https://localhost:7020/api/user/getusers', {
                method: 'GET',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let data = await response.json();
            this.setState({ users: data, loading: true, inForm: false });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    async GetUserInfo (username) {
        try {
            this.setState({ loading: false });

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

                let data = await response.json();
                this.state.username = data.username
                this.state.email = data.email
                this.state.skillset = data.skillset
                this.state.hobby = data.hobby
                this.state.phoneNo = data.phoneNo
                this.state.inForm = true
                this.state.method = 1
                this.setState({ loading: true });
            }
            else {
                this.state.username = ''
                this.state.email = ''
                this.state.skillset = ''
                this.state.hobby = ''
                this.state.phoneNo = ''
                this.state.inForm = true
                this.state.method = 2
                this.setState({ loading: true });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    async AddUser (e) {
        try {
            this.setState({ loading: false });

            e.preventDefault();

            let response = await fetch(`https://localhost:7020/api/user/getuserinfo/${this.state.username}`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                if (response.status == 204) {
                   let response2 = await fetch('https://localhost:7020/api/user/AddUser/', {
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'same-origin',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: this.state.username,
                            email: this.state.email,
                            phoneNo: this.state.phoneNo,
                            skillset: this.state.skillset,
                            hobby: this.state.hobby
                        })
                    })           

                    if (response2.ok) {
                        await this.populateUserData()
                        window.alert('User added.')
                    }
                    else {
                        this.GetUserInfo('')
                        window.alert('Register failed.')
                    }
                }
                else {
                    this.GetUserInfo('')
                    window.alert('Username has been used by other user.');
                }
                this.setState({ loading: true });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    async UpdateUser (e) {
        try {
            this.setState({ loading: false });

            e.preventDefault();

            let response = await fetch('https://localhost:7020/api/user/UpdateUser/', {
                method: 'PUT',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    phoneNo: this.state.phoneNo,
                    skillset: this.state.skillset,
                    hobby: this.state.hobby
                })
            })

            if (response.ok) {
                await this.populateUserData()
                window.alert('User updated.')
            }
            else {
                window.alert('Update failed.')
            }
    }
        catch (err) {
            console.log(err.message);
        }
    }

    async DeleteUser (username) {
        try {
            this.setState({ loading: false });

            const boo_delete = window.confirm('Are you sure to delete this user?')

            if (boo_delete) {
                if (username != '') {
                    let response = await fetch(`https://localhost:7020/api/user/DeleteUser/${username}`, {
                        method: 'DELETE',
                        mode: 'cors',
                        credentials: 'same-origin',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })

                    if (response.ok) {
                        await this.populateUserData()
                        window.alert('User deleted.')
                    }
                    else {
                        window.alert('Delete failed.')
                    }
                }
            }
            this.setState({ loading: true });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    renderUsersTable(users) {
        return (
            <main id="main" class="main mt-5" style={{ margin: 'auto', width: '70%' }}>
                <section class="section">
                    <div class="row">
                        <div class="col-lg-12">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">USERS
                                        <button type="button" class="btn btn-primary" style={{ float: 'right', display: 'inline-table', marginBottom: '20px', marginRight: '10px' }} onClick={() => this.GetUserInfo('') }>Add New User</button>
                                        <button type="button" class="btn btn-primary" style={{ float: 'right', display: 'inline-table', marginBottom: '20px', marginRight: '10px' }} onClick={() => this.populateUserData()}>Reload Data</button>
                                    </h5>

                                    <table class="table datatable" aria-labelledby="tableLabel">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Phone No.</th>
                                                <th>Skillset</th>
                                                <th>Hobby</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(users =>
                                                <tr id={users.username}>
                                                    <td>{users.username}</td>
                                                    <td>{users.email}</td>
                                                    <td>{users.phoneNo}</td>
                                                    <td>{users.skillset}</td>
                                                    <td>{users.hobby}</td>
                                                    <td>
                                                        <button type="View" class="btn btn-primary" style={{ marginRight: '10px' }} onClick={ () => this.GetUserInfo(users.username)}>Update</button>
                                                        <button type="Delete" class="btn btn-secondary" onClick={() => this.DeleteUser(users.username)} >Delete</button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        );
    }

    handleChangeName(e) {
        this.state.username = e.target.value;
    }

    handleChangeEmail(e) {
        this.state.email = e.target.value;
    }

    handleChangePhone(e) {
        this.state.phoneNo = e.target.value;
    }

    handleChangeSkillset(e) {
        this.state.skillset = e.target.value;
    }

    handleChangeHobby(e) {
        this.state.hobby = e.target.value;
    }

    renderUserInfo(username, email, phoneNo, skillset, hobby) {
        if (this.state.method == 1) {
            return (
                <div class="card mt-5" style={{ 'margin-left': 'auto', 'margin-right': 'auto', width: '70%' }}>
                    <div class="card-body">
                        <h5 class="card-title">Update User</h5>

                        <form>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">User Name</label>
                                <div class="col-sm-10">
                                    <input type="username" class="form-control" readOnly placeholder='eg: user123' maxLength="20" id="inputUsername" defaultValue={username} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control numeric" placeholder='eg: 123@abc.com' id="inputEmail" maxLength="50" defaultValue={email} onChange={(e) => this.handleChangeEmail(e)} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Phone No.</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder='eg: +60123456789' id="inputPhone" maxLength="20" defaultValue={phoneNo} onChange={(e) => this.handleChangePhone(e)} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Skillset</label>
                                <div class="col-sm-10">
                                    <input type="skillset" class="form-control" placeholder='eg: Attention to detail' id="inputSkillset" maxLength="50" defaultValue={skillset} onChange={(e) => this.handleChangeSkillset(e)} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Hobby</label>
                                <div class="col-sm-10">
                                    <input type="hobby" class="form-control" placeholder='eg: Reading a book' id="inputHobby" maxLength="50" defaultValue={hobby} onChange={(e) => this.handleChangeHobby(e)} />
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" style={{ marginRight: '10px' }} class="btn btn-primary" onClick={(e) => this.UpdateUser(e)} >Update</button>
                                <button type="cancel" value="Cancel" formNoValidate class="btn btn-secondary" onClick={() => this.populateUserData()} >Cancel</button>
                            </div>
                        </form>

                    </div>
                </div>
            )
        }
        else {
            return (
                <div class="card mt-5" style={{ 'margin-left': 'auto', 'margin-right': 'auto', width: '70%' }}>
                    <div class="card-body">
                        <h5 class="card-title">Register User</h5>

                        <form>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">User Name</label>
                                <div class="col-sm-10">
                                    <input type="username" class="form-control" placeholder='eg: user123' maxLength="20" id="inputUsername" defaultValue={username} required onChange={(e) => this.handleChangeName(e)} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control numeric" placeholder='eg: 123@abc.com' id="inputEmail" maxLength="50" defaultValue={email} onChange={(e) => this.handleChangeEmail(e)} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Phone No.</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder='eg: +60123456789' id="inputPhone" maxLength="20" defaultValue={phoneNo} onChange={(e) => this.handleChangePhone(e)} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Skillset</label>
                                <div class="col-sm-10">
                                    <input type="skillset" class="form-control" placeholder='eg: Attention to detail' id="inputSkillset" maxLength="100" defaultValue={skillset} onChange={(e) => this.handleChangeSkillset(e)} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Hobby</label>
                                <div class="col-sm-10">
                                    <input type="hobby" class="form-control" placeholder='eg: Reading a book' id="inputHobby" maxLength="100" defaultValue={hobby} onChange={(e) => this.handleChangeHobby(e)} />
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" style={{ marginRight: '10px' }} class="btn btn-primary" onClick={(e) => this.AddUser(e)}>Register</button>
                                <button type="cancel" value="Cancel" formNoValidate class="btn btn-secondary" onClick={() => this.populateUserData()} >Cancel</button>
                            </div>
                        </form>

                    </div>
                </div>
            )
        }
    }

    render() {
        var { inForm, loading, users, username, email, phoneNo, skillset, hobby } = this.state;

        let contents = null;
            if (loading == false) {
                contents = <p><em>Loading...</em></p>
                return (
                    <div>
                        <header id="header" class="header fixed-top d-flex align-items-center">
                            <div class="d-flex align-items-center justify-content-between">
                                <a href="index.html" class="logo d-flex align-items-center">
                                    <img src="assets/img/logo.png" alt="" />
                                    <span class="d-none d-lg-block">User Assessment</span>
                                </a>
                            </div>

                        </header>
                            {contents}
                    </div>
                    )                
            }
            else {
                if (inForm) {
                    contents = this.renderUserInfo(username, email, phoneNo, skillset, hobby)
                    return (
                        <div>
                    <header id="header" class="header fixed-top d-flex align-items-center">
                        <div class="d-flex align-items-center justify-content-between">
                            <a href="index.html" class="logo d-flex align-items-center">
                                <img src="assets/img/logo.png" alt="" />
                                        <span class="d-none d-lg-block">User Assessment</span>
                            </a>
                        </div>

                    </header>
                            {contents}
                            </div>
                    )
                }
                else {
                    contents = this.renderUsersTable(users)
                    return (
                        <div>
                            <header id="header" class="header fixed-top d-flex align-items-center">
                                <div class="d-flex align-items-center justify-content-between">
                                    <a href="index.html" class="logo d-flex align-items-center">
                                        <img src="assets/img/logo.png" alt="" />
                                        <span class="d-none d-lg-block">User Assessment</span>
                                    </a>
                                </div>

                            </header>

                                {contents}
                        </div>                
                    )
                }
            }
        }
    }