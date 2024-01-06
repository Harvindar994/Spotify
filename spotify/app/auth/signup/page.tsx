"use client";

import React from 'react';
import styles from "./page.module.css";
import Image from 'next/image';
import { Button, Checkbox, Theme } from '@radix-ui/themes';
import { useState } from 'react';
import { TextFieldInput } from '@radix-ui/themes';
import { Switch } from '@radix-ui/themes';
import Link from 'next/link';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IconButton } from '@radix-ui/themes';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { AlertDialog } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';
import { UserValidation } from '@/app/DataValidation/user';
import {z} from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type User = z.infer<typeof UserValidation>;

const Login = () => {
    const [theme, setTheme] = useState("dark");
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [popupMessage, setPopupMessage] = useState({
        color: "red",
        title: "",
        message: ""
    });

    const {register, handleSubmit, formState: { errors }} = useForm<User>({
        resolver: zodResolver(UserValidation)
    })

    function changeTheme(){
        if (theme === "dark"){
            setTheme("light");
        }
        else{
            setTheme("dark");
        }
    }
    
    async function onFormSubmit(data: User){
        if (creatingAccount){
            return;
        }
        setCreatingAccount(true);
        try {
            const response = await axios.post("/api/users/signup", data);

            setPopupMessage({
                color: "green",
                message: response.data.message,
                title: "Account created"
            });

        } catch (error: any) {
            setPopupMessage({
                color: "red",
                message: error.response.data.error,
                title: "Error"
            });
        }
        setCreatingAccount(false);
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
                <div className={styles.spacer}></div>
                <IconButton size="2" radius='full' className={styles.button} onClick={changeTheme} variant="soft">
                    {theme == "dark" ? <MdLightMode />: <MdDarkMode />}
                </IconButton>
            </div>
            <form className={styles.loginForm} onSubmit={handleSubmit(onFormSubmit)}>
                <div className={styles.title}>Sign up to start <br/> listening</div>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Name</div>
                        <TextFieldInput placeholder="Name" size="3" {...register("name")} className={styles.fieldInput}/>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Email address</div>
                        <TextFieldInput placeholder="Email or username" size="3" {...register("email")} className={styles.fieldInput}/>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Password</div>
                        <TextFieldInput placeholder="Password" size="3" {...register("password")} className={styles.fieldInput}/>
                    </div>
                    <div className={styles.fieldRemember}>
                        <Checkbox/>
                        <p>I would prefer not to receive marketing messages from Spotify</p>
                    </div>
                    <Button radius="full" type='submit' variant="soft" size="3" className={styles.loginButton}>
                        {creatingAccount ? 
                            <ColorRing
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)']}
                            />: "Sign up"} 
                    </Button>
                    <Link href="/auth/login" className={styles.forgetPassword}>Already have an account? Log in here</Link>
                </div>
            </form>
            <div className={styles.shade}></div>
        </Theme>
    )
}

export default Login;