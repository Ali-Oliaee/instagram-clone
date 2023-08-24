export interface Login {
    email: string,
    password: string
}
export interface SignUp extends Login {
    username: string
}
export interface ChangeProfile {
    username: string,
    bio: string
}
export interface ChangePassword {
    oldPassword: string,
    newPassword: string
}
export interface ResetPassword {
    newPassword: string,
    email: string,
}
export interface RecoveryCode {
    code: string,
    email: string
}
