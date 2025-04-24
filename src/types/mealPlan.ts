interface IMeal {
    breakfast: string;
    lunch: string;
    dinner: string;
}
interface IMenu {
    sunday: IMeal;
    monday: IMeal;
    tuesday: IMeal;
    wednesday: IMeal;
    thurday: IMeal;
    friday: IMeal;
    saturday: IMeal;
}


export interface IMealPlan {
    _id: string;
    providerId: string;
    title: string;
    description: string;
    scheduleType: string;
    pricePerMeal: number;
    mealPlanType: string;
    mealPerDay: string[];
    menu: IMenu;
    isAvailable: boolean;
}