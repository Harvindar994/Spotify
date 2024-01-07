import * as React from 'react';
import { Button } from '@react-email/button';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';

interface Props{
    name: string,
    otp: string
}

export function OtpEmailTemplate(props: Props) {
  return (
    <Html lang="en">
        <Text>
            Dear {props.name},<br/>
            Your One-Time Password (OTP) for resetting your password is:<br/>
            <b>{props.otp}</b><br/>
            Please use this OTP to complete the password reset process. If you did not initiate this request or have any concerns, please contact our support team immediately.<br/>
            Thank you for using our services.<br/>
            Best regards,<br/>
            <b>Spotify</b>
        </Text>
    </Html>
  );
}

export default OtpEmailTemplate;
