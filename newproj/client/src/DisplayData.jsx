import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const DisplayData = () => {
    const [data, setData] = useState(null);
    const { itemCode } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/category-list/${itemCode}`);
                const newData = await response.json();
                console.log('Received data:', newData); // Log received data
                setData(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [itemCode]); // Dependency array to refetch data when itemCode changes

    if (!data) {
        return <div>Loading...</div>;
    }
    if (data.error) {
        return <div>Error: {data.error}</div>;
    }

    return (
        <div>
            <h3>{data[0].ItemName} - Category List</h3>
            <Table sx={{ boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Category Code</TableCell>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Event Timestamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((entry) => (
                        <TableRow key={entry.id}>
                            <TableCell>{entry.CategoryCode}</TableCell>
                            <TableCell>{entry.ItemName}</TableCell>
                            <TableCell>{entry.event_timestamp}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default DisplayData