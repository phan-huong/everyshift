import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';

const UserProfile = () => {
    const [userData, setUserData] = useState();
    const user_id = useParams().id;

    const fetch_user_profile = async () => {
        if (!userData) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
    
            var status_code;
            await fetch(`http://localhost:9000/users/${user_id}`, requestOptions)
            .then(response => {
                status_code = response.status;
                return response.json()
            })
            .then(result => {
                if (status_code === 200) {
                    // console.log(result);
                    setUserData(result.user_data);
                }
            })
            .catch(error => console.log('error', error));
        }
    }

    useEffect(() => {
        fetch_user_profile();
    })

    return (
        <>
            { userData ?
                <UserForm data={userData} type="sign_up" /> : <h1>No data</h1>
            }
        </>
    )
}

export default UserProfile;