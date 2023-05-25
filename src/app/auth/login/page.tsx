'use client';

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomTextBox, RegularButton } from "@/components/inputs";
import { SocialLoginButton } from "@/components/buttons";
import { apiPost, isEmail } from "@/helpers";
import { EmailAuthContext } from "../layout";
import { LoginSuccessResponse } from "@/app/api/auth/login/route";

export default function Login() {

    const router = useRouter();

    const { email, setEmail } = useContext(EmailAuthContext);
    const [isProcessing, setIsProcessing] = useState(false);

    const onContinueClick = () => {

        setIsProcessing(true);

        apiPost<LoginSuccessResponse>('/api/auth/login', { recipient: email })
            .then((res) => {

                if (!res) {
                    throw new Error('There has been an error. Please try again later.');
                }

                if (res.isVerified) {
                    router.push('/auth/verification-link-sent');
                } else {
                    router.push('/auth/email-verification?email=' + email);
                }

            })
            .catch((err) => {
                // TODO: Handle error
                console.log(err);
            })
            .finally(() => {
                setIsProcessing(false);
            });

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
