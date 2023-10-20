export interface IUser {
    id?: number;
    email?:string;
    password?:string;
    role?:string;
}
export interface IBuilding {
    id?:number;
    name?:string;
    dhs?: string;
    tiketDhs?: string;
    yield?: string;
    daysLeft?: string;
    soldPercent?:string;
    img?:string;
}