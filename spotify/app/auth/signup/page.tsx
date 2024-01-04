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

const Login = () => {
    const [currentPage, setCurrentPage] = useState("Home");
    const [theme, setTheme] = useState("dark");
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    function changeTheme(){
        if (theme === "dark"){
            setTheme("light");
        }
        else{
            setTheme("dark");
        }
    }

    function handleFormChanges(event: any){
        const {name, value} = event.currentTarget;
        setUser({
            ...user,
            [name]: value
        })
    }

    async function onFormSubmit(event: any){
        if (creatingAccount){
            return;
        }
        setCreatingAccount(true);
        event.preventDefault();
        console.log("working");
        try {
            const respose = await axios.post("/api/users/signup", user);
            console.log(respose);
        } catch (error) {
            console.log(error);
        }
        setCreatingAccount(false);
    }

    return (
        <Theme appearance={theme} className={styles.fullScreen}>
            <div className={styles.header}>
                <Image src="/Spotify logo.png" alt='Spotify' width={130} height={130} className={styles.logo}/>
                <div className={styles.spacer}></div>
                <IconButton size="2" radius='full' className={styles.button} onClick={changeTheme} variant="soft">
                    {theme == "dark" ? <MdLightMode />: <MdDarkMode />}
                </IconButton>
            </div>
            <form className={styles.loginForm} onSubmit={onFormSubmit}>
                <div className={styles.title}>Sign up to start <br/> listening</div>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Name</div>
                        <TextFieldInput placeholder="Name" size="3" onChange={handleFormChanges} value={user.name} name='name' className={styles.fieldInput}/>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Email address</div>
                        <TextFieldInput placeholder="Email or username" size="3" onChange={handleFormChanges} value={user.email} name='email' className={styles.fieldInput}/>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Password</div>
                        <TextFieldInput placeholder="Password" size="3" onChange={handleFormChanges} value={user.password} type='password' name='password' className={styles.fieldInput}/>
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