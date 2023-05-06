'use client';

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SpecialKey } from "@/types";
import { CustomTextBox } from "@/components/inputs";
import styles from "./email-verification.module.scss";
import { createQueryString } from "@/helpers";

interface VerificationFieldConfig {
    value: string;
    isFocused: boolean;
}

function EmailVerification() {

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [verificationFields, setVerificationFields] = useState<VerificationFieldConfig[]>([
        { value: '', isFocused: true },
        { value: '', isFocused: false },
        { value: '', isFocused: false },
        { value: '', isFocused: false },
        { value: '', isFocused: false }
    ]);

    const createQuery = useCallback((name: string, value: string) =>
        createQueryString(searchParams, name, value),
        [searchParams]
    );

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
        // TODO: send email verification code to user's email.
        router.push(pathName + '?' + createQuery('resent', '1'));
    }

    const onUpdateEmailClick = (e: any) => {
        e.preventDefault();
        router.push('/auth/login');
    }

    return (
        <>
            <header className="auth-container__popup-header">
                <h1>Verify your email</h1>
            </header>

            <div className="auth-container__popup-main">
                <p className={styles['description'] + " m-bottom-1"}>
                    You're almost done! We sent a code to
                    <span className={styles['auth-container__popup-main-user-email']}>test@gmail.com</span>
                </p>
                <div className="auth-container__popup-main__form">
                    <div className={styles['auth-container__popup-main__form-input__container'] + " m-bottom-1"}>
                        {verificationFields.map(({ value, isFocused }, idx) =>
                            <div key={idx} className={styles['auth-container__popup-main__form-input__container--input']}>
                                <CustomTextBox
                                    value={value}
                                    type="text"
                                    isFocused={isFocused}
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
                        <div className="d-flex a-items-center">
                            <p>Didn't receive the code?</p>
                        </div>
                        <div className="d-flex">
                            <a href="#" onClick={onEmailResendClick} className="link">Resend the code</a>
                            <p>&nbsp; or &nbsp;</p>
                            <a href="#" onClick={onUpdateEmailClick} className="link">update your email</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default EmailVerification;