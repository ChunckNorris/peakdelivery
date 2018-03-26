export class Profile {
    userId: string;
    role: string;
    accountId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    suffix: string;
    dateOfBirth: Date;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    gender: string;
}
export class AuthUser{
    email: string;
    password: string;
    
}
export class TokenData {
    access_token: string;
    token_type: string;
    expires_in: number;
}
export class UserClaim {
    url: string;
    id: string;
    userName: string;
    fullName: string;
    email: string;
    emailConfirmed: boolean;
    level: number;
    joinDate: Date;
    roles: string[];
    claims: any[];
}



