'use client';

import { useContext, useState } from "react";
import { CustomTextBox, RegularButton } from "@/components/inputs";
import { SocialLoginButton } from "@/components/buttons";
import { changeFirstLetter, isEmail } from "@/helpers";
import { EmailAuthContext } from "../layout";
import { useAuthContext, useTranslationContext } from "@/providers";

export default function Login() {

    const [translationsLoading, lang, t, setLang] = useTranslationContext();

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
                    {t['login_to_continue']}
                </span>
                <div className="auth-container__popup-main__form">
                    <CustomTextBox
                        value={email}
                        placeholder={t['enter_email']}
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
                        text={changeFirstLetter(t['continue'])}
                        disabled={!isEmail(email)}
                        handleOnClick={onContinueClick}
                        loading={isProcessing}
                        className="auth-login-button"
                    />
                </div>
                <div>
                    <span className={"auth-container__popup-main__instruction"}>
                        {t['or']}
                    </span>
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
                    <span>{t['trouble_logging_in']}</span>
                </a>
            </footer>
        </>
    )
}
