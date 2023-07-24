import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        //this.state = { forecasts: [], loading: true };
        this.state = { users: [], loading: true };
    }

    componentDidMount() {
        //this.populateWeatherData();
        this.populateUserData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderUsersTable(users) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone No.</th>
                        <th>Skillset</th>
                        <th>Hobby</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(users =>
                        <tr key={users.username}>
                            <td>{users.username}</td>
                            <td>{users.email}</td>
                            <td>{users.phoneNo}</td>
                            <td>{users.skillset}</td>
                            <td>{users.hobby}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderUsersTable(this.state.users);

        return (
            <div>
                <h1 id="tableLabel">User List</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }

    async populateUserData() {
        const response = await fetch('https://localhost:7020/api/user/getusers');
        const data = await response.json();
        this.setState({ users: data, loading: false });
    }
}
