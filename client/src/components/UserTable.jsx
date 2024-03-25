// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     Input,
//     Button,
//     HStack,
//   } from '@chakra-ui/react';

// const UserTable = () => {
//     const [users, setUsers] = useState([]);
//     const [editedName, setEditedName] = useState('');
//     const [editUserId, setEditUserId] = useState(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             const response = await axios.get('http://localhost:3000/users');
//             setUsers(response.data);
//         };

//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         // Reset editUserId when users state changes
//         setEditUserId(null);
//     }, [users]);

//     const handleEdit = (id, name) => {
//         setEditUserId(id);
//         setEditedName(name);
//     };

//     const handleSave = async (id) => {
//         // Send edited name to the backend to update the user
//         try {
//             await axios.put(`http://localhost:3000/users/${id}`, { name: editedName });
//             // Update user name in the local state
//             setUsers(users.map(user => (user.id === id ? { ...user, name: editedName } : user)));
//             console.log(`User ${id} updated successfully`);
//         } catch (error) {
//             console.error('Error updating user:', error);
//         } finally {
//             // Reset editUserId after saving
//             setEditUserId(null);
//             setEditedName('');
//         }
//     };

//     // const handleSave = async (id) => {
//     //     try {
//     //       const inputElement = document.querySelector(`input[data-id="${id}"]`);
//     //       const newName = inputElement ? inputElement.value : '';

//     //       await axios.put(`http://localhost:3000/users/${id}`, { name: newName });

//     //       setUsers(users.map(user => (user.id === id ? { ...user, name: newName } : user)));
//     //       console.log(`User ${id} updated successfully`);
//     //     } catch (error) {
//     //       console.error('Error updating user:', error);
//     //     } finally {
//     //       setEditUserId(null);
//     //     }
//     //   };

//     const handleDelete = async (id) => {
//         // Implement logic to delete user
//         try {
//             await axios.delete(`http://localhost:3000/users/${id}`);
//             setUsers(users.filter(user => user.id !== id));
//             console.log(`User ${id} deleted successfully`);
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     return (
//         <Table variant="simple">
//       <Thead>
//         <Tr>
//           <Th>ID</Th>
//           <Th>Name</Th>
//           <Th>Actions</Th>
//         </Tr>
//       </Thead>
//       <Tbody>
//         {users.map((user) => (
//           <Tr key={user.id}>
//             <Td>{user.id}</Td>
//             <Td>
//               {editUserId === user.id ? (
//                 <Input
//                   type="text"
//                   value={editedName}
//                   onChange={(e) => setEditedName(e.target.value)}
//                 />
//               ) : (
//                 user.name
//               )}
//             </Td>
//             <Td>
//               {editUserId === user.id ? (
//                 <Button style={{backgroundColor: "red", color: "#fff"}} onClick={() => handleSave(user.id)}>Save</Button>
//               ) : (
//                 <HStack spacing={4}>
//                   <button onClick={() => handleEdit(user.id, user.name)}>Edit</button>
//                   <button onClick={() => handleDelete(user.id)}>Delete</button>
//                 </HStack>
//               )}
//             </Td>
//           </Tr>
//         ))}
//       </Tbody>
//     </Table>
//     );
// };

// export default UserTable;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  HStack,
} from '@chakra-ui/react';
import SaveButton from './reusable-assets/SaveButton';
import DeleteButton from './reusable-assets/DeleteButton';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedName, setEditedName] = useState('');

  // const buttonStyles = {
  //   color: "red",
  //   border: "1px solid red",
  //   backgroundColor: "#fff"
  // }

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setEditedName(user.name);
  };

  const handleSave = async () => {
    // if (!selectedUser) return;
    try {
      await axios.put(`http://localhost:3000/users/${selectedUser.id}`, { name: editedName });
      setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, name: editedName } : user)));
      console.log(`User ${selectedUser.id} updated successfully`);
      setSelectedUser(null); // Reset selected user after saving
      setEditedName('');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await axios.delete(`http://localhost:3000/users/${selectedUser.id}`);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      console.log(`User ${selectedUser.id} deleted successfully`);
      setSelectedUser(null); // Reset selected user after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Table variant="simple">
      {users.map((user) => (
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>
            {selectedUser && selectedUser.id === user.id ? (
              <HStack spacing={4}>
                <SaveButton onClick={handleSave}/>
                <DeleteButton onClick={handleDelete}/>
              </HStack>
            ) : null}
          </Th>
        </Tr>
      </Thead>
      ))}
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id} onClick={() => handleSelectUser(user)}>
            <Td>{user.id}</Td>
            <Td>
              {selectedUser && selectedUser.id === user.id ? (
                <Input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                user.name
              )}
            </Td>
            <Td></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UserTable;

