import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import HealingAndNeurology from "@/components/home/HealingAndNeurology";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HighlightedProducts from "@/components/home/HighlightedProducts";
import { getProducts } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
      <HighlightedProducts />
      <HealingAndNeurology />
      <FeaturedCollections />
    </>
  );
}
