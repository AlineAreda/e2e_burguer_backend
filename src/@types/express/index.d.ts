declare namespace Express {
    export interface Request {
        user_id: string;
        isGestao?: boolean;
    }
}