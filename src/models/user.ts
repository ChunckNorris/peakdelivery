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
export class AuthUser {
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
export class NewUser {
    Email: string;
    Username: string;
    FirstName: string;
    LastName: string;
    Password: string;
    ConfirmPassword: string;
    RoleName: string;
}
export class CreatedUser {
    url: string;
    id: string;
    userName: string;
    fullName: string;
    email: string;

}
export class ChangePassword {
    userId: string;
    oldPassword: string;
    newPassword: string;

}

export class ResetPassword {
    code: string;
    confirmPassword: string;
    email: string;
    password: string;
}
export class ForgotPassword {
    email: string;
}
export class SearchedUser {
    firstName: string;
    lastName: string;
    level: number;
    joinDate: Date;
    email: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    phoneNumber?: any;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEndDateUtc?: any;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    roles: any[];
    claims: any[];
    logins: any[];
    id: string;
    userName: string;
}





