import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddButton from './reusable-assets/AddButton';

const UserForm = () => {
 const [name, setName] = useState('');
 const [labelName, setLabelName] = useState('');

  useEffect(() => {
    const fetchLabelName = async () => {
      try {
        const response = await axios.get('http://localhost:3000/label');
        setLabelName(response.data.name);
      } catch (error) {
        console.error('Error fetching label name:', error);
      }
    };
    fetchLabelName();
  }, []);

 const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name };
    // Call the backend API to store the user's name
    await axios.post('http://localhost:3000/users', userData);
    // Optionally, clear the input field
    setName('');
 };

 return (
    <form onSubmit={handleSubmit} className='userform-component-styles'>
      <label>{labelName}</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <AddButton />
    </form>
 );
};

export default UserForm;
