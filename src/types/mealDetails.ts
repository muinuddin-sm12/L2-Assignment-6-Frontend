import { IProvier } from "./provider";

export interface IMealDetail{
    _id: string;
    providerId: IProvier;
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