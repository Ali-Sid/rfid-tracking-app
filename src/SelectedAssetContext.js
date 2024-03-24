// SelectedAssetContext.js
import React from 'react';

const SelectedAssetContext = React.createContext();

export const SelectedAssetProvider = SelectedAssetContext.Provider;
export const SelectedAssetConsumer = SelectedAssetContext.Consumer;;


export default SelectedAssetContext;
