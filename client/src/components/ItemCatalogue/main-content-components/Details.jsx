import React, { useContext, useEffect, useState } from 'react';
import SelectedAssetContext from '../../../SelectedAssetContext';
import axios from 'axios';
import { Input, Button } from '@chakra-ui/react';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';


function Details() {
  const { selectedAsset, setSelectedAsset, addingNewAsset, setAddingNewAsset, setItems } = useContext(SelectedAssetContext);
  const [assetDetails, setAssetDetails] = useState({});
  const [newItem, setNewItem] = useState({ itemCode: '', itemName: '', description: '' })
  const [assetCodeField, setAssetCodeField] = useState('')
  const [assetNameField, setAssetNameField] = useState('')
  const [descriptionField, setDescriptionField] = useState('')

  const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': {
      color: '#e6190a', // Change the color of the label
    },
    '& .MuiInputBase-input': {
      color: '#e6190a', // Change the color of the input text
    },
  });

  // useEffect(() => {
  //   if (selectedAsset) {
  //     axios.get(`http://localhost:3000/get-category-list/${selectedAsset.item_code}`)
  //       .then(response => {
  //         setAssetDetails(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching asset details:', error);
  //       });
  //   }
  // }, [selectedAsset]);
  useEffect(() => {
    if (selectedAsset && selectedAsset.item_code) {
      console.log(`Fetching details for item code: ${selectedAsset.item_code}`);
      axios.get(`http://localhost:3000/get-category-list/${selectedAsset.item_code}`)
        .then(response => {
          setAssetDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching asset details:', error);
        });
    } else {
      console.log('selectedAsset or item_code is undefined');
    }
  }, [selectedAsset]);


  const handleInputChange = (e) => {
    setNewItem(prevAsset => ({ ...prevAsset, [e.target.name]: e.target.value }));
  };

  const handleAddAsset = () => {
    axios.post('http://localhost:3000/add-category', newItem)
      .then(response => {
        setItems(prevAssets => [response.data, ...prevAssets]);
        setNewItem({ itemCode: '', itemName: '', description: '' }); // Clear the input fields
        setAddingNewAsset(false); // Hide the input fields
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  const handleCancelAsset = () => {
    setAddingNewAsset(false)
  }

  // Check if selectedAsset is not null before rendering its properties
  return (
    <div className='details-style'>
      {addingNewAsset ? (
        <>
          <div>
            <h2>Item Info</h2>
          </div>
          <div className='input-details-style'>
            <CustomTextField id="standard-basic" label="Item Code" variant="standard" name="itemCode" value={newItem.itemCode} onChange={handleInputChange} fullWidth />
            <CustomTextField id="standard-basic" label="Item Name" variant="standard" name="itemName" value={newItem.itemName} onChange={handleInputChange} fullWidth />
            <CustomTextField id="standard-basic" label="Description" variant="standard" name="description" value={newItem.description} onChange={handleInputChange} fullWidth />
            <div style={{ marginTop: "20px" }}>
              {/*<Button colorScheme="red" mr={3} onClick={handleAddAsset}>
                Add
      </Button> */}
              <Button colorScheme='teal' onClick={handleCancelAsset}>Cancel</Button>
            </div>
          </div>
          {/* Add more input fields as needed */}
        </>
      ) : (
        <>
          {selectedAsset && (
            <>
              <h2 style={{ marginTop: "-10px" }}>Item Details</h2>
              <hr />
              <div className='asset-details-style'>
                <p>Item Code: {selectedAsset.item_code}</p>
                <p>Item Name: {selectedAsset.item_name}</p>
                {/* <p>Category: {assetDetails.Category}</p> */}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Details;
