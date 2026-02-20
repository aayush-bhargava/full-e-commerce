import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import SacredRitual from "@/components/home/SacredRitual";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { getProducts } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
      <SacredRitual />
      <FeaturedCollections />
    </>
  );
}
