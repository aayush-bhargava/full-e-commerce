"use server";

import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/types';

// Points to ../../../packages/shared/src/data relative to the app's src/lib/db.ts
// In apps/web/src/lib/db.ts, process.cwd() is apps/web.
// The data is at packages/shared/src/data.
// So relative from apps/web is ../../packages/shared/src/data
const DATA_DIR = path.join(process.cwd(), '..', '..', 'packages', 'shared', 'src', 'data');

export interface Order {
    id: string;
    customer: string;
    email: string;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    date: string;
    items: { productId: string; quantity: number; price: number }[];
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    orders: number;
    totalSpent: number;
    dateJoined: string;
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
async function writeData<T>(filename: string, data: T[]): Promise<void> {
    try {
        const filePath = getFilePath(filename);
        const dir = path.dirname(filePath);
        await fs.mkdir(dir, { recursive: true }); // Ensure directory exists
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        throw new Error('Failed to save data');
    }
}

// --- Product Actions ---
export async function getProducts(): Promise<Product[]> {
    return readData<Product>('products.json');
}

export async function addProduct(product: Omit<Product, 'id' | 'benefits' | 'chakra'>): Promise<Product> {
    const products = await getProducts();
    const newProduct: Product = {
        ...product,
        id: Math.random().toString(36).substr(2, 9),
        benefits: [], // Default empty
        chakra: "General" // Default
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

// ... (previous code)

export async function getProductById(id: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find(p => p.id === id);
}

// --- Order Actions ---
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
