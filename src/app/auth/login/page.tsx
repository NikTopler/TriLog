'use client';

import { useContext, useState } from "react";
import { CustomTextBox, RegularButton } from "@/components/inputs";
import { SocialLoginButton } from "@/components/buttons";
import { isEmail } from "@/helpers";
import { EmailAuthContext } from "../layout";
import { useAuthContext } from "@/providers";

export default function Login() {

    const auth = useAuthContext();
    const { email, setEmail } = useContext(EmailAuthContext);

    const [isProcessing, setIsProcessing] = useState(false);

    const onContinueClick = () => {

        setIsProcessing(true);

        if (!isEmail(email)) {
            setIsProcessing(false);
            return;
        }

        auth.login(email)
            .finally(() => {
                setIsProcessing(false);
            });

    }

    const setIsProcessingTrue = () => setIsProcessing(true);

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
                        handleInputChange={setEmail}
                        style={{
                            borderRadius: '4px',
                            height: '50px',
                            width: '100%',
                            margin: '0 0 5px 0',
                            ":focus": {
                                borderColor: '#65c418',
                            },
                            ":hover": {
                                borderColor: 'red',
                            }
                        }}
                    />
                    <RegularButton
                        text="Continue"
                        disabled={!isEmail(email)}
                        handleOnClick={onContinueClick}
                        loading={isProcessing}
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
                    <SocialLoginButton
                        provider="google"
                        disabled={isProcessing}
                        setIsProcessing={setIsProcessingTrue}
                    />
                    <SocialLoginButton
                        provider="facebook"
                        disabled={isProcessing}
                        setIsProcessing={setIsProcessingTrue}
                    />
                    <SocialLoginButton
                        provider="github"
                        disabled={isProcessing}
                        setIsProcessing={setIsProcessingTrue}
                    />
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
