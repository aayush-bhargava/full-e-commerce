import React from "react";
import { getProducts } from "@/lib/db";
import ShopContent from "./ShopContent";

export const dynamic = 'force-dynamic';

const ShopPage = async () => {
    const products = await getProducts();

    return <ShopContent initialProducts={products} />;
};

export default ShopPage;
