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

function Details() {
  const { selectedAsset, setSelectedAsset, addingNewAsset, setAddingNewAsset, newAsset, setNewAsset } = useContext(SelectedAssetContext);
  const [assetDetails, setAssetDetails] = useState({});

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
            <Input placeholder="Asset Code" name="assetCode" value={newAsset.assetCode} onChange={handleInputChange} />
            <Input placeholder="Asset Name" name="assetName" value={newAsset.assetName} onChange={handleInputChange} mt={4} />
            <Input placeholder="Description" name="assetdescription" value={newAsset.description} onChange={handleInputChange} mt={4} />
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
              <h2>Asset Details</h2>
              <p>Asset Code: {selectedAsset.asset_code}</p>
              <p>Asset Name: {selectedAsset.asset_name}</p>
              {/* <p>Category: {assetDetails.Category}</p> */}
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
