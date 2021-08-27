import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './SignIn.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data) => {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

    return (
        <div className="signinFormContainer">
            <h4>Please sign in</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input name="userName" type="text" {...register('userName')} className={`form-control ${errors.userName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.userName?.message}</div>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="goBtn">
                    <button type="submit" className="btn">Go!</button>
                </div>
            </form>
            <div className="signInLink">
                <p><Link to="/">Forgot your username?</Link></p>
                <p><Link to="/">Forgot your password?</Link></p>
            </div>
            <div class="signinLogo">
                <p>EveryShift</p>
            </div>
        </div>
    )

};

export default SignIn;