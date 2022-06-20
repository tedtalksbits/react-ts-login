import { Button, Card, PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import loginStyles from "./Login.module.css";
import { UserContextType } from "../@types/user";
import { useUser } from "../contexts/User.context";
import { useState } from "react";

import sha256 from "crypto-js/sha256";

const Login = () => {
    const { user, setUser } = useUser() as UserContextType;

    const [loginInfoError, setLoginInfoError] = useState({
        errorMessage: "",
        error: false,
    });

    let navigate = useNavigate();
    const hash = sha256(user.password).toString();
    const loginUser = () => {
        if (!user.name) {
            return setLoginInfoError({
                errorMessage: "Please enter a valid username and password",
                error: true,
            });
        }
        if (!user.password) {
            return setLoginInfoError({
                errorMessage: "Please enter a password",
                error: true,
            });
        }
        setUser({
            id: user.name,
            address: user.address,
            email: user.email,
            company: user.company,
            name: user.name,
            phone: user.phone,
            website: user.website,
            password: hash,
            isAdult: user.isAdult,
        });

        localStorage.setItem(
            "user",
            JSON.stringify({
                id: user.name + "-" + hash,
            })
        );

        navigate("/");
    };
    return (
        <div className={loginStyles.wrapper}>
            <div>
                <h1 className={loginStyles.welcome_text}>Welcome to Pixla</h1>
                <Card radius={"lg"} className={loginStyles.login_card}>
                    <h3>Login</h3>
                    <div className="input">
                        <TextInput
                            label="Username"
                            placeholder="Enter your username"
                            value={user.name}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="input">
                        <PasswordInput
                            label="Password"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    {loginInfoError.error && (
                        <small className={loginStyles.error_message}>
                            {loginInfoError.errorMessage}
                        </small>
                    )}
                    <Button className={loginStyles.btn} onClick={loginUser}>
                        Login
                    </Button>
                    <Link className={loginStyles.link} to="/signup">
                        Don't have an account? Sign up
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Login;
