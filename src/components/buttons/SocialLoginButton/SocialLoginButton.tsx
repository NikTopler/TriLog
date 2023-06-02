'use client';

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GithubIcon from "@mui/icons-material/GitHub";
import styles from "./SocialLoginButton.module.scss"
import { useRouter } from "next/navigation";

interface SocialLoginButtonProps {
    provider: 'Google' | 'Facebook' | 'Github';
}

const providerIcons = {
    Google: <GoogleIcon className={styles['social_login__button-image_container__icon']} />,
    Facebook: <FacebookIcon className={styles['social_login__button-image_container__icon']} />,
    Github: <GithubIcon className={styles['social_login__button-image_container__icon']} />
}

function SocialLoginButton({ provider }: SocialLoginButtonProps) {

    const router = useRouter();

    const onButtonClick = () => {
        router.push('/api/auth/social/' + provider.toLowerCase());
    }

    return (
        <div className={styles['social_login__button-container']} data-provider={provider}>
            <button onClick={onButtonClick} className={styles['social_login__button']}>
                <div className={styles['social_login__button-image_container']}>
                    {providerIcons[provider]}
                </div>
                <div className={styles['social_login__button-text_container']}>
                    <span>{provider}</span>
                </div>
            </button>
        </div>
    );

}

export default SocialLoginButton;