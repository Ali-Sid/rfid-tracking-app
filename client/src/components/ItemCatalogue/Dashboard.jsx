import { useState } from "react";
import { SelectedAssetProvider } from "../../SelectedAssetContext";
import ListPanel from "./ListPanel"
import MainContent from "./MainContent"
import { CatalogueProvider } from "../../CatalogueContext";

const Dashboard = () => {

    const [selectedAsset, setSelectedAsset] = useState(null);
    const [addingNewAsset, setAddingNewAsset] = useState(false);
    const [creatingNewAsset, setCreatingNewAsset] = useState(false)
    const [newItem, setNewItem] = useState({ itemCode: '', itemName: '' });

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", overflow: "hidden", gap: "10px" }}>
            <CatalogueProvider value={{ selectedAsset, setSelectedAsset, addingNewAsset, setAddingNewAsset, newItem, setNewItem }} >
                <div style={{ width: "70%" }}><ListPanel /></div>
                <div style={{ width: "30%" }}><MainContent /></div>
            </CatalogueProvider>
        </div>
    )
}

export default Dashboard