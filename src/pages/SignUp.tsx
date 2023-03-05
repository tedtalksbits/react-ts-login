import { Button, Card, Checkbox, PasswordInput, TextInput } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import loginStyles from './Login.module.css';
import { useState } from 'react';
import { IUser, UserContextType } from '../@types/user';
import { useUser } from '../contexts/User.context';
const SignUp = () => {
    let navigate = useNavigate();
    const [signUpInfo, setSignUpInfo] = useState<IUser>({
        name: '',
        password: '',
        address: '',
        email: '',
        phone: '',
        website: '',
        company: '',
        id: '',
        isAdult: false,
    });
    const [targetedInput, setTargetedInput] = useState({
        userName: false,
        password: false,
        email: false,
        isAdult: false,
    });
    const { setUser } = useUser() as UserContextType;

    const [signUpInfoError, setSignUpInfoError] = useState({
        errorMessage: '',
        error: false,
    });
    const handleSignUp = () => {
        if (!validUserName()) {
            setTargetedInput({ ...targetedInput, userName: true });

            return setSignUpInfoError({
                errorMessage: 'Please enter a valid username',
                error: true,
            });
        }

        if (!validPassword()) {
            setTargetedInput({ ...targetedInput, password: true });
            return setSignUpInfoError({
                errorMessage: 'Please enter a valid password',
                error: true,
            });
        }
        if (!signUpInfo.isAdult) {
            setTargetedInput({ ...targetedInput, isAdult: true });
            return setSignUpInfoError({
                errorMessage: 'Please confirm that you are at least 18 years old',
                error: true,
            });
        }

        setUser(signUpInfo);
        navigate('/login');
    };

    const handleSignUpInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (signUpInfoError.error) {
            setSignUpInfoError({ errorMessage: '', error: false });
        }
        setSignUpInfo({
            ...signUpInfo,
            [e.target.name]: e.target.value,
        });
    };

    const validUserName = () => {
        return signUpInfo.name.match(/^[a-zA-Z0-9]{3,}$/);
    };
    const validPassword = () => {
        return signUpInfo.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    };

    return (
        <div className={loginStyles.wrapper}>
            <div>
                <h1 className={loginStyles.welcome_text}>Welcome to App</h1>
                <Card radius={'lg'} className={loginStyles.login_card}>
                    <h3>Sign Up</h3>
                    <div className='input'>
                        <TextInput
                            ref={(input) => {
                                if (input && targetedInput.userName) {
                                    input.focus();
                                }
                            }}
                            label='name'
                            autoFocus={targetedInput.userName}
                            placeholder='Enter your username'
                            name='name'
                            onChange={handleSignUpInfoChange}
                        />
                    </div>
                    <div className='input'>
                        <TextInput
                            type='email'
                            ref={(input) => {
                                if (input && targetedInput.email) {
                                    input.focus();
                                }
                            }}
                            label='Email'
                            placeholder='Enter your email address(optional)'
                            name='email'
                            onChange={handleSignUpInfoChange}
                        />
                    </div>
                    <div className='input'>
                        <PasswordInput
                            ref={(input) => {
                                if (input && targetedInput.password) {
                                    input.focus();
                                }
                            }}
                            label='Password'
                            placeholder='Enter your password'
                            name='password'
                            onChange={handleSignUpInfoChange}
                        />
                    </div>
                    <div className='input'>
                        <Checkbox
                            className={loginStyles.checkbox}
                            label='I am atleast 18 years old.'
                            style={{ cursor: 'pointer' }}
                            ref={(input) => {
                                if (input && targetedInput.isAdult) {
                                    input.focus();
                                    input.className = 'highlight';
                                }
                            }}
                            onChange={(e) =>
                                setSignUpInfo({
                                    ...signUpInfo,
                                    isAdult: e.target.checked,
                                })
                            }
                        />
                    </div>
                    {signUpInfoError.error && (
                        <small className={loginStyles.error_message}>{signUpInfoError.errorMessage}</small>
                    )}
                    <Button className={loginStyles.btn} onClick={handleSignUp}>
                        Sign Up
                    </Button>
                    <Link className={loginStyles.link} to='/login'>
                        Already have an account? Log in
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default SignUp;
