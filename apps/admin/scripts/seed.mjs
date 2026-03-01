import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', '..', '..', 'packages', 'shared', 'src', 'data');

const indianNames = [
    "Aarav Sharma", "Aditi Rao", "Arjun Patel", "Deepika Padukone", "Ishaan Khatter",
    "Kavya Nair", "Rohan Gupta", "Sanya Malhotra", "Vihaan Singh", "Zoya Akhtar",
    "Aayush Bhargava", "Priyanka Chopra", "Ranbir Kapoor", "Alia Bhatt", "Varun Dhawan",
    "Shraddha Kapoor", "Siddharth Malhotra", "Kiara Advani", "Ayushmann Khurrana", "Bhumi Pednekar"
];

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow", "Alwar"];

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Delivered", "Delivered"];

async function seed() {
    const customers = [];
    const orders = [];

    // Read products to get real prices
    const productsData = await fs.readFile(path.join(DATA_DIR, 'products.json'), 'utf-8');
    const products = JSON.parse(productsData);

    for (let i = 1; i <= 20; i++) {
        const name = indianNames[i - 1] || `Customer ${i}`;
        const email = `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
        const city = cities[Math.floor(Math.random() * cities.length)];

        const customerId = `CUST-${String(i).padStart(3, '0')}`;
        const dateJoined = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();

        let totalSpent = 0;
        let customerOrdersCount = Math.floor(Math.random() * 3) + 1;

        for (let j = 0; j < customerOrdersCount; j++) {
            const orderId = `ORD-${String(orders.length + 1).padStart(3, '0')}`;
            const orderDate = new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString();

            const itemsCount = Math.floor(Math.random() * 2) + 1;
            const orderItems = [];
            let orderTotal = 0;

            for (let k = 0; k < itemsCount; k++) {
                const product = products[Math.floor(Math.random() * products.length)];
                const quantity = Math.floor(Math.random() * 2) + 1;
                orderItems.push({
                    productId: product.id,
                    quantity,
                    price: product.price
                });
                orderTotal += product.price * quantity;
            }

            orders.push({
                id: orderId,
                customer: name,
                email: email,
                total: orderTotal,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                date: orderDate,
                items: orderItems
            });

            totalSpent += orderTotal;
        }

        customers.push({
            id: customerId,
            name,
            email,
            orders: customerOrdersCount,
            totalSpent,
            dateJoined
        });
    }

    await fs.writeFile(path.join(DATA_DIR, 'customers.json'), JSON.stringify(customers, null, 2));
    await fs.writeFile(path.join(DATA_DIR, 'orders.json'), JSON.stringify(orders, null, 2));

    console.log(`Successfully seeded ${customers.length} customers and ${orders.length} orders.`);
}

seed().catch(console.error);
