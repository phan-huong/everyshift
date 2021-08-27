import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './SignUp.css';

const SignUp = () => {
    // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        dob: Yup.string()
            .required('Date of Birth is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Ts & Cs is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data) => {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

    return (
            <div class="signupFormContainer">
                <h4>Create a new account</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Title</label>
                        <select name="title" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
                            <option value=""></option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            <option value="Dr">Dr.</option>
                            <option value="Prof">Prof.</option>
                            <option value="Prof Dr">Prof. Dr.</option>
                        </select>
                        <div className="invalid-feedback">{errors.title?.message}</div>
                    </div>
                    <div>
                        <label>First Name</label>
                        <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <input name="dob" type="date" {...register('dob')} className={`form-control ${errors.dob ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.dob?.message}</div>
                    </div>
                    <div>
                        <label>Email</label>
                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                    <div class="checkTerms">
                        <input name="acceptTerms" type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                        <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                        <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                    </div>
                    <div>
                        <button type="submit" className="btn mr-1 formBtn">Register</button>
                        <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                    </div>
                </form>
            </div>
    )
};

export default SignUp;