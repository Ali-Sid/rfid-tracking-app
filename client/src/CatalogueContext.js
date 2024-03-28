import React from 'react';

const CatalogueContext = React.createContext();

export const CatalogueProvider = CatalogueContext.Provider;
export const CatalogueConsumer = CatalogueContext.Consumer;

export default CatalogueContext;