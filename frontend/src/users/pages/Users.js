import React, { useState, useEffect } from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const [users, setUsers] = useState([]);

    const fetch_all_users = async () => {
        let token = localStorage.getItem("logged_in_token");
        if (token) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            var status_code;
            await fetch("http://localhost:9000/users", requestOptions)
            .then(response => {
                status_code = response.status;
                return response.json()
            })
            .then(result => {
                if (status_code === 200) {
                    // console.log(result)
                    setUsers(result.users);
                }
            })
            .catch(error => console.log('error', error));
        }
    }

    useEffect(() => {
        fetch_all_users();
    }, [])

    return <UsersList items={users} />
}

export default Users;