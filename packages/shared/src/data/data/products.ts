import { Product } from "@/types";

export const products: Product[] = [
    {
        id: "1",
        name: "Amethyst Cluster",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1567605963240-20e3a6773305?q=80&w=2670&auto=format&fit=crop",
        category: "Crystals",
        description: "A powerful protective stone that creates a bubble of spiritual light around the body.",
        benefits: ["Calms the mind", "Enhances intuition", "Protects against psychic attack"],
        chakra: "Crown"
    },
    {
        id: "2",
        name: "Rose Quartz Mala",
        price: 32.00,
        image: "https://images.unsplash.com/photo-1602737667822-7772c3d0b27b?q=80&w=2669&auto=format&fit=crop",
        category: "Jewelry",
        description: "Promotes unconditional love, forgiveness, and infinite peace.",
        benefits: ["Attracts love", "Heals emotional wounds", "Promotes self-love"],
        chakra: "Heart"
    },
    {
        id: "3",
        name: "Sandalwood Incense",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1608552684940-8c29045ea79c?q=80&w=2574&auto=format&fit=crop",
        category: "Incense",
        description: "Premium hand-rolled incense sticks for meditation and cleansing.",
        benefits: ["Purifies the atmosphere", "Deepens meditation", "Reduces stress"],
        chakra: "Root"
    },
    {
        id: "4",
        name: "Selanite Tower",
        price: 28.00,
        image: "https://images.unsplash.com/photo-1610450949927-514daa3d67e4?q=80&w=2670&auto=format&fit=crop", // placeholder
        category: "Crystals",
        description: "A crystallized form of Gypsum meant to clear energy blockages.",
        benefits: ["Cleanses aura", "Charges other crystals", "Promotes clarity"],
        chakra: "Crown"
    },
    {
        id: "5",
        name: "Tibetan Singing Bowl",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1596706038148-e4b50596739d?q=80&w=2574&auto=format&fit=crop",
        category: "Sound Healing",
        description: "Hand-hammered bowl that produces deep, resonant tones for healing.",
        benefits: ["Reduces stress", "Balances chakras", "Enhances focus"],
        chakra: "Solar Plexus"
    },
    {
        id: "6",
        name: "Himalayan Salt Lamp",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1518557363403-4f938092fb14?q=80&w=2670&auto=format&fit=crop",
        category: "Home Decor",
        description: "Creates a warm, ambient glow and purifies the air.",
        benefits: ["Improves air quality", "Boosts mood", "Promotes better sleep"],
        chakra: "Sacral"
    }
];
