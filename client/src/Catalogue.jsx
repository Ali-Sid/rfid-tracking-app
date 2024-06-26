import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/ItemCatalogue/Dashboard';
import Navbar from './components/Navbar';

const Catalogue = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ height: "5%", display: "flex", flexDirection: "row", alignItems: "center" }}><Navbar toggleSidebar={toggleSidebar} /></div>
      <div style={{ display: "flex", flexDirection: "row", width: "100vw", height: "95%" }}>
        <div style={{ width: isSidebarOpen ? "16.5%" : "4%", transition: "width 0.3s ease" }}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div style={{ width: isSidebarOpen ? "100%" : "100%", transition: "width 0.3s ease" }}>
          <Dashboard />
        </div>
      </div>
    </div>


  );
}

export default Catalogue;
