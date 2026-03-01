export interface UserReview {
    name: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    benefits: string[];
    chakra: string;
    stock?: number;
    displayRating?: number;
    displayReviews?: number;
    userReviews?: UserReview[];
}
