import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/User.context";
import { UserContextType, IUser } from "../@types/user";
import { useEffect } from "react";
import { Alert, Button } from "@mantine/core";
import homeStyles from "./Home.module.css";

const Home = () => {
    const { user, setUser } = useUser() as UserContextType;

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser({
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
        localStorage.removeItem("user");
    };

    const currentUser = localStorage.getItem("user");

    useEffect(() => {
        !currentUser && navigate("/login");
    }, [currentUser, navigate]);

    // loop over each property on user and check if it is empty
    const userProperties = Object.keys(user);
    const userHasNoBlankInfo = userProperties.every((property) => {
        return user[property as keyof IUser] !== "";
    });

    return (
        <div className={homeStyles.page}>
            <div className={homeStyles.wrapper}>
                {!userHasNoBlankInfo && (
                    <Alert title="Missing Info" color="yellow" radius="lg">
                        Finish you filling out your profile
                    </Alert>
                )}
                <h1>Hi👋 {user?.name} </h1>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default Home;
