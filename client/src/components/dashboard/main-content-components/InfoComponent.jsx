import React, { useState, useContext, useEffect } from 'react'
import SelectedAssetContext from '../../../SelectedAssetContext';
import axios from 'axios';
import { Input, Button, RadioGroup, Radio } from '@chakra-ui/react';


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

  const handleInputChange = (e) => {
    setNewAsset(prevAsset => ({ ...prevAsset, [e.target.name]: e.target.value }));
  }

  const handleAddAsset = () => {
    // Implement the logic to add the new asset
    // This could involve making an API call to your backend
    setAddingNewAsset(false);
    setNewAsset({ assetType: '', assetCategory: '', movable: 'movable' }); // Clear the input fields
  };

  const handleCancelAsset = () => {
    setAddingNewAsset(false)
    // setNewAsset(false)
    // Reset the newAsset state to its initial values
    setNewAsset({ assetType: '', assetCategory: '', description: '', movable: 'movable' });
  }

  const handleMovableChange = (value) => {
    setNewAsset(prevAsset => ({ ...prevAsset, movable: value }));
  }

  return (
    <div>
    <div className='details-style' style={{ overflow: 'auto', maxHeight: '400px' }}>
      <h2>Asset Classifications</h2>
      <hr />
      {/* <div className='info-details-style'>
        <Input placeholder="Asset Type" name="assetType" value={newAsset.assetType} onChange={handleInputChange} />
        <Input placeholder="Asset Category" name="assetCategory" value={newAsset.assetCategory} onChange={handleInputChange} mt={4} />
        <RadioGroup onChange={(e) => handleMovableChange(e.target.value)} value={newAsset.movable} mt={4} display="flex" flexDirection="row" gap="10px">
          <Radio value="movable">Movable</Radio>
          <Radio value="non-movable">Non-Movable</Radio>
        </RadioGroup>
        <div style={{ marginTop: "20px" }}>
          <Button colorScheme="red" mr={3} onClick={handleAddAsset}>
            Add
          </Button>
          <Button onClick={handleCancelAsset}>Cancel</Button>
        </div>
      </div>
      <div className='info-details-style'>
        <Input placeholder="Asset Type" name="assetType" value={newAsset.assetType} onChange={handleInputChange} />
        <Input placeholder="Asset Category" name="assetCategory" value={newAsset.assetCategory} onChange={handleInputChange} mt={4} />
        <RadioGroup onChange={handleMovableChange} value={newAsset.movable} mt={4} display="flex" flexDirection="row" gap="10px">
          <Radio value="movable">Movable</Radio>
          <Radio value="non-movable">Non-Movable</Radio>
        </RadioGroup>

        <div style={{ marginTop: "20px" }}>
          <Button colorScheme="red" mr={3} onClick={handleAddAsset}>
            Add
          </Button>
          <Button onClick={handleCancelAsset}>Cancel</Button>
        </div>
      </div> */}
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in ante metus dictum at tempor commodo. Nunc id cursus metus aliquam eleifend mi. Amet aliquam id diam maecenas. Vitae nunc sed velit dignissim sodales ut eu sem.</p>
      <div>
      <div className='details-style' style={{ overflow: 'auto', maxHeight: '400px' }}>
      <h2>Asset Classifications</h2>
      <hr />
      {/* <div className='info-details-style'>
        <Input placeholder="Asset Type" name="assetType" value={newAsset.assetType} onChange={handleInputChange} />
        <Input placeholder="Asset Category" name="assetCategory" value={newAsset.assetCategory} onChange={handleInputChange} mt={4} />
        <RadioGroup onChange={(e) => handleMovableChange(e.target.value)} value={newAsset.movable} mt={4} display="flex" flexDirection="row" gap="10px">
          <Radio value="movable">Movable</Radio>
          <Radio value="non-movable">Non-Movable</Radio>
        </RadioGroup>
        <div style={{ marginTop: "20px" }}>
          <Button colorScheme="red" mr={3} onClick={handleAddAsset}>
            Add
          </Button>
          <Button onClick={handleCancelAsset}>Cancel</Button>
        </div>
      </div>
      <div className='info-details-style'>
        <Input placeholder="Asset Type" name="assetType" value={newAsset.assetType} onChange={handleInputChange} />
        <Input placeholder="Asset Category" name="assetCategory" value={newAsset.assetCategory} onChange={handleInputChange} mt={4} />
        <RadioGroup onChange={handleMovableChange} value={newAsset.movable} mt={4} display="flex" flexDirection="row" gap="10px">
          <Radio value="movable">Movable</Radio>
          <Radio value="non-movable">Non-Movable</Radio>
        </RadioGroup>

        <div style={{ marginTop: "20px" }}>
          <Button colorScheme="red" mr={3} onClick={handleAddAsset}>
            Add
          </Button>
          <Button onClick={handleCancelAsset}>Cancel</Button>
        </div>
      </div> */}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in ante metus dictum at tempor commodo. Nunc id cursus metus aliquam eleifend mi. Amet aliquam id diam maecenas. Vitae nunc sed velit dignissim sodales ut eu sem.</p>
    </div>
    <div className='details-style' style={{ overflow: 'auto', maxHeight: '400px' }}>
      <h2>Asset Classifications</h2>
      <hr />
      {/* <div className='info-details-style'>
        <Input placeholder="Asset Type" name="assetType" value={newAsset.assetType} onChange={handleInputChange} />
        <Input placeholder="Asset Category" name="assetCategory" value={newAsset.assetCategory} onChange={handleInputChange} mt={4} />
        <RadioGroup onChange={(e) => handleMovableChange(e.target.value)} value={newAsset.movable} mt={4} display="flex" flexDirection="row" gap="10px">
          <Radio value="movable">Movable</Radio>
          <Radio value="non-movable">Non-Movable</Radio>
        </RadioGroup>
        <div style={{ marginTop: "20px" }}>
          <Button colorScheme="red" mr={3} onClick={handleAddAsset}>
            Add
          </Button>
          <Button onClick={handleCancelAsset}>Cancel</Button>
        </div>
      </div>
      <div className='info-details-style'>
        <Input placeholder="Asset Type" name="assetType" value={newAsset.assetType} onChange={handleInputChange} />
        <Input placeholder="Asset Category" name="assetCategory" value={newAsset.assetCategory} onChange={handleInputChange} mt={4} />
        <RadioGroup onChange={handleMovableChange} value={newAsset.movable} mt={4} display="flex" flexDirection="row" gap="10px">
          <Radio value="movable">Movable</Radio>
          <Radio value="non-movable">Non-Movable</Radio>
        </RadioGroup>

        <div style={{ marginTop: "20px" }}>
          <Button colorScheme="red" mr={3} onClick={handleAddAsset}>
            Add
          </Button>
          <Button onClick={handleCancelAsset}>Cancel</Button>
        </div>
      </div> */}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in ante metus dictum at tempor commodo. Nunc id cursus metus aliquam eleifend mi. Amet aliquam id diam maecenas. Vitae nunc sed velit dignissim sodales ut eu sem.</p>
    </div>
      </div>
    </div>
  )
}

export default InfoComponent