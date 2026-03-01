"use server";

import fs from 'fs/promises';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { Product, UserReview } from '@/types';

// Points to ../../../packages/shared/src/data relative to the app's src/lib/db.ts
// In apps/admin/src/lib/db.ts, process.cwd() is apps/admin.
// The data is at packages/shared/src/data.
// So relative from apps/admin is ../../packages/shared/src/data
const DATA_DIR = path.join(process.cwd(), '..', '..', 'packages', 'shared', 'src', 'data');

export interface Order {
    id: string;
    customer: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    date: string;
    items: { productId: string; quantity: number; price: number; name?: string }[];
    paymentMethod: 'card' | 'cod';
    paymentId?: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    orders: number;
    totalSpent: number;
    dateJoined: string;
}

export interface Settings {
    brandName: string;
    logoIcon: string;
    logoUrl: string;
}

// Helper to handle file paths
const getFilePath = (filename: string) => path.join(DATA_DIR, filename);

// Generic read function
async function readData<T>(filename: string): Promise<T[]> {
    try {
        const filePath = getFilePath(filename);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as T[];
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
}

// Generic write function
async function writeData<T>(filename: string, data: T[] | T): Promise<void> {
    try {
        const filePath = getFilePath(filename);
        const dir = path.dirname(filePath);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        throw new Error('Failed to save data');
    }
}

// Generic read single object function
async function readSettings<T>(filename: string): Promise<T | null> {
    try {
        const filePath = getFilePath(filename);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as T;
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return null;
    }
}

// --- Product Actions ---
export async function getProducts(): Promise<Product[]> {
    return readData<Product>('products.json');
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const products = await getProducts();
    const newProduct: Product = {
        ...product,
        id: Math.random().toString(36).substr(2, 9),
    };
    products.push(newProduct);
    await writeData('products.json', products);
    return newProduct;
}

export async function deleteProduct(id: string): Promise<void> {
    const products = await getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    await writeData('products.json', filteredProducts);
}

export async function updateProduct(
    updatedProduct: Product
): Promise<Product> {
    const products = await getProducts();

    const index = products.findIndex(p => p.id === updatedProduct.id);

    if (index === -1) {
        throw new Error("Product not found");
    }

    // Preserve immutable fields if needed
    products[index] = {
        ...products[index],
        ...updatedProduct,
    };

    await writeData('products.json', products);

    return products[index];
}

export async function deleteReview(productId: string, reviewIndex: number): Promise<void> {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1 && products[index].userReviews) {
        products[index].userReviews!.splice(reviewIndex, 1);
        await writeData('products.json', products);
    }
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find(p => p.id === id);
}

// --- Order Actions ---
export async function createOrder(orderData: Omit<Order, 'id' | 'date' | 'status'> & { status?: Order['status'] }): Promise<Order> {
    const orders = await getOrders();
    const customers = await getCustomers();

    const newOrder: Order = {
        ...orderData,
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString(),
        status: orderData.status || 'Pending'
    };

    orders.push(newOrder);
    await writeData('orders.json', orders);

    // Update or create customer
    const customerIndex = customers.findIndex(c => c.email === orderData.email);
    if (customerIndex !== -1) {
        customers[customerIndex].orders += 1;
        customers[customerIndex].totalSpent += orderData.total;
    } else {
        customers.push({
            id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
            name: orderData.customer,
            email: orderData.email,
            orders: 1,
            totalSpent: orderData.total,
            dateJoined: new Date().toISOString()
        });
    }
    await writeData('customers.json', customers);

    return newOrder;
}

export async function getOrders(): Promise<Order[]> {
    return readData<Order>('orders.json');
}

export async function getRecentOrders(limit: number = 5): Promise<Order[]> {
    const orders = await getOrders();
    return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
}

// --- Customer Actions ---
export async function getCustomers(): Promise<Customer[]> {
    return readData<Customer>('customers.json');
}

// --- Dashboard Stats ---
export async function getDashboardStats() {
    const orders = await getOrders();
    const products = await getProducts();
    const customers = await getCustomers();

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalCustomers = customers.length;

    return {
        totalSales,
        totalOrders,
        totalProducts,
        totalCustomers
    };
}

export interface Collection {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
}

// --- Collection Actions ---
export async function getCollectionById(id: string): Promise<Collection | undefined> {
    const collections = await getCollections();
    return collections.find(c => c.id === id);
}
export async function getCollections(): Promise<Collection[]> {
    return readData<Collection>('collections.json');
}

export async function addCollection(collection: Omit<Collection, 'id' | 'slug'>): Promise<Collection> {
    const collections = await getCollections();
    const newCollection: Collection = {
        ...collection,
        id: Math.random().toString(36).substr(2, 9),
        slug: collection.name.toLowerCase().replace(/\s+/g, '-')
    };
    collections.push(newCollection);
    await writeData('collections.json', collections);
    return newCollection;
}

export async function updateCollection(id: string, updates: Partial<Collection>): Promise<void> {
    const collections = await getCollections();
    const index = collections.findIndex(c => c.id === id);
    if (index !== -1) {
        collections[index] = { ...collections[index], ...updates };
        await writeData('collections.json', collections);
    }
}

export async function deleteCollection(id: string): Promise<void> {
    const collections = await getCollections();
    const filteredCollections = collections.filter(c => c.id !== id);
    await writeData('collections.json', filteredCollections);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    const collections = await getCollections();
    return collections.find(c => c.slug === slug);
}

// --- Settings Actions ---
export async function getSettings(): Promise<Settings> {
    const settings = await readSettings<Settings>('settings.json');
    return settings || {
        brandName: "WELLBEING",
        logoIcon: "Activity",
        logoUrl: ""
    };
}

export async function updateSettings(settings: Settings): Promise<Settings> {
    await writeData('settings.json', settings);
    return settings;
}

export async function uploadLogo(formData: FormData): Promise<string> {
    const file = formData.get('logo') as File;
    if (!file || file.size === 0) {
        throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `logo-${Date.now()}${path.extname(file.name)}`;

    // Save to admin public/uploads
    const adminUploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(adminUploadDir, { recursive: true });
    await writeFile(path.join(adminUploadDir, fileName), buffer);

    // Sync to web public/uploads
    const webUploadDir = path.join(process.cwd(), '..', 'web', 'public', 'uploads');
    await mkdir(webUploadDir, { recursive: true });
    await writeFile(path.join(webUploadDir, fileName), buffer);

    return `/uploads/${fileName}`;
}
