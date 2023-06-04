import { Email } from "@/schemas";

interface FacebookAuthUserInfo {
    id: string;
    name: string;
    email: Email;
    picture: {
        data: {
            height: number;
            is_silhouette: boolean;
            url: string;
            width: number;
        }
    }
}

export default FacebookAuthUserInfo;