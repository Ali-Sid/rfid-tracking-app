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
            <h3>{data.itemName}</h3>
            <p>{data.itemCode}</p>
            <p>{data.categoryCode}</p>
            <p>{data.timestamp}</p>
        </div>
    )
}

export default DisplayData