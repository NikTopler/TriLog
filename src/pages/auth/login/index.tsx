import { useState } from "react";
import { useRouter } from "next/router";
import TextBox from "@/client/shared/components/inputs/TextBox";
import SocialLoginButton from "@/client/shared/components/buttons/SocialLoginButton/SocialLoginButton";
import isEmail from "@/shared/helpers/isEmail";
import styles from "./login.module.scss";
import RegularButton from "@/client/shared/components/buttons/RegularButton/RegularButton";

export default function Login() {

  const router = useRouter()
  const [email, setEmail] = useState('');

  const onContinueClick = () => {
    router.push('/auth/email-verification');
  }

  const handleEmailInputChange = (value: string) => {
    setEmail(value);
  }

  return (
    <main className="auth-container">
      <div className="auth-container__popup">
        <header className="auth-container__popup-header">
          <h1>TriLog</h1>
        </header>

        <div className="auth-container__popup-main">
          <span className={styles['auth-container__popup-main__instruction'] + " p-bottom-1"}>Log in to continue</span>
          <div className="auth-container__popup-main__form">
            <TextBox
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
            <span className={styles['auth-container__popup-main__instruction']}>or</span>
          </div>
          <div className="m-bottom-2">
            <div>
              <SocialLoginButton provider="Google" />
            </div>
            <div>
              <SocialLoginButton provider="Facebook" />
            </div>
            <div>
              <SocialLoginButton provider="Github" />
            </div>
          </div>
        </div>

        <footer>
          <a href="#" className="link">
            <span>Can&apos;t log in?</span>
          </a>
        </footer>
      </div>
    </main>
  )
}
