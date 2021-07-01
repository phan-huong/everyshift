import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: '01', 
            name: 'Woofi', 
            image: 'https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_960_720.jpg', 
            places: 1
        },
        {
            id: '02', 
            name: 'Unicorni', 
            image: 'https://cdn.pixabay.com/photo/2021/02/20/02/58/unicorn-6032086_960_720.jpg', 
            places: 2
        },
        {
            id: '03', 
            name: 'Kitty', 
            image: 'https://image.freepik.com/vektoren-kostenlos/netter-katzenschlafkarikatur-lokalisiert-auf-schwarzem-hintergrund_194871-194.jpg', 
            places: 3
        }
    ];
    return <UsersList items={USERS} />
}

export default Users;