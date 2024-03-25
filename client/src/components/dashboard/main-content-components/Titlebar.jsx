import React, { useContext, useEffect, useState } from 'react'
import EditButton from '../../reusable-assets/EditButton'
import SelectedAssetContext from '../../../SelectedAssetContext';
import axios from 'axios';

function Titlebar() {

  const { selectedAsset } = useContext(SelectedAssetContext);
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

  if (!selectedAsset) {
    return <div>Item Details</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <div style={{ width: "50%" }} className='title-bar'>{selectedAsset.asset_code} | {selectedAsset.asset_name}</div>
      <div style={{ display: "flex", flexDirection: "row", width: "50%", justifyContent: "right", paddingRight: "15px" }}><EditButton /></div>
    </div>
  )
}

export default Titlebar