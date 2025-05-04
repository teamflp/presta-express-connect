
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';

// Define User type
interface User {
  id: number;
  name: string;
  email: string;
}

function TestUsers() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Correctly type the dispatch
    dispatch(fetchUsers() as any);
    
    // In a real app, you would use a selector instead
    // This is just for testing
    fetch('/testStore/users.json')
      .then(response => response.json())
      .then(data => setUsers(data as User[]))
      .catch(error => console.error('Error fetching users:', error));
  }, [dispatch]);

  return (
    <div>
      <h2>Test Users</h2>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default TestUsers;
