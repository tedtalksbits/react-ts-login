import { useState, createContext, useContext } from "react";
import { IUser, UserContextType } from "../@types/user";

interface IUserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }: IUserProviderProps) => {
    const [user, setUser] = useState<IUser>({
        id: "",
        address: "",
        email: "",
        company: "",
        name: "",
        phone: "",
        website: "",
        password: "",
        isAdult: false,
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
