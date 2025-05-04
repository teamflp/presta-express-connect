
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';

function TestUsersComponent() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await dispatch(fetchUsers());
        setUsers(result.payload);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    loadUsers();
  }, [dispatch]);

  return (
    <div>
      <h2>Users List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
}

export default TestUsersComponent;
