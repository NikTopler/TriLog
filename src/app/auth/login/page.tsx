'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { CustomTextBox, RegularButton } from "@/components/inputs";
import { SocialLoginButton } from "@/components/buttons";
import { isEmail } from "@/helpers";

export default function Login() {

    const router = useRouter();
    const [email, setEmail] = useState('');

    const onContinueClick = () => {
        router.push('/auth/email-verification');
    }

    const handleEmailInputChange = (value: string) => {
        setEmail(value);
    }

    return (
        <>
            <header className="auth-container__popup-header">
                <h1>TriLog</h1>
            </header>

            <div className="auth-container__popup-main">
                <span className={"auth-container__popup-main__instruction  p-bottom-1"}>
                    Log in to continue
                </span>
                <div className="auth-container__popup-main__form">
                    <CustomTextBox
                        value={email}
                        placeholder="Enter your Email"
                        type="email"
                        isFocused={true}
                        handleInputChange={handleEmailInputChange}
                        style={{
                            borderRadius: '4px',
                            height: '50px',
                            width: '100%',
                            margin: '0 0 5px 0'
                        }}
                    />
                    <RegularButton
                        text="Continue"
                        disabled={!isEmail(email)}
                        handleOnClick={onContinueClick}
                        style={{
                            borderRadius: '4px',
                            height: '50px',
                            width: '100%',
                            margin: '0 0 5px 0',
                            fontWeight: 600,
                            color: '#ffffff',
                            backgroundColor: '#4DABF7',
                            ":hover": {
                                backgroundColor: '#4DABF7'
                            }
                        }}
                    />
                </div>
                <div className="p-top-1 p-bottom-1">
                    <span className={"auth-container__popup-main__instruction"}>or</span>
                </div>
                <div className="m-bottom-2">
                    <SocialLoginButton provider="Google" />
                    <SocialLoginButton provider="Facebook" />
                    <SocialLoginButton provider="Github" />
                </div>
            </div>

            <footer>
                <a href="#" className="link">
                    <span>Can&apos;t log in?</span>
                </a>
            </footer>
        </>
    )
}
