import { LayoutProps } from "@/interfaces";
import "./auth.scss";

function AuthLayout({ children }: LayoutProps) {
    return (
        <main className="auth-container">
            <div className="auth-container__popup">
                {children}
            </div>
        </main>
    );
}

export default AuthLayout;