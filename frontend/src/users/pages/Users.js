import React, { useState, useEffect } from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        var status_code;
        await fetch("http://localhost:9000/users", requestOptions)
            .then(response => {
                status_code = response.status;
                return response.json()
            })
            .then(result => {
                if (status_code == 200) {
                    console.log(result)
                    setUsers(result.users);
                }
            })
            .catch(error => console.log('error', error));
    }, [])


    // const USERS = [
    //     {
    //         id: '01', 
    //         name: 'Woofi', 
    //         image: 'https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_960_720.jpg', 
    //         places: 1
    //     },
    //     {
    //         id: '02', 
    //         name: 'Unicorni', 
    //         image: 'https://cdn.pixabay.com/photo/2021/02/20/02/58/unicorn-6032086_960_720.jpg', 
    //         places: 2
    //     },
    //     {
    //         id: '03', 
    //         name: 'Kitty', 
    //         image: 'https://image.freepik.com/vektoren-kostenlos/netter-katzenschlafkarikatur-lokalisiert-auf-schwarzem-hintergrund_194871-194.jpg', 
    //         places: 3
    //     }
    // ];
    return <UsersList items={users} />
}

export default Users;