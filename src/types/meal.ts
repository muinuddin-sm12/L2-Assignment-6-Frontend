export interface IMeal{
    _id: string;
    providerId: string;
    mealName: string;
    description: string;
    image?: string;
    price: number;
    ingredients: string[];
    dietaryTags: string[];
    isAvailable: boolean;
    createdAt?: number;
    updatedAt?: number;
    __v?: number;
}