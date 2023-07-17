'use client';

import { isEmail } from "@/helpers";
import { useContext, useEffect } from "react";
import { EmailAuthContext } from "../layout";
import { useTranslationContext } from "@/providers";

function VerificationLinkSent() {

    const [translationsLoading, lang, t, setLang] = useTranslationContext();
    const { email } = useContext(EmailAuthContext);

    useEffect(() => {

        if (!isEmail(email)) {
            throw new Error('There has been an error. Please try again later.');
        }

    }, []);

    return (
        <div>
            <h1>{t['verification_link_sent']}</h1>
            <p>
                {t['verification_link_sent_page-description'].replace('%s', email)}
            </p>
        </div>
    );

}

export default VerificationLinkSent;