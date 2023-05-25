'use client';

import { isEmail } from "@/helpers";
import { useContext, useEffect } from "react";
import { EmailAuthContext } from "../layout";

function VerificationLinkSent() {

    const { email } = useContext(EmailAuthContext);

    useEffect(() => {

        if (!isEmail(email)) {
            throw new Error('There has been an error. Please try again later.');
        }

    }, []);

    return (
        <div>
            <h1>Verification Link Sent</h1>
            <p>
                We have sent you a verification link to {email}. Please click the link to authenticate.
            </p>
        </div>
    );

}

export default VerificationLinkSent;