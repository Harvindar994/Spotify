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
import { ResetPasswordFrom } from '@/app/DataValidation/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { AlertDialog } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';
import { ColorRing } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

type User = z.infer<typeof ResetPasswordFrom>;

const Login = () => {
    // let's create router to redirect to another pages.
    const router = useRouter();

    const [theme, setTheme] = useState("dark");
    const [resetingPassword, setResetingPassword] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);

    const [popupMessage, setPopupMessage] = useState({
        color: "red",
        title: "",
        message: ""
    });

    const {register, handleSubmit, formState: { errors }, getValues} = useForm<User>({
        resolver: zodResolver(ResetPasswordFrom)
    })

    async function onSubmit(data: User){
        try {
            setResetingPassword(true);
            const response = await axios.post("/api/users/forgotPassword", data);

            setPopupMessage({
                color: "green",
                message: response.data.message,
                title: "Password Updated"
            });

            setIsPasswordReset(true);

        } catch (error: any) {
            setPopupMessage({
                color: "red",
                message: error.response.data.error,
                title: "Error"
            });
        } finally{
            setResetingPassword(false);
        }
    }

    function redirectToLogin(){
        if (isPasswordReset){
            router.push("/auth/login");
        }
    }

    async function sendOtp(event: any){
        event.preventDefault();
        
        try {
            setSendingOtp(true);

            const response = await axios.get(`/api/users/forgotPassword/${getValues('email')}`);

            setPopupMessage({
                color: "green",
                message: response.data.message,
                title: "OTP Sent"
            });
            
        } catch (error: any) {

            setPopupMessage({
                color: "red",
                message: error.response.data.error,
                title: "Error"
            });

            console.log(error);
            
        }finally{
            setSendingOtp(false);
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
                                setPopupMessage({...popupMessage, message: ""});
                                redirectToLogin();
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
                <div className={styles.title}>Reset your Password</div>
                <form className={styles.fields} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>Email</div>
                        <TextFieldInput placeholder="Email" size="3" {...register("email")} className={styles.fieldInput}/>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>OTP</div>
                        <div className="flex items-center gap-4">
                            <TextFieldInput placeholder="Enter otp here" size="3" {...register("otp")} className={styles.fieldInput}/>
                            <Button onClick={sendOtp} className='cursor-pointer flex-1' style={{height: "100%"}}>
                                {sendingOtp ? 
                                    <ColorRing
                                    visible={true}
                                    height="30"
                                    width="30"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)']}
                                    />: "Send OTP"}
                            </Button>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldName}>New Password</div>
                        <TextFieldInput placeholder="Enter new password" size="3" {...register("password")} type='password' className={styles.fieldInput}/>
                    </div>
                    
                    <Button radius="full" type='submit' variant="soft" size="3" className={styles.loginButton}>
                        {resetingPassword ? 
                            <ColorRing
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)', 'var(--gray-12)']}
                            />: "Reset"} 
                    </Button>
                    <Link href="/auth/login" className={styles.forgetPassword}>Want to login? Click here</Link>
                    <p className={styles.forgetPassword}>Remember that the OTP you will receive will be valid only for 15 minutes.</p>
                </form>
            </div>
            <div className={styles.shade}></div>
        </Theme>
    )
}

export default Login;