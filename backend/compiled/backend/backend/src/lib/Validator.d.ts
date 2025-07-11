interface ValidationResult {
    success: boolean;
    message: string;
}
export declare function validateEmail(email: string): ValidationResult;
export declare function validatePassowrd(password: string): ValidationResult;
export {};
