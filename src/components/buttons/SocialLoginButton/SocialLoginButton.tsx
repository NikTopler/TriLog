'use client';

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GithubIcon from "@mui/icons-material/GitHub";
import { SocialLoginProvider, useAuthContext } from "@/providers";
import { capitalizeFirstLetter } from "@/helpers";
import styles from "./SocialLoginButton.module.scss"

export interface SocialLoginButtonProps {
    provider: SocialLoginProvider;
    disabled: boolean;
    setIsProcessing: () => void;
}

const providerIcons = {
    google: <GoogleIcon className={styles['social_login__button-image_container__icon']} />,
    facebook: <FacebookIcon className={styles['social_login__button-image_container__icon']} />,
    github: <GithubIcon className={styles['social_login__button-image_container__icon']} />
}

function SocialLoginButton({ provider, disabled, setIsProcessing }: SocialLoginButtonProps) {

    const auth = useAuthContext();

    const handleOnClick = () => {
        setIsProcessing();
        auth.socialLogin(provider);
    }

    return (
        <div className={styles['social_login__button-container']} data-provider={provider} data-disabled={disabled}>
            <button onClick={handleOnClick} className={styles['social_login__button']}>
                <div className={styles['social_login__button-image_container']}>
                    {providerIcons[provider]}
                </div>
                <div className={styles['social_login__button-text_container']}>
                    <span>{capitalizeFirstLetter(provider)}</span>
                </div>
            </button>
        </div>
    );

}

export default SocialLoginButton;