const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password
    database: 'mydatabase' // The name of your database
}).promise();

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');



    // Create the 'label' table if it doesn't exist
    // const createLabelTableQuery = `
    //     CREATE TABLE IF NOT EXISTS label (
    //         id INT AUTO_INCREMENT PRIMARY KEY,
    //         name VARCHAR(255) NOT NULL,
    //         short_name VARCHAR(50) NOT NULL
    //     );
    // `;

    // db.query(createLabelTableQuery, async (err, result) => {
    //     if (err) {
    //         console.error('Error creating label table:', err);
    //     } else {
    //         console.log('Label table created or already exists');
    //         // Insert name into the label table
    //         const insertLabelNameQuery = `
    //             INSERT INTO label (name, short_name) VALUES ('username', 'UN')
    //         `;
    //         try {
    //             await db.query(insertLabelNameQuery);
    //             console.log('Name inserted into label table');
    //         } catch (error) {
    //             console.error('Error inserting name into label table:', error);
    //         }
    //     }
    // });

    // Use a Promise to handle the asynchronous query execution
    new Promise((resolve, reject) => {
        db.query(createLabelTableQuery, (err, result) => {
            if (err) {
                console.error('Error creating label table:', err);
                reject(err);
            } else {
                console.log('Label table created or already exists');
                // Insert name into the label table
                const insertLabelNameQuery = `
                    INSERT INTO label (name, short_name) VALUES ('username', 'UN')
                `;
                db.query(insertLabelNameQuery, (err, result) => {
                    if (err) {
                        console.error('Error inserting name into label table:', err);
                        reject(err);
                    } else {
                        console.log('Name inserted into label table');
                        resolve();
                    }
                });
            }
        });
    })
        .catch(err => {
            console.error('Error:', err);
        });



    // Create the 'users' table if it doesn't exist
    const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
`;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Table created or already exists');
        }
    });
});

const app = express();

// Use CORS middleware
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());



// Define your API endpoints here
// Define your POST routes to add a user
app.post('/users', async (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO users (name) VALUES (?)';
    try {
        await db.query(query, [name]);
        res.status(201).send({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send({ message: 'Server error' });
    }
});


// Define your GET route to fetch all users
app.get('/users', async (req, res) => {
    console.log('Fetching users from the database...');
    const query = 'SELECT * FROM users';
    try {
        const [rows] = await db.query(query);
        console.log('Users fetched:', rows);
        res.send(rows);
    } catch (error) {
        // console.error(error);
        console.error('Error fetching users:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Updating user's name
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = 'UPDATE users SET name = ? WHERE id = ?';
    try {
        await db.query(query, [name, id]);
        res.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Deleting a user field
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    try {
        await db.query(query, [id]);
        res.status(200).send({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Define your GET route to fetch the label name
// app.get('/label', async (req, res) => {
//     try {
//         // Query the label name from the database
//         const query = 'SELECT name FROM label LIMIT 1'; // Assuming you only have one label name in the table
//         const [rows] = await db.query(query);

//         if (rows.length === 0) {
//             // If no label name is found, return an appropriate response
//             res.status(404).send({ message: 'Label name not found' });
//             return;
//         }

//         // Extract the label name from the database response
//         const labelName = rows[0].name;

//         // Send the label name in the response
//         res.send({ name: labelName });
//     } catch (error) {
//         console.error('Error fetching label name:', error);
//         res.status(500).send({ message: 'Server error' });
//     }
// });

app.get('/label', async (req, res) => {
    try {
        // Query the label name from the database, specifically the second row
        const query = 'SELECT * FROM label ORDER BY id ASC LIMIT 1 OFFSET 1'; // Adjusted query
        const [rows] = await db.query(query);

        if (rows.length === 0) {
            // If no label name is found, return an appropriate response
            res.status(404).send({ message: 'Label name not found' });
            return;
        }

        // Extract the label name from the database response
        const labelName = rows[0].name; // Assuming 'name' is the column you're interested in

        // Send the label name in the response
        res.send({ name: labelName });
    } catch (error) {
        console.error('Error fetching label name:', error);
        res.status(500).send({ message: 'Server error' });
    }
});



// Define your GET route to fetch the asset list items
// Endpoint to fetch asset list
app.get('/item-list', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM item_list');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching asset list:', error);
        res.status(500).send('Error fetching asset list');
    }
});

// Implement the POST route
app.post('/item-list', async (req, res) => {
    const { itemCode, itemName } = req.body;
    const query = 'INSERT INTO item_list (item_code, item_name) VALUES (?, ?)';
    try {
        await db.query(query, [itemCode, itemName]);
        res.status(201).send({ message: 'Asset added successfully' });
    } catch (error) {
        console.error('Error adding asset:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Implement the EDIT route
app.put('/item-list/:id', async (req, res) => {
    const { id } = req.params;
    const { itemCode, itemName } = req.body;
    console.log(`Updating asset with ID: ${id}, itemCode: ${itemCode}, itemName: ${itemName}`);
    const query = 'UPDATE item_list SET item_code = ?, item_name = ? WHERE id = ?';
    try {
        await db.query(query, [itemCode, itemName, id]);
        res.status(200).send({ message: 'Asset updated successfully' });
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).send({ message: 'Server error' });
    }
});




// Define your POST route to insert a name into the label table
// app.post('/label', async (req, res) => {
//     const { name } = req.body;
//     const insertQuery = 'INSERT INTO label (name) VALUES (?)';
//     try {
//         await db.query(insertQuery, [name]);
//         res.status(201).send({ message: 'Label name inserted successfully' });
//     } catch (error) {
//         console.error('Error inserting label name:', error);
//         res.status(500).send({ message: 'Server error' });
//     }
// });

// Endpoint for summary table - category
app.get('/asset-details/:assetCode', async (req, res) => {
    const { assetCode } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM summary WHERE Asset_Code = ?', [assetCode]);
        if (rows.length > 0) {
            res.json(rows[0]); // Assuming you want to return the first matching row
        } else {
            res.status(404).send({ message: 'Asset details not found' });
        }
    } catch (error) {
        console.error('Error fetching asset details:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Endpoint to insert category list into the table
// app.post('/add-category', (req, res) => {
//     const { CategoryCode, ItemCode, ItemName } = req.body;
//     const query = 'INSERT INTO category_list (CategoryCode, ItemCode, ItemName) VALUES (?, ?, ?)';

//     db.query(query, [CategoryCode, ItemCode, ItemName], (err, result) => {
//         if (err) throw err;
//         res.send('Data inserted successfully');
//     });
// });

//endpoint to add entries into the category_list table
app.post('/category-list', async (req, res) => {
    const entries = req.body;
    try {
        for (const entry of entries) {
            const { itemCode, itemName, categoryCode, timestamp } = entry;
            const query = 'INSERT INTO category_list (ItemCode, ItemName, CategoryCode, event_timestamp) VALUES (?, ?, ?, ?)';
            await db.query(query, [itemCode, itemName, categoryCode, timestamp]);
        }
        res.status(201).send({ message: 'Entries added successfully' });
    } catch (error) {
        console.error('Error adding entries:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Endpoint to fetch item data by item code
app.get('/category-list', async (req, res) => {
    try {
       const item = await item.findOne({ itemCode: req.params.itemCode });
       if (!item) {
         return res.status(404).json({ message: 'Item not found' });
       }
       res.json(item);
    } catch (error) {
       console.error('Error fetching item:', error);
       res.status(500).json({ message: 'Server error' });
    }
   });


// Endpoint to fetch the details of category-list
app.get('/category-list', (req, res) => {
    const query = 'SELECT * FROM category_list';

    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// Fetch all categories
app.get('/category-list/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM category_list');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching category list:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Update category details
app.put('/category-list/:id', async (req, res) => {
    const { id } = req.params;
    const { CategoryCode, ItemCode, ItemName } = req.body;
    const query = 'UPDATE category_list SET CategoryCode = ?, ItemCode = ?, ItemName = ? WHERE id = ?';
    try {
        await db.query(query, [CategoryCode, ItemCode, ItemName, id]);
        res.status(200).send({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send({ message: 'Server error' });
    }
});







// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
