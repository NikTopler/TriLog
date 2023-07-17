'use client';

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SpecialKey } from "@/types";
import { CustomTextBox } from "@/components/inputs";
import { apiPost, createQueryString, isEmail } from "@/helpers";
import { Email } from "@/schemas";
import { EmailAuthContext } from "../layout";
import { useAuthContext, useTranslationContext } from "@/providers";
import { PATHS } from "@/constants";
import styles from "./email-verification.module.scss";

interface VerificationFieldConfig {
    value: string;
    isFocused: boolean;
}

const NUM_OF_VERIFICATION_FIELDS = 5;
const EMAIL_VERIFICATION_TIMEOUT_MS = 30000;

function EmailVerification() {

    const [translationsLoading, lang, t, setLang] = useTranslationContext();
    const auth = useAuthContext();
    const { email } = useContext(EmailAuthContext);

    const router = useRouter();
    const searchParams = useSearchParams();

    const [emailResendTimeout, setEmailResendTimeout] = useState<number | null>(null);
    const [recipient, setRecipient] = useState<Email | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [verificationFields, setVerificationFields] = useState<VerificationFieldConfig[]>([
        { value: '', isFocused: true },
        { value: '', isFocused: false },
        { value: '', isFocused: false },
        { value: '', isFocused: false },
        { value: '', isFocused: false }
    ]);

    const code = verificationFields.map((field) => field.value).join('');

    useEffect(() => {

        if (isEmail(email)) {
            setRecipient(email);
        } else {
            throw new Error('There has been an error. Please try again later.');
        }

    }, []);

    useEffect(() => {

        if (NUM_OF_VERIFICATION_FIELDS === code.length) {

            setLoading(true);

            if(!isEmail(email)) {
                return;
            }

            auth.emailVerification(email, code)
                .finally(() => setLoading(false));

            apiPost(PATHS.api.auth.emailVerification, { email, verificationCode: code })
                .then(() => router.push(PATHS.home))
                .catch((err) => {
                    setLoading(false);
                    // TODO: Handle error
                    console.log(err);
                });
        }

    }, [code])

    useEffect(() => {

        if (emailResendTimeout) {
            // TODO: clear timeout
            setTimeout(() => setEmailResendTimeout(null), emailResendTimeout);
        }

    }, [emailResendTimeout]);

    const isTextboxValueValid = (value: string) => {

        return (
            value.length <= 1
            && value.length >= 0
            && !isNaN(Number(value))
        );

    }

    const handleInputChange = (value: string, idx: number) => {

        if (value.length === 5) {

            const chars = value.split('');
            const isAllCharsValid = chars.every((char) => isTextboxValueValid(char));

            if (isAllCharsValid) {
                setVerificationFields([
                    { value: chars[0], isFocused: false },
                    { value: chars[1], isFocused: false },
                    { value: chars[2], isFocused: false },
                    { value: chars[3], isFocused: false },
                    { value: chars[4], isFocused: false }
                ]);
            }

            return;
        }

        if (!isTextboxValueValid(value)) {
            return;
        }

        setVerificationFields((prev) => {

            const newVerificationFields = [...prev];
            newVerificationFields[idx].value = value;

            if (value.length === 1) {

                newVerificationFields[idx].isFocused = false;
                if (idx < 4) {
                    newVerificationFields[idx + 1].isFocused = true;
                }

            }

            return newVerificationFields;

        });
    }

    const handleSpecialKeyClick = (key: SpecialKey, idx: number) => {

        if ((key === 'Backspace' || key === 'Delete')
            && idx !== 0
            && verificationFields[idx].value.length === 0
        ) {

            setVerificationFields((prev) => {

                const newVerificationFields = [...prev];

                newVerificationFields[idx].isFocused = false;
                newVerificationFields[idx - 1].isFocused = true;

                return newVerificationFields;

            });

        }

    }

    const handleInputFocusChange = (isFocused: boolean, idx: number) => {

        if (verificationFields[idx].isFocused === isFocused) {
            return;
        }

        setVerificationFields((prev) => {
            const newVerificationFields = [...prev];
            newVerificationFields[idx].isFocused = isFocused;

            return newVerificationFields;
        });

    }

    const onEmailResendClick = (e: any) => {

        e.preventDefault();

        if (emailResendTimeout) {
            return;
        }

        setEmailResendTimeout(EMAIL_VERIFICATION_TIMEOUT_MS);

        apiPost(PATHS.api.auth.login, { recipient })
            .then(() => router.push(PATHS.auth.emailVerification + '?' + createQueryString(searchParams, { email: recipient as string })))
            .catch((err) => console.log(err));

    }

    const onUpdateEmailClick = (e: any) => {
        e.preventDefault();
        router.push(PATHS.auth.login);
    }

    return (
        <>
            <header className="auth-container__popup-header">
                <h1>{t['verify_your_email']}</h1>
            </header>

            <div className="auth-container__popup-main">
                <p className={styles['description']}>
                    {t['email_verification_page-description']}
                    <span className={styles['auth-container__popup-main-user-email']}>
                        {recipient}
                    </span>
                </p>
                <div className="auth-container__popup-main__form">
                    <div className={styles['auth-container__popup-main__form-input__container']}>
                        {verificationFields.map(({ value, isFocused }, idx) =>
                            <div key={idx} className={styles['auth-container__popup-main__form-input__container--input']}>
                                <CustomTextBox
                                    value={value}
                                    type="text"
                                    isFocused={isFocused}
                                    isDisabled={loading}
                                    style={{
                                        borderRadius: '4px',
                                        margin: '0 0 5px 0',
                                        fontSize: '42px',
                                        width: '100%',
                                        height: '72px'
                                    }}
                                    handleInputChange={(value) => handleInputChange(value, idx)}
                                    handleSpecialKeyClick={(key) => handleSpecialKeyClick(key, idx)}
                                    handleInputFocusChange={(isFocused) => handleInputFocusChange(isFocused, idx)}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles['auth-container__popup-main__form--resend']}>
                        <div className="flex items-center">
                            <p>{t['verification_code-not_received']}</p>
                        </div>
                        <div className="flex">
                            <a href="#" onClick={onEmailResendClick} className="link">
                                {t['resend_code']}
                            </a>
                            <p>&nbsp; {t['or']} &nbsp;</p>
                            <a href="#" onClick={onUpdateEmailClick} className="link">
                                {t['update_your_email']}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default EmailVerification;