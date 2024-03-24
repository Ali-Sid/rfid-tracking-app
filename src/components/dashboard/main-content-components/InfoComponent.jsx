import React, { useState, useContext, useEffect } from 'react'
import SelectedAssetContext from '../../../SelectedAssetContext';
import axios from 'axios';
import { Input, Button } from '@chakra-ui/react';


function InfoComponent() {

  const { selectedAsset } = useContext(SelectedAssetContext);
  const [assetDetails, setAssetDetails] = useState('')
  const [newAsset, setNewAsset] = useState({ assetType: '', assetCategory: '', description: '' })

  useEffect(() => {
    if (selectedAsset) {
      axios.get(`http://localhost:3000/asset-details/${selectedAsset.asset_code}`)
        .then(response => {
          setAssetDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching asset details:', error);
        });
    }
  }, [selectedAsset]);

  if (!selectedAsset) {
    return <div>No asset selected</div>;
  }

  const handleInputChange = () => {
    setNewAsset(prevAsset => ({ ...prevAsset, [e.target.name]: e.target.value }));
  }

  const handleAddAsset = () => {
    // Implement the logic to add the new asset
    // This could involve making an API call to your backend
    setNewAsset({ assetType: '', assetCategory: '', description: '' }); // Clear the input fields
  };

  const handleCancelAsset = () => {
    setAddingNewAsset(false)
  }

  return (
    <div className='details-style'>
      <h2>Asset Classifications</h2>
      <div className='input-details-style'>
        <Input placeholder="Asset Type" name="assetType" value={newAsset.assetType} onChange={handleInputChange} />
        <Input placeholder="Asset Category" name="assetCategory" value={newAsset.assetCategory} onChange={handleInputChange} mt={4} />
        <Input placeholder="Description" name="assetdescription" value={newAsset.description} onChange={handleInputChange} mt={4} />
        <div style={{ marginTop: "20px" }}>
          <Button colorScheme="red" mr={3} onClick={handleAddAsset}>
            Add
          </Button>
          <Button onClick={handleCancelAsset}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default InfoComponent