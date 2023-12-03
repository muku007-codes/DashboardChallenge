import { useEffect, useState } from "react";
// import UserApi from "./UserApi.js";
import DashHeader from "../src/components/DashHeader";
import Pagination from "./components/Pagination.jsx";

function App() {
  const [users, setUsers] = useState([]);// User details

  // uE forload the api data and pass to the users
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [filteredUsers, setFilteredUsers] = useState([]); // Contains the filtered users

  const [searchTerm, setSearchTerm] = useState(""); // Contains the search bar characters
  const [usersLength, setUserLength] = useState(users.length); // For users length

  const [selectAllChecked, setSelectAllChecked] = useState(false); //

  const [editing, setEditing] = useState(false); // Edit the user informations
  const [currentUser, setCurrentUser] = useState();
  const [selectedArr, setSelectedArr] = useState([]); // Contains selected users using checkbox

  const [currentPage, setCurrentPage] = useState(1); // For pagination it stores the current page

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setEditing(false);
    setSelectAllChecked(false);
  };

  function checkUser(id) {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, checked: !user.checked } : user
    );
    setUsers(updatedUsers);
  }

  // For Debugging
  // useEffect(() => {
  //   console.log(selectedArr);
  // }, [selectedArr]);

  useEffect(() => {
      // console.log(selectedArr);
      setSelectAllChecked(false);
    }, [currentPage,searchTerm]);


  useEffect(() => {
    setUserLength(users.length);
    const select = [];
    users.map((user) => {
      if (user.checked == true) select.push(user.id);
    });
    setSelectedArr(select);
  }, [users, setUserLength]);

  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
    setUserLength(results.length);
  }, [users, searchTerm]);

  ///////////////////////////////////////////////////////////////////////////
  function handleSearch(event) {
      setSearchTerm(event.target.value);
  }

  function deleteAll() {
    const updatedUsers = users.filter((user) => !selectedArr.includes(user.id));
    setUsers(updatedUsers);
    setSelectedArr([]); // Clear the selectedArr after deletion
    setSelectAllChecked(false); // When all selected are deleted then checkBox=off
  }

  return (
    <>
      <h1>Admin Dashboard</h1><a href="http://" target="_blank" rel="noopener noreferrer"></a>
      <div className="head-input">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="delete-btn" onClick={deleteAll}>
          Delete Selected
        </button>
        </div>
      <table className="user-table">
        <DashHeader
          users={users}
          setUsers={setUsers}
          setSelectedArr={setSelectedArr}
          currentPage={currentPage}
          selectAllChecked={selectAllChecked}
          setSelectAllChecked={setSelectAllChecked}
        />
        <tbody>
          {filteredUsers
            .slice((currentPage - 1) * 10, 10 * currentPage)
            .map((user) => (
              <tr key={user.id} className={user.checked && "selected"} >
                <td>
                  <input
                    type="checkbox"
                    checked={user.checked || false}
                    onChange={() => checkUser(user.id)}
                  />
                </td>
                <td>
                  {editing && currentUser.id === user.id ? (
                    <input
                      type="text"
                      value={currentUser.name}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          email: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, role: e.target.value })
                      }
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editing && currentUser.id === user.id ? (
                    <button
                      className="edit-btn"
                      onClick={() => updateUser(currentUser.id, currentUser)}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => editUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="page-section">
        <Pagination
          len={usersLength}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default App;
