export interface IProvier {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
        image?: string;
      };
    providerName : string;
    about: string;
    logo?: string;
    cuisineSpecialties : string[];
    experience: string;
    address: string; 
    iat?: number;
    exp?: number;
} 