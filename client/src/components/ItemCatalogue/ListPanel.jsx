import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AddButton from '../reusable-assets/AddButton'
// import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
// import SelectedAssetContext from '../../SelectedAssetContext';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, useDisclosure, useMediaQuery, Box, Flex } from '@chakra-ui/react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TextField } from '@mui/material';
import SaveButton from '../reusable-assets/SaveButton';
import CancelButton from '../reusable-assets/CancelButton';
import CatalogueContext from '../../CatalogueContext';


const ListPanel = () => {
  const { setSelectedAsset, setAddingNewAsset } = useContext(CatalogueContext);
  // const { setEditingAsset } = useContext(SelectedAssetContext);
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newItem, setNewItem] = useState({ itemCode: '', itemName: '' });
  // const [addingNewAsset, setAddingNewAsset] = useState(false)
  const [selectedAssetId, setSelectedAssetId] = useState(null); // New state to track the selected item ID
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('item_id');
  // Other state and context variables
  const [selectedRowId, setSelectedRowId] = useState(null); // New state to track the selected row ID


  const createSortHandle = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  // Sorting function
  const sortAssets = (items, orderBy, order) => {
    return [...items].sort((a, b) => {
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Use the sorting function before rendering the items
  const sortedAssets = sortAssets(items, orderBy, order);





  // Function to handle adding a new item
  const handleAddNewAsset = () => {
    setAddingNewAsset(true); // Set state to indicate a new item is being added
    onOpen()
  };

  useEffect(() => {

    axios.get('http://localhost:3000/label')
      .then(response => {
        setTitle(response.data.name); // Assuming the response is { name: 'Assets List' }
      })
      .catch(error => {
        console.error('Error fetching title:', error);
      });

    // Adjust the endpoint to fetch from the category list table
    axios.get('http://localhost:3000/get-category-list') // Use the correct endpoint
      .then(response => {
        console.log(response.data)
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching category list:', error);
      });
  }, []);

  const handleAssetClick = (item) => {
    setSelectedAsset(item);
    setSelectedRowId(item.item_id);
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddAsset = () => {
    axios.post('http://localhost:3000/item-list', newItem)
      .then(response => {
        setItems(prevAssets => [response.data, ...prevAssets]);
        window.location.reload()
        onClose();
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }



  return (
    <>
      <Box className='panel-style hide-scrollbar' overflowY="auto" minH="100vh" sx={{
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'gray.200',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.500',
          borderRadius: '10px',
        },
      }}
        // maxHeight="calc(100vh - 90px)"
        boxSizing='borderBox'>
        <div className='title-bar panel-header'>
          <h2>{title}</h2>
          <AddButton onClick={handleAddNewAsset} />

        </div>


        {/* <div className='title-bar panel-footer'>
        <h2>Footer</h2>
        <AddButton onClick={onOpen} />
      </div> */}
        <div style={{ height: "100%", width: "100%", maxHeight: "calc(100vh - 150px)", overflowY: "auto", padding: "20px" }}>
          {/* <Table variant="simple" className='panel-style-table'>
          <Thead className='panel-title'>
            <Tr color="red" style={{ width: "100%", color: "red" }}>
              <Th style={{ width: "40%" }}>Item Code</Th>
              <Th style={{ width: "60%" }}>Item Name</Th>
            </Tr>
          </Thead>
          <Tbody className='panel-body'>
            {items.map((item, index) => (
              <Tr key={index} onClick={() => handleAssetClick(item)} style={{ backgroundColor: selectedAssetId === item.id ? 'grey' : 'transparent', cursor: 'pointer' }}>
                <Td>{item.item_code}</Td>
                <Td>{item.item_name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table> */}
          <Table sx={{ boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'item_id'}
                    direction={orderBy === 'item_id' ? order : 'asc'}
                    onClick={createSortHandle('item_id')}
                  >
                    #
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'item_code'}
                    direction={orderBy === 'item_code' ? order : 'asc'}
                    onClick={createSortHandle('item_code')}
                  >
                    Item Code
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'item_name'}
                    direction={orderBy === 'item_name' ? order : 'asc'}
                    onClick={createSortHandle('item_name')}
                  >
                    Item Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'item_create_date'}
                    direction={orderBy === 'item_create_date' ? order : 'asc'}
                    onClick={createSortHandle('item_create_date')}
                  >
                    Created
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAssets.map((item, index) => (
                <TableRow key={index} onClick={() => handleAssetClick(item)} style={{
                  backgroundColor: selectedRowId === item.item_id ? '#f5f5f5' : 'transparent',
                  color: selectedRowId === item.item_id ? 'white' : 'black',
                  cursor: 'pointer'
                }}
                >
                  <TableCell>{item.item_id}</TableCell>
                  <TableCell>{item.item_code}</TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{formatDate(item.item_create_date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent border="1px" borderColor="gray.200" borderRadius="md">
          <ModalHeader>Add New Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Item Code" name="assetCode" value={newItem.assetCode} onChange={handleInputChange} />
            <Input placeholder="Item Name" name="assetName" value={newItem.assetName} onChange={handleInputChange} mt={4} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddAsset}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
        <Modal isOpen={isOpen} onClose={onClose} size="md" >
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <ModalContent border="1px" borderColor="gray.200" backgroundColor="#fff" padding="20px" borderRadius="md" w="500px" // Set width to fit content
            maxW="100%" // Set maximum width (optional)
            h="fit-content" // Set height to fit content
            mx="auto" // Center horizontally
            my="auto" // Center vertically (optional)
          >
            <ModalHeader as="h2" color="#575757">Add New Item</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody display="flex" flexDirection="column" mt={5}>
              <TextField error variant='standard' label="Item Code" name="itemCode" InputLabelProps={{ style: { color: 'grey' } }} // Default color
                sx={{
                  '& .MuiInputBase-root': { color: 'grey' }, // Default text color
                  '& label.Mui-focused': { color: 'red' }, // Focused label color
                  '& .MuiInput-underline:after': { borderBottomColor: 'red' }, // Focused underline color
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'red', // Focused border color
                    },
                  },
                  outline: "red"
                }} value={newItem.itemCode} onChange={handleInputChange} />
              <TextField error variant='standard' label="Item Name" name="itemName" InputLabelProps={{ style: { color: 'grey' } }} // Default color
                sx={{
                  '& .MuiInputBase-root': { color: 'grey' }, // Default text color
                  '& label.Mui-focused': { color: 'red' }, // Focused label color
                  '& .MuiInput-underline:after': { borderBottomColor: 'red' }, // Focused underline color
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'red', // Focused border color
                    },
                  },
                }} value={newItem.itemName} onChange={handleInputChange} mt={4} />
            </ModalBody>
            <ModalFooter mt={5} gap={5}>
              <CancelButton onClick={onClose} />
              <SaveButton colorScheme="red" mr={3} onClick={handleAddAsset} />
              {/* <AddButton variant="ghost" colorScheme="red" onClick={handleAddAsset} sx={{height: "30px"}}/> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default ListPanel;
