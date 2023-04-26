import { useState } from "react";
import FormButton from "@/client/shared/components/buttons/FormButton/FormButton";
import TextBox from "@/client/shared/components/inputs/TextBox";
import SpecialKey from "@/client/shared/types/SpecialKey";
import styles from "./email-verification.module.scss";

interface VerificationFieldConfig {
    value: string,
    isFocused: boolean
}

function EmailVerification() {

    // TODO: replace this with the user's email.
    const userEmail = 'test@email.com';

    const [verificationFields, setVerificationFields] = useState<VerificationFieldConfig[]>([
        { value: '', isFocused: true },
        { value: '', isFocused: false },
        { value: '', isFocused: false },
        { value: '', isFocused: false },
        { value: '', isFocused: false }
    ]);

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

    return (
        <main className="auth-container">
            <div className="auth-container__popup">
                <header className="auth-container__popup-header">
                    <h1>Verify your email</h1>
                </header>

                <div className="auth-container__popup-main">
                    <p className={styles['description'] + " m-bottom-1"}>
                        {/* TODO: replace "test@gmail.com" with user email. */}
                        Enter a 5-digit code we sent to <span className={styles['auth-container__popup-main-user-email']}>{userEmail}</span>
                    </p>
                    <div className="auth-container__popup-main__form">
                        <div className={styles['auth-container__popup-main__form-input__container']}>
                            {verificationFields.map(({ value, isFocused }, idx) =>
                                <div key={idx} className={styles['auth-container__popup-main__form-input__container--input']}>
                                    <TextBox
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

                        <div className={styles['auth-container__popup-main__form--authenticate']}>
                            <FormButton
                                text="Authenticate"
                                disabled={verificationFields.some(({ value }) => value.length === 0)}
                                handleOnClick={() => { }}
                            />
                        </div>

                        <div className={styles['auth-container__popup-main__form--resend']}>
                            <a href="#" className="link">
                                <span>Resend code</span>
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );

}

export default EmailVerification;