import React from 'react';
import './UserList.css';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

const UsersList = props => {
    if (props.items.length === 0)
        return (
            <Card>
                <h2>No users found!</h2>
            </Card>
        );
    return <ul className="usersList">
        {props.items.map(user => (
            <UserItem 
                key={user.id}
                id={user.id} 
                image={user.image} 
                name={user.name} 
                placeCount={user.places}
            />
        ))}
    </ul>
};

export default UsersList;