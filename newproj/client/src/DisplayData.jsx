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
            <table>
                <thead>
                    <tr>
                        <th>Category Code</th>
                        <th>Item Name</th>
                        <th>Event Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.CategoryCode}</td>
                            <td>{entry.ItemName}</td>
                            <td>{entry.event_timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DisplayData