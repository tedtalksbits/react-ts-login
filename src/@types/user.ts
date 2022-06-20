export interface IUser {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    website: string;
    company: string;
    password: string;
    isAdult: boolean;
}

export type UserContextType = {
    user: IUser;
    setUser: (user: IUser) => void;
};
