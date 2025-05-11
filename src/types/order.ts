export interface ITransaction {
    id: string;
    transactionStatus: string | null;
    bank_status: string;
    date_time: string;
    method: string;
    sp_code: string;
    sp_message: string;
  }

export interface IOrder {
    _id: string;
    providerId: string;
    customerId: string;
    mealPlanId:string;
    customizations: string;
    deliverySchedule: string;
    price: number;
    orderStatus: string;
    paymentStatus: string;
    updatedAt: string;
    createdAt: string;
    __v: number;
    transaction: ITransaction;
}