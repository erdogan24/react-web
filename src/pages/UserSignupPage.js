import React from "react";
import { signup } from '../api/apiCalls';

class UserSignupPage extends React.Component {


    state = {
        username: null,
        nickName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    };
    onChange = event => {

        const { name, value } = event.target;
        const errors = { ... this.state.errors }
        errors[name] = undefined
        this.setState({
            [name]: value,
            errors
        });
    };
    onClickSignup = async event => {
        event.preventDefault();

        const { username, nickName, password } = this.state;
        const body = {
            username,
            nickName,
            password
        };
        this.setState({ pendingApiCall: true });

        try {
            const response = await signup(body);
        } catch (error) {
            if(error.response.data.validationErrors){
                this.setState({ errors: error.response.data.validationErrors });
            }
            
        }
        this.setState({ pendingApiCall: false });

    };
    render() {
        const { pendingApiCall, errors } = this.state;
        const { username } = errors;
        return (
            <div className="cantainer">
                <form>

                    <h1 className="text-center">Sign Up</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input className={username ? "form-control is-invalid" : 'form-control'} name="username"
                            onChange={this.onChange}
                        />
                        <div className="invalid-feedback">
                            {username}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Nick name</label>
                        <input className="form-control" name="nickName"
                            onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>Password </label>
                        <input className="form-control" name="password" type="password"
                            onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>Password Repeat </label>
                        <input className="form-control" name="passwordRepeat" type="password"
                            onChange={this.onChange} />
                    </div>
                    <div className="text-center">
                        <br></br>
                        <button className="btn btn-primary"
                            onClick={this.onClickSignup}
                            disabled={pendingApiCall}
                        >

                            {pendingApiCall && <span className="spinner-border spinner-border-sm" ></span>} Sign Up
                        </button>

                    </div>
                </form>
            </div>
        );
    }
}

export default UserSignupPage;