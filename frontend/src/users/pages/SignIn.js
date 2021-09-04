import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import "bootstrap/dist/css/bootstrap.css";
import './SignIn.css';

const SignIn = () => {
    let history = useHistory();
    let has_token = localStorage.getItem('logged_in_token') ? true : false;

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify(data);
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        const fetched_user = await fetch("http://localhost:9000/users/login", requestOptions)
            .then(response => {
                console.log(response);
                if (response.status === 200) console.log('Success!'); else console.log('Failed!');
                return response.json()
            })
            .then(result => {
                if (result.hasOwnProperty("token")) {
                    localStorage.setItem('logged_in_token', result.token);
                    history.push("/");
                } else {
                    localStorage.removeItem('logged_in_token');
                }

                console.log(result);
            })
            .catch(error => {
                console.log('error', error)
            });
        

        // return false;
    }

    if (has_token) return <Redirect to="/" />

    return (
        <div className="bg-dark size_full_screen">
            <div className="signinFormContainer">
                <h4>Please sign in</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Username</label>
                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
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
                <div className="signinLogo">
                    <p>EveryShift</p>
                </div>
            </div>
        </div>
    )
};

export default SignIn;