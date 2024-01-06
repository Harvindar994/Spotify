"use client";

import React from 'react';
import styles from "./page.module.css";
import Image from 'next/image';
import { Button, Theme } from '@radix-ui/themes';
import { useState } from 'react';
import { TextFieldInput } from '@radix-ui/themes';
import { Switch } from '@radix-ui/themes';
import Link from 'next/link';
import { z } from 'zod';
import { LoginUserValidation } from '@/app/DataValidation/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { AlertDialog } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';
import { ColorRing } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

type User = z.infer<typeof LoginUserValidation>;

const Login = () => {
    // let's create router to redirect to another pages.
    const router = useRouter();

    const [theme, setTheme] = useState("dark");
    const [gettingLogin, setGettingLogin] = useState(false);
    const [popupMessage, setPopupMessage] = useState({
        color: "red",
        title: "",
        message: ""
    });

    const {register, handleSubmit, formState: { errors }} = useForm<User>({
        resolver: zodResolver(LoginUserValidation)
    })

    async function onSubmit(data: User){
        try {
            setGettingLogin(true);
            const response = await axios.post("/api/users/login", data);

            router.push("/");

        } catch (error: any) {
            setPopupMessage({
                color: "red",
                message: error.response.data.error,
                title: "Error"
            });
        } finally{
            setGettingLogin(false);
        }
    }

    return (
        <Theme appearance={theme} className={styles.fullScreen}>
            <AlertDialog.Root open={popupMessage.message != ""}>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                    <AlertDialog.Title>{popupMessage.title}</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                    {popupMessage.message}
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="solid" color={popupMessage.color} onClick={()=>{
                                setPopupMessage({...popupMessage, message: ""})
                            }}>
                            Ok
                            </Button>
                        </AlertDialog.Cancel>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <div className={styles.header}>
                <Image src="/Spotify logo.png" alt='Spotify' width={130} height={130} className={styles.logo}/>
            </div>
            <div className={styles.loginForm}>
                <div className={styles.title}>Log in to Spotify</div>
                <form className={styles.fields} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Email or username</div>
                        <TextFieldInput placeholder="Email or username" size="3" {...register("email")} className={styles.fieldInput}/>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Password</div>
                        <TextFieldInput placeholder="Password" size="3" {...register("password")} type='password' className={styles.fieldInput}/>
                    </div>
                    <div className={styles.fieldRemember}>
                        <Switch size="1" defaultChecked />
                        <p>Remember me</p>
                    </div>
                    <Button radius="full" type='submit' variant="soft" size="3" className={styles.loginButton}>
                        {gettingLogin ? 
                            <ColorRing
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)']}
                            />: "Login"} 
                    </Button>
                    <Link href="/" className={styles.forgetPassword}>Forget your password?</Link>
                    <Link href="/auth/signup" className={styles.forgetPassword}>Don't have an account? Sign up for Spotify</Link>
                </form>
            </div>
            <div className={styles.shade}></div>
        </Theme>
    )
}

export default Login;