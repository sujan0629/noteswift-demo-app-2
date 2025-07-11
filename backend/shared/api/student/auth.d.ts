import { TStudentWithNoSensitive } from "../../model/students/Student";
import { ApiResponse } from "../common";
export declare namespace SignupStudent {
    export interface Req {
        full_name: string;
        grade: number;
        phone_number: string;
        password?: string;
        address: {
            province?: string;
            district?: string;
            institution?: string;
        };
    }
    interface Res extends TStudentWithNoSensitive {
        avatarEmoji: boolean;
    }
    export type ApiRes = ApiResponse<Res>;
    export {};
}
export declare namespace LoginStudent {
    export interface Req {
        phone_number: string;
        password?: string;
    }
    interface Res extends TStudentWithNoSensitive {
        avatarEmoji: any;
    }
    export type ApiRes = ApiResponse<Res>;
    export {};
}
