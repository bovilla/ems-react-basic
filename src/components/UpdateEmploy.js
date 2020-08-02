import React, { Component } from 'react'

export class UpdateEmploy extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            emailAddress: ""
        }

        this.handleFirstNameChange = this.handleFirstNameChange.bind();
        this.handleLastNameChange = this.handleLastNameChange.bind();
        this.handleEmailAddressChange = this.handleEmailAddressChange.bind();
    }

    handleFirstNameChange = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }
    handleLastNameChange = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    handleEmailAddressChange = (e) => {
        this.setState({
            emailAddress: e.target.value
        })
    }

    updateEmploy = (e) => {
        e.preventDefault();

        let employ = { id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, emailAddress: this.state.emailAddress };
        console.log('employ => ', JSON.stringify(employ));
        let empJSON = JSON.stringify(employ);
        let request = new XMLHttpRequest();
        request.open('PUT', `http://localhost:8080/ems/api/v1/employees/${employ.id}`, true);
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

    handleCancel = (e) => {
        e.preventDefault();
        console.log('reset changes..!!');
        // this.form.reset();
        this.props.history.push(`/update-employ/${this.state.id}`);

    }

    componentDidMount() {
        console.log("inside UpdateEmploy ComponentDidMount...!")

        console.log("employ id => ", this.props.match.params.id)
        let request = new XMLHttpRequest();
        request.open('GET', `http://localhost:8080/ems/api/v1/employees/${this.props.match.params.id}`);
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                // console.log(request.response);
                console.log(JSON.parse(request.response));
                let employ = JSON.parse(request.response);
                this.setState({
                    // id: employ.id,
                    firstName: employ.firstName,
                    lastName: employ.lastName,
                    emailAddress: employ.emailAddress,
                })

            } else {
                console.log(`error ${request.status} ${request.statusText}`);
            }
        }

    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Employ</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name :</label><br></br>
                                        <input name="firstName" className="form-content"
                                            value={this.state.firstName} onChange={this.handleFirstNameChange}></input>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <label>Last Name :</label><br></br>
                                        <input name="lastName" className="form-content"
                                            value={this.state.lastName} onChange={this.handleLastNameChange} ></input>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <label>Email Address :</label><br></br>
                                        <input name="emailAddres" className="form-content"
                                            value={this.state.emailAddress} onChange={this.handleEmailAddressChange}></input>
                                    </div>
                                    <br></br>
                                    <button className="btn btn-success" onClick={this.updateEmploy}>Update</button>
                                    <button className="btn btn-danger" onClick={this.handleCancel} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateEmploy
