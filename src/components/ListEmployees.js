import React, { Component } from 'react'

export class ListEmployees extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
        this.handleAddEmploy = this.handleAddEmploy.bind();
        this.handleUpdateEmploy = this.handleUpdateEmploy.bind();
    }

    // componentWillMount() {
    //     console.log('ListEmployees Component Will Mount..!!');

    //     //1. XMLHTTPRequest

    //     // let request = new XMLHttpRequest();
    //     // request.open("GET", "http://localhost:8080/api/v1/employees");
    //     // request.send();
    //     // request.onload = () => {
    //     //     console.log(request);
    //     //     if (request.status === 200) {
    //     //         console.log(JSON.parse(request.response));
    //     //         this.setState({
    //     //             employees : JSON.parse(request.response)
    //     //         })
    //     //     } else {
    //     //         console.log(`error ${request.status} ${request.statusText}`);
    //     //     }
    //     // }


    //     //2. fetch

    //     // fetch("http://localhost:8080/api/v1/employees").then(response => {
    //     //     console.log('Using fetch API : ', response);
    //     //     // console.log(response);
    //     //     this.setState({
    //     //         employees : response.json()
    //     //     })
    //     //     return response.json();
    //     // }).then(users => console.log(users));

    // }


    handleAddEmploy = () => {
        // this.props.history.push("/add-employ");
        this.props.history.push("/create-update-employ")
    }

    handleUpdateEmploy = (empId) => {
        // this.props.history.push(`/update-employ/${empId}`);
        this.props.history.push(`/create-update-employ/${empId}`)
    }


    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button className="bnt btn-primary" onClick={this.handleAddEmploy}>Add Employ</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Emp. First Name</th>
                                <th>Emp. Last Name</th>
                                <th>Emp. Email Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employ =>
                                        <tr key={employ.id}>
                                            <td>
                                                {employ.firstName}
                                            </td>
                                            <td>
                                                {employ.lastName}
                                            </td>
                                            <td>
                                                {employ.emailAddress}
                                            </td>
                                            <td>
                                                <button onClick={() => this.handleUpdateEmploy(employ.id)} className="btn btn-info">Update</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    componentDidMount() {
        console.log('ListEmployees Component Did Mount ...!!');

        //1. XMLHTTPRequest
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:8080/api/v1/employees");
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                console.log(JSON.parse(request.response));
                this.setState({
                    employees: JSON.parse(request.response),
                })
            } else {
                console.log(`error ${request.status} ${request.statusText}`);
            }

        }
    }
}

export default ListEmployees;