import React from "react";
import { signup } from '../api/apiCalls';
import Input from '../components/Input';
import {withTranslation} from 'react-i18next';

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
        const errors = { ...this.state.errors }
        errors[name] = undefined
        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = 'Password mismatch';
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = 'Password mismatch';
            } else {
                errors.passwordRepeat = undefined;
            }
        }
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
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors });
            }
        }
        this.setState({ pendingApiCall: false });
    };
    render() {
        const { pendingApiCall, errors } = this.state;
        const { username, nickName, password, passwordRepeat } = errors;

        return (
            <div className="cantainer">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input name="username" label="Username" error={username} onChange={this.onChange} />
                    <Input name="nickName" label="Nick Name" error={nickName} onChange={this.onChange} />
                    <Input name="password" label="Password" error={password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange={this.onChange} type="password" />
                    <div className="text-center"><br></br>
                        <button className="btn btn-primary" onClick={this.onClickSignup} disabled={pendingApiCall || passwordRepeat !== undefined} >
                            {pendingApiCall && <span className="spinner-border spinner-border-sm" ></span>} Sign Up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSignupPageWithTranslation;