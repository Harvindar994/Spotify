import * as React from 'react';
import { Button } from '@react-email/button';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';

interface Props{
    verifyUrl: string
}

export default function VerificationEmail(props: Props) {
  return (
    <Html lang="en" style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
        <h1>Verify Your Email</h1>
        <Hr />
        <p> You're almost there please click on the 'Verify Email' button in order to verify your email and you're done </p>
        <a href={props.verifyUrl}><Button>Verify Email</Button></a>
    </Html>
  );
}

