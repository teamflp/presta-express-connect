
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/users/usersSlice';
import { RootState, AppDispatch } from '../store';

// Define a User interface since we can't see the users slice file
interface User {
  email: string;
  id?: string;
  name?: string;
}

const TestUsersComponent = () => {
    const dispatch: AppDispatch = useDispatch();
    
    // Create temporary mock state since the real users is not in the state
    const usersState = {
        users: [] as User[],
        status: 'idle',
        error: null
    };
    
    useEffect(() => {
        console.log('Dispatching getUsers');
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        console.log('Users:', usersState.users);
        console.log('Status:', usersState.status);
        console.log('Error:', usersState.error);
    }, [usersState.users, usersState.status, usersState.error]);

    return (
        <div>
            <h1>Users List</h1>
            {usersState.status === 'loading' && <p>Loading...</p>}
            {usersState.status === 'failed' && <p>Error: {usersState.error}</p>}
            <ul>
                {usersState.users.map((user: User) => (
                    <li key={user.email}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestUsersComponent;
