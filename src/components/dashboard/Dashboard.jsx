import { useState } from "react";
import { SelectedAssetProvider } from "../../SelectedAssetContext";
import ListPanel from "./ListPanel"
import MainContent from "./MainContent"

const Dashboard = () => {

    const [selectedAsset, setSelectedAsset] = useState(null);
    const [addingNewAsset, setAddingNewAsset] = useState(false);
    const [creatingNewAsset, setCreatingNewAsset] = useState(false)
    const [newAsset, setNewAsset] = useState({ assetCode: '', assetName: '' });

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", overflow: "hidden" }}>
            <SelectedAssetProvider value={{ selectedAsset, setSelectedAsset, addingNewAsset, setAddingNewAsset, newAsset, setNewAsset }} >
                <div style={{ width: "70%", overflow: "auto" }}><ListPanel /></div>
                <div style={{ width: "30%", overflow: "auto" }}><MainContent /></div>
            </SelectedAssetProvider>
        </div>
    )
}

export default Dashboard