import React, { useState, useEffect } from 'react';
import UsersList from '../components/UsersList';
// import { get_local_user_data } from '../../shared/functions/General';
import { get_ip, device_type } from '../../shared/components/localhost';

const Users = () => {
    const [users, setUsers] = useState([]);
    // const [localUser, setlocalUser] = useState(get_local_user_data())

    useEffect(() => {
        const fetch_all_users = async () => {
            let token = localStorage.getItem("logged_in_token");
            // let manager_id = localUser.id ? localUser.id : '';
            // console.log(`===> Local user id new: ${manager_id}`);
            
            if (token) {
		let manager_id = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).id : '';
                var myHeaders = new Headers();
                // myHeaders.append("manager_id", localUser._id ? localUser._id : '');
                myHeaders.append("manager_id", manager_id);
                myHeaders.append("Authorization", `Bearer ${token}`);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
    
                var status_code;
                await fetch(`${get_ip(device_type)}/users/employees`, requestOptions)
                .then(response => {
                    status_code = response.status;
                    return response.json()
                })
                .then(result => {
                    if (status_code === 200) {
                        setUsers(result.users);
                    }
                })
                .catch(error => console.log('error', error));
            }
        }

        // setlocalUser(get_local_user_data());
        fetch_all_users();
    }, [])

    return <UsersList items={users} />
}

export default Users;
