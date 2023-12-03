import React, { useState } from "react";

function DashHeader({
  users,
  setUsers,
  setSelectedArr,
  currentPage,
  setSelectAllChecked,
  selectAllChecked,
}) {
  // const [selectAllChecked, setSelectAllChecked] = useState(false);

  const selectAll = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const updatedUsers = users.map((user, index) => {
      if (index >= startIndex && index < endIndex) {
        return { ...user, checked: !selectAllChecked };
      }
      return user;
    });
    setUsers(updatedUsers);

    const selectedIds = selectAllChecked
      ? []
      : users.slice(startIndex, endIndex).map((user) => user.id);
    setSelectedArr(selectedIds);

    setSelectAllChecked(!selectAllChecked);
  };

  return (
    <>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onClick={selectAll}
              checked={selectAllChecked}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
    </>
  );
}

export default DashHeader;
