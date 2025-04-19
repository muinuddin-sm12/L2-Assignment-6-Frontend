export interface IProvier {
    _id: string;
    userId: string;
    providerName : string;
    about: string;
    logo?: string;
    cuisineSpecialties : string[];
    experience: string;
    address: string; 
    iat?: number;
    exp?: number;
} 