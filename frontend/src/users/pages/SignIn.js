import React, { useState, useEffect } from 'react';
import { Redirect, Router } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './SignIn.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const [loginState, setLoginState] = useState(false);

    // useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {
        // display form data on success
        // console.log(data);
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));

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
                    setLoginState(true)
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

    // useEffect(() => {
    //     if (localStorage.getItem('logged_in_token')) {
    //         setLoginState(true);
    //     } else {
    //         setLoginState(false);
    //     }
    // }, [])

    return (
        <div className="signinFormContainer">
            {loginState && (
                <Router>
                    <Redirect from="/signin" to="/" />
                </Router>
            )}
            
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
            <div class="signinLogo">
                <p>EveryShift</p>
            </div>
        </div>
    )

};

export default SignIn;