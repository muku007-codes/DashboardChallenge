import { useState } from 'react';
import UserTable from './components/UserTable'
import UserApi from './UserApi.js'
import DashHeader from "../src/components/DashHeader";

function App() {

  // const initialFormState = { id: null, name: '', email: '', memberType: '' };
  const [users, setUsers] = useState(UserApi);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  let pageLength = 10;
  const [currentPage, setCurrentPage] = useState(1);


  const editUser = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, email: user.email, role: user.role });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setEditing(false);
  };

  
  // let temp = 
  
  return (
    < >
      <h2>User Table</h2>
      <table className="user-table">
      <DashHeader/>
        <tbody>
        
          {users.slice(0, 10).map(user => (
            <tr key={user.id}>
              <td><input type="checkbox" /></td>
              <td>
                {editing && currentUser.id === user.id ? (
                  <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editing && currentUser.id === user.id ? (
                  <input
                    type="text"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editing && currentUser.id === user.id ? (
                  <input
                    type="text"
                    value={currentUser.role}
                    onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editing && currentUser.id === user.id ? (
                  <button className='edit-btn' onClick={() => updateUser(currentUser.id, currentUser)}>Save</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => editUser(user)}>Edit</button>
                    <button className='delete-btn' onClick={() => deleteUser(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </>
  )
}

export default App
