import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
// import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { Select, MenuItem, FormControl, InputLabel, Box, Button, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, DialogActions, TextField, DialogContent, DialogTitle, Dialog, IconButton, Typography, Divider, Input, TextareaAutosize, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const theme = createTheme({
  palette: {
    primary: {
      main: "#F70F0F", // Set the primary color to red
    },
  },
});

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('item_id');
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [newItem, setNewItem] = useState({ itemCode: '', itemName: '' });
  const [categoryList, setCategoryList] = useState('');
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [numberOfEntries, setNumberOfEntries] = useState(1);
  const [price, setPrice] = useState('')
  const [dateInput, setDateInput] = useState(null)
  const [description, setDescription] = useState('')
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState({});

  const handleRowClick = (itemCode) => {
    navigate(`/category-list/${itemCode}`);
  };

  const handleOpen = (item) => {
    setSelectedItem(item);
    setItemCode(item.item_code); // Set item code based on the selected row's item_code
    setItemName(item.item_name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateEntries = (itemCode, itemName, numberOfEntries) => {
    // const baseCode = itemCode.split('-')[0];
    const entries = [];

    for (let i = 1; i <= numberOfEntries; i++) {
      // const categoryCode = `${baseCode}-${i}`;
      let categoryCode = i.toString().padStart(6, '0');
      // numbers.push(paddedNumber);
      const timestamp = new Date().toISOString();
      entries.push({ itemCode, itemName, categoryCode, timestamp });
    }

    return entries;
  };

  const sendEntriesToBackend = async (entries) => {
    try {
      const response = await axios.post('http://localhost:3001/category-list', entries);
      console.log('Entries added successfully:', response.data);
    } catch (error) {
      console.error('Error adding entries:', error);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const entries = generateEntries(itemCode, itemName, numberOfEntries);
    sendEntriesToBackend(entries);
    handleClose();
  };

  useEffect(() => {

    axios.get('http://localhost:3001/label')
      .then(response => {
        setTitle(response.data.name);
      })
      .catch(error => {
        console.error('Error fetching title:', error);
      });

    const fetchItems = async () => {
      const response = await fetch('http://localhost:3001/item-list');
      const data = await response.json();
      setItems(data);
    };

    fetchItems();

    if (itemCode) {
      axios.get('http://localhost:3001/category-list')
        .then(response => {
          setCategoryList(response.data);
        })
        .catch(error => {
          console.error('Error fetching category list:', error);
        });
    }

    // Fetch count for the selected item code
    if (itemCode) {
      axios.get(`http://localhost:3001/item-count/${itemCode}`)
        .then(response => {
          // Assuming you want to display the count somewhere in your UI
          // You might want to set it in a state variable and display it in your component
          setItemCount(response.data.count);
          console.log('Item count:', response.data.count);
        })
        .catch(error => {
          console.error('Error fetching item count:', error);
        });
    }
  }, [itemCode]);

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "itemCode") setItemCode(value);
    if (name === "itemName") setItemName(value);
    if (name === "numberOfEntries") setNumberOfEntries(parseInt(value));
    if (name === "unitPrice") setPrice(parseInt(value));
    if (name === "dateInput") setDateInput(value);
    if (name === "description") setDescription(value);
  };

  const handleDateChange = (date) => {
    setDateInput(date);
  };

  const createSortHandle = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortAssets = (items, orderBy, order) => {
    return [...items].sort((a, b) => {
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedAssets = sortAssets(items, orderBy, order);

  const handleCategoryUpdate = (id, updatedDetails) => {
    axios.put(`http://localhost:3001/category-list/${id}`, updatedDetails)
      .then(response => {
        console.log('Category updated successfully');
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };

  return (
    <>
      <Box className='panel-style hide-scrollbar' overflowY="auto" minH="100vh" sx={{
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'gray.200',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.500',
          borderRadius: '10px',
        },
      }}
        boxSizing='borderBox'>
        <div>
          <h2>Item Master</h2>
        </div>
        <div style={{ height: "100%", width: "100%", maxHeight: "calc(100vh - 150px)", overflowY: "auto", padding: "20px" }}>
          <Table sx={{ boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'item_id'}
                    direction={orderBy === 'item_id' ? order : 'asc'}
                    onClick={createSortHandle('item_id')}
                  >
                    #
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'item_code'}
                    direction={orderBy === 'item_code' ? order : 'asc'}
                    onClick={createSortHandle('item_code')}
                  >
                    Item Code
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'item_name'}
                    direction={orderBy === 'item_name' ? order : 'asc'}
                    onClick={createSortHandle('item_name')}
                  >
                    Item Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'item_create_date'}
                    direction={orderBy === 'item_create_date' ? order : 'asc'}
                    onClick={createSortHandle('item_create_date')}
                  >
                    Created
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'item_create_date'}
                    direction={orderBy === 'item_create_date' ? order : 'asc'}
                    onClick={createSortHandle('item_create_date')}
                  >
                    Total Count
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAssets.map((item, index) => (
                <TableRow key={index} onClick={() => handleRowClick(item.item_code)} style={{
                  backgroundColor: selectedRowId === item.item_id ? '#f5f5f5' : 'transparent',
                  color: selectedRowId === item.item_id ? 'white' : 'black',
                  cursor: 'pointer'
                }}
                >
                  <TableCell>{item.item_id}</TableCell>
                  <TableCell>{item.item_code}</TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{formatDate(item.item_create_date)}</TableCell>
                  <TableCell>{itemCount[item.item_code] || 0}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleOpen(item) }}>
                      <PlaylistAddIcon sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Create New Entries</DialogTitle> */}
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h4" color='#1B1A1A'>
              {itemName}
            </Typography>
            {/* Display item code as a smaller text below the name */}
            <Typography variant="subtitle1" color='red' gutterBottom>
              {itemCode}
            </Typography>
          </div>
          <Divider sx={{ mb: "5px" }} />
          <Typography variant='h6'>Add To Catalogue</Typography>
          <Input sx={{ mt: "10px", mb: "10px" }} fullWidth variant='outline' type='date' /><br />
          <TextField
            autoFocus
            margin="dense"
            label="Unit Price"
            type="number"
            fullWidth
            name="unitPrice"
            value={price}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Barcode"
            type="number"
            fullWidth
            name="barcode"
            // value={price}
            onChange={handleChange}
          />
          <br />
          {/* <DatePicker
            label="Controlled picker"
            // value={value}
            // onChange={(newValue) => setValue(newValue)}
          /> */}
          {/* <TextareaAutosize
            aria-label="minimum height"
            minRows={3} // Set the minimum number of rows
            placeholder="Type your text here..."
          // Other props as needed
          /> */}
          {/* <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="textfield"
            fullWidth
            name="description"
            value={description}
            onChange={handleChange}
          /> */}
          <textarea placeholder="Description"
            type="textfield"
            name="description"
            value={description}
            onChange={handleChange}
            style={{ width: "95%", borderRadius: "5px", fontFamily: "inherit", color: "#000", border: "1px solid #CCC5C5", height: "80px", margin: "5px 0 0 0", padding: "10px" }}
          />
          <div style={{border: "2px solid red", borderRadius: "5px", padding: "5px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <TextField autoFocus margin='dense' label='Repeat' type='number' name='numberOfEntries' value={numberOfEntries} onChange={handleChange} />
          </div>
          <ThemeProvider theme={theme}>
            <TextField
              autoFocus
              margin="dense"
              label="Repeat"
              type="number"
              fullWidth
              name="numberOfEntries"
              value={numberOfEntries}
              onChange={handleChange}
              sx={{
                "& .MuiInputLabel-root": { color: "#F70F0F" }, // Target label for red color
                "& .MuiOutlinedInput-root": { // Target outlined input for red border
                  "& fieldset": {
                    borderColor: "#F70F0F",
                  },
                },
              }}
            />
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default App
