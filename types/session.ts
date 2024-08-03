import { Session } from "next-auth";

export interface session extends Session {
    user: {
        email: string;
        name: string;
        image: string;
        uid: string;
    }
}
