// import React, { useContext, useEffect, useState } from 'react'
// import SelectedAssetContext from '../../../SelectedAssetContext';
// import axios from 'axios';
// import { Input } from '@chakra-ui/react';

// function Details() {

//   const { selectedAsset, addingNewAsset, newAsset, setNewAsset } = useContext(SelectedAssetContext);
//   const [category, setCategory] = useState('');
//   const [assetDetails, setAssetDetails] = useState({});

//   useEffect(() => {
//     if (selectedAsset) {
//       axios.get(`http://localhost:3000/asset-details/${selectedAsset.asset_code}`)
//         .then(response => {
//           setAssetDetails(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching asset details:', error);
//         });
//     }
//   }, [selectedAsset]);

//   if (!selectedAsset) {
//     return <div>No asset selected</div>;
//   }


//   const handleInputChange = (event) => {
//     setNewAsset(prevAsset => ({ ...prevAsset, [e.target.name]: e.target.value }));
//  };

//   return (
//     <div>
//       {addingNewAsset ? (
//         <>
//           <h2>Add New Asset</h2>
//           <Input placeholder="Asset Code" name="assetCode" value={newAsset.assetCode} onChange={handleInputChange} />
//           <Input placeholder="Asset Name" name="assetName" value={newAsset.assetName} onChange={handleInputChange} mt={4} />
//           {/* Add more input fields as needed */}
//         </>
//       ) : (
//         <>
//           <h2>Asset Details</h2>
//           <p>Asset Code: {selectedAsset.asset_code}</p>
//           <p>Asset Name: {selectedAsset.asset_name}</p>
//           {/* <p>Category: {assetDetails.Category}</p> */}
//         </>
//       )}
//     </div>
//   )
// }

// export default Details

import React, { useContext, useEffect, useState } from 'react';
import SelectedAssetContext from '../../../SelectedAssetContext';
import axios from 'axios';
import { Input, Button } from '@chakra-ui/react';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';


function Details() {
  const { selectedAsset, setSelectedAsset, addingNewAsset, setAddingNewAsset, newAsset, setNewAsset } = useContext(SelectedAssetContext);
  const [assetDetails, setAssetDetails] = useState({});

  const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': {
       color: '#e6190a', // Change the color of the label
    },
    '& .MuiInputBase-input': {
       color: '#e6190a', // Change the color of the input text
    },
   });

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

  const handleInputChange = (e) => {
    setNewAsset(prevAsset => ({ ...prevAsset, [e.target.name]: e.target.value }));
  };

  const handleAddAsset = () => {
    // Implement the logic to add the new asset
    // This could involve making an API call to your backend
    setNewAsset({ assetCode: '', assetName: '', description: '' }); // Clear the input fields
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
            <h2>Asset Info</h2>
          </div>
          <div className='input-details-style'>
            <CustomTextField id="standard-basic" label="Asset Code" variant="standard" name="assetCode" value={newAsset.assetCode} onChange={handleInputChange} fullWidth />
            <CustomTextField id="standard-basic" label="Asset Name" variant="standard" name="assetName" value={newAsset.assetName} onChange={handleInputChange} fullWidth />
            <CustomTextField id="standard-basic" label="Description" variant="standard" name="assetDescription" value={newAsset.assetDescription} onChange={handleInputChange} fullWidth />
            {/* <div style={{ marginTop: "20px" }}>
              <Button colorScheme="red" mr={3} onClick={handleAddAsset}>
                Add
              </Button>
              <Button onClick={handleCancelAsset}>Cancel</Button>
            </div> */}
          </div>
          {/* Add more input fields as needed */}
        </>
      ) : (
        <>
          {selectedAsset ? (
            <>
              <h2 style={{marginTop: "-10px"}}>Asset Details</h2>
              <hr />
              <div className='asset-details-style'>
              <p>Asset Code: {selectedAsset.asset_code}</p>
              <p>Asset Name: {selectedAsset.asset_name}</p>
              {/* <p>Category: {assetDetails.Category}</p> */}
              </div>
            </>
          ) : (
            <p>No asset selected</p>
          )}
        </>
      )}
    </div>
  );
}

export default Details;
