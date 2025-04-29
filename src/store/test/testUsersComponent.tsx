// TestUsersComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/users/usersSlice';
import { RootState, AppDispatch } from '../store';

const TestUsersComponent = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);
    const status = useSelector((state: RootState) => state.users.status);
    const error = useSelector((state: RootState) => state.users.error);

    useEffect(() => {
        console.log('Dispatching getUsers');
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        console.log('Users:', users);
        console.log('Status:', status);
        console.log('Error:', error);
    }, [users, status, error]);

    return (
        <div>
            <h1>Users List</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.email}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestUsersComponent;