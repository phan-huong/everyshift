import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { get_ip, device_type } from '../../shared/components/localhost';

import UserForm from '../components/UserForm';
const USER_OBJ = { user_id: '' }

const UserProfile = (props) => {
    const [userData, setUserData] = useState();
    USER_OBJ.user_id = useParams().id;

    useEffect(() => {
        const fetch_user_profile = async () => {
            let token = localStorage.getItem("logged_in_token");
            if (token && USER_OBJ.user_id !== 'create') {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
        
                var status_code;
                await fetch(`${get_ip(device_type)}/users/${USER_OBJ.user_id}`, requestOptions)
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
            } else {
                setUserData({});
            }
        }
        
        fetch_user_profile();
    }, [])

    return (
        <>
            { userData ?
                <UserForm data={userData} /> : <></>
            }
        </>
    )
}

export default UserProfile;