import React, { Component } from 'react';

export class CreateEmploy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind();
        this.handleLastNameChange = this.handleLastNameChange.bind();
        this.handleEmailAddressChange = this.handleEmailAddressChange.bind();
        this.saveEmploy = this.saveEmploy.bind();

        this.handleUpdateProperty = this.handleUpdateProperty.bind();
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstName: event.target.value,
        })
    }

    handleLastNameChange = (event) => {
        this.setState({
            lastName: event.target.value,
        })
    }

    handleEmailAddressChange = (event) => {
        this.setState({
            emailAddress: event.target.value,
        })
    }

    handleUpdateProperty = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name] : value
        })
    }

    saveEmploy = (e) => {
        e.preventDefault();

        let employ = { firstName: this.state.firstName, lastName: this.state.lastName, emailAddress: this.state.emailAddress };
        console.log('employ => ', JSON.stringify(employ));
        let empJSON = JSON.stringify(employ);
        let request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8080/ems/api/v1/employees', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(empJSON);

        request.onreadystatechange = () => {
            if (request.status === 200) {
                console.log(request.response);
                this.props.history.push('/employees');
            } else {
                console.log(`error ${request.status} ${request.statusText}`);
            }
        }
    }

    componentDidMount() {
        console.log('inside CreateUpdateEmploy..!!');
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Employ</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name :</label><br></br>
                                        <input placeholder="First Name" name="firstName" className="form-content"
                                            value={this.state.firstName} onChange={this.handleUpdateProperty}></input>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <label>Last Name :</label><br></br>
                                        <input placeholder="Last Name" name="lastName" className="form-content"
                                            value={this.state.lastName} onChange={this.handleUpdateProperty}></input>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <label>Email Address :</label><br></br>
                                        <input placeholder="Email Address" name="emailAddress" className="form-content"
                                            value={this.state.emailAddress} onChange={this.handleUpdateProperty}></input>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <button className="btn btn-success" onClick={this.saveEmploy}>Save</button>
                                    <button className="btn btn-danger" style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEmploy
