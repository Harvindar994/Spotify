"use client";

import React from 'react';
import styles from "./page.module.css";
import Image from 'next/image';
import { Button, Theme } from '@radix-ui/themes';
import { useState } from 'react';
import { TextFieldInput } from '@radix-ui/themes';
import { Switch } from '@radix-ui/themes';
import Link from 'next/link';

const Login = () => {
    const [currentPage, setCurrentPage] = useState("Home");
    const [theme, setTheme] = useState("dark");

    function handlePageChange(name: string){
        setCurrentPage(name);
    }

    return (
        <Theme appearance={theme} className={styles.fullScreen}>
            <div className={styles.header}>
                <Image src="/Spotify logo.png" alt='Spotify' width={130} height={130} className={styles.logo}/>
            </div>
            <div className={styles.loginForm}>
                <div className={styles.title}>Log in to Spotify</div>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Email or username</div>
                        <TextFieldInput placeholder="Email or username" size="3" className={styles.fieldInput}/>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Password</div>
                        <TextFieldInput placeholder="Password" size="3" type='password' className={styles.fieldInput}/>
                    </div>
                    <div className={styles.fieldRemember}>
                        <Switch size="1" defaultChecked />
                        <p>Remember me</p>
                    </div>
                    <Button radius="full" variant="soft" size="3" className={styles.loginButton}>
                        Log In
                    </Button>
                    <Link href="/" className={styles.forgetPassword}>Forget your password?</Link>
                    <Link href="/auth/signup" className={styles.forgetPassword}>Don't have an account? Sign up for Spotify</Link>
                </div>
            </div>
            <div className={styles.shade}></div>
        </Theme>
    )
}

export default Login;