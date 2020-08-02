import React, { Component } from 'react'

export class CreateUpdateEmploy extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            emailAddress: "",
            title: "",
        }

        this.handleFirstNameChange = this.handleFirstNameChange.bind();
        this.handleLastNameChange = this.handleLastNameChange.bind();
        this.handleEmailAddressChange = this.handleEmailAddressChange.bind();

        this.handleAddEmploy = this.handleAddEmploy.bind();
        this.handleUpdateEmploy = this.handleUpdateEmploy.bind();

        this.handleAddOrUpdateEmploy = this.handleAddOrUpdateEmploy.bind();
        this.handleResetForm = this.handleResetForm.bind();
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    handleLastNameChange = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    handleEmailAddressChange = (event) => {
        this.setState({
            emailAddress: event.target.value
        })
    }

    handleAddEmploy = (e) => {
        e.preventDefault();

        let employ = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddress
        };

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

    handleUpdateEmploy = (e) => {
        e.preventDefault();

        let employ = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddress
        };

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

    handleAddOrUpdateEmploy = (e) => {
        e.preventDefault();

        let employ = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddress
        };

        console.log('employ => ', JSON.stringify(employ));
        let emp = JSON.stringify(employ);

        let request = new XMLHttpRequest();

        if (undefined === this.state.id) {
            request.open('POST', 'http://localhost:8080/ems/api/v1/employees', true);
        } else {
            request.open('PUT', `http://localhost:8080/ems/api/v1/employees/${employ.id}`, true);
        }
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(emp);

        request.onreadystatechange = () => {
            if (request.status === 200) {
                console.log(request.response);
                this.props.history.push('/employees');
            } else {
                console.log(`error ${request.status} ${request.statusText}`);
            }
        }
    }

    handleResetForm = (e) => {
        e.preventDefault();
        console.log('reset changes..!!');
        // this.form.reset();
        if (undefined === this.state.id) {
            this.props.history.push(`/create-update-employ`);
        } else {
            this.props.history.push(`/create-update-employ/${this.state.id}`);
        }
    }

    componentDidMount() {
        console.log('inside CreateUpdateEmploy..!!');
        // console.log(this.props);
        // console.log(this.props.match.params)
        // console.log(this.props.match.params.id);
        if (undefined === this.state.id) {
            console.log('Add New Employ');

            this.setState({
                title: "Add New Employ"
            })
        } else {
            console.log('Update Employ');

            this.setState({
                title: "Update Employ"
            });

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
    }



    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">{this.state.title}</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name :</label><br></br>
                                        <input placeholder="First Name" name="firstName" className="form-content"
                                            defaultValue={this.state.firstName} onChange={this.handleFirstNameChange}></input>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <label>Last Name :</label><br></br>
                                        <input placeholder="Last Name" name="lastName" className="form-content"
                                            defaultValue={this.state.lastName} onChange={this.handleLastNameChange}></input>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <label>Email Address :</label><br></br>
                                        <input placeholder="Email Address" name="emailAddres" className="form-content"
                                            defaultValue={this.state.emailAddress} onChange={this.handleEmailAddressChange}></input>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    {
                                        undefined === this.state.id ?
                                            <button className="btn btn-success" onClick={this.handleAddOrUpdateEmploy}>Save</button> :
                                            <button className="btn btn-success" onClick={this.handleAddOrUpdateEmploy}>Update</button>
                                    }

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

export default CreateUpdateEmploy
