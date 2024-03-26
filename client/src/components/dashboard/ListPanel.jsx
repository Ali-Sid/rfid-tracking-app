import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AddButton from '../reusable-assets/AddButton'
// import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import SelectedAssetContext from '../../SelectedAssetContext';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, useDisclosure, useMediaQuery, Box, Flex } from '@chakra-ui/react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TextField } from '@mui/material';


const ListPanel = () => {
  const { setSelectedAsset, setAddingNewAsset } = useContext(SelectedAssetContext);
  const { setEditingAsset } = useContext(SelectedAssetContext);
  const [assets, setAssets] = useState([]);
  const [title, setTitle] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newAsset, setNewAsset] = useState({ assetCode: '', assetName: '' });
  // const [addingNewAsset, setAddingNewAsset] = useState(false)
  const [selectedAssetId, setSelectedAssetId] = useState(null); // New state to track the selected asset ID
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('asset_code');

  const createSortHandle = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  // Sorting function
  const sortAssets = (assets, orderBy, order) => {
    return [...assets].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Use the sorting function before rendering the assets
  const sortedAssets = sortAssets(assets, orderBy, order);





  // Function to handle adding a new asset
  const handleAddNewAsset = () => {
    // setAddingNewAsset(true); // Set state to indicate a new asset is being added
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

    axios.get('http://localhost:3000/asset-list')
      .then(response => {
        console.log(response.data)
        setAssets(response.data);
      })
      .catch(error => {
        console.error('Error fetching asset list:', error);
      });
  }, []);

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
  };

  const handleInputChange = (e) => {
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value });
  };

  const handleAddAsset = () => {
    axios.post('http://localhost:3000/asset-list', newAsset)
      .then(response => {
        setAssets(prevAssets => [...prevAssets, response.data]);
        onClose();
      })
      .catch(error => {
        console.error('Error adding asset:', error);
      });
  };


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
              <Th style={{ width: "40%" }}>Asset Code</Th>
              <Th style={{ width: "60%" }}>Asset Name</Th>
            </Tr>
          </Thead>
          <Tbody className='panel-body'>
            {assets.map((asset, index) => (
              <Tr key={index} onClick={() => handleAssetClick(asset)} style={{ backgroundColor: selectedAssetId === asset.id ? 'grey' : 'transparent', cursor: 'pointer' }}>
                <Td>{asset.asset_code}</Td>
                <Td>{asset.asset_name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table> */}
          <Table sx={{ boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'asset_code'}
                    direction={orderBy === 'asset_code' ? order : 'asc'}
                    onClick={createSortHandle('asset_code')}
                  >
                    Asset Code
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'asset_name'}
                    direction={orderBy === 'asset_name' ? order : 'asc'}
                    onClick={createSortHandle('asset_name')}
                  >
                    Asset Name
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAssets.map((asset, index) => (
                <TableRow key={index} onClick={() => handleAssetClick(asset)}>
                  <TableCell>{asset.asset_code}</TableCell>
                  <TableCell>{asset.asset_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent border="1px" borderColor="gray.200" borderRadius="md">
          <ModalHeader>Add New Asset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Asset Code" name="assetCode" value={newAsset.assetCode} onChange={handleInputChange} />
            <Input placeholder="Asset Name" name="assetName" value={newAsset.assetName} onChange={handleInputChange} mt={4} />
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
          <ModalContent border="1px" borderColor="gray.200" backgroundColor="#fff"  padding="20px" borderRadius="md" w="500px" // Set width to fit content
            maxW="100%" // Set maximum width (optional)
            h="fit-content" // Set height to fit content
            mx="auto" // Center horizontally
            my="auto" // Center vertically (optional)
            >
            <ModalHeader>Add New Asset</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody display="flex" flexDirection="column">
              <TextField error variant='standard' label="Asset Code" name="assetCode" InputLabelProps={{ style: { color: 'red' } }} sx={{ '& .MuiInputBase-root': { borderColor: 'red' }, outline: "red" }} value={newAsset.assetCode} onChange={handleInputChange} />
              <TextField error variant='standard' label="Asset Name" name="assetName" InputLabelProps={{ style: { color: 'red' } }} sx={{ '& .MuiInputBase-root': { borderColor: 'red' } }} value={newAsset.assetName} onChange={handleInputChange} mt={4} />
            </ModalBody>
            <ModalFooter mt={5}>
              <Button colorScheme="blue" mr={3} onClick={handleAddAsset}>
                Add
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default ListPanel;
