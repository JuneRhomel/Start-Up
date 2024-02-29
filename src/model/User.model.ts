export type User = {
    email: string
    password: string
    first_name: string
    last_name: string
    contact_number: string
    address: string
    account_code: string
    permission_id: number
    is_active: number
    created_at: number
    deleted_at: number
    created_by: number
}
export type CreateUserModel = {
    email: string
    password: string
    first_name: string
    last_name: string
    contact_number: string
    address: string
    account_code: string
    permission_id?: number
    confirm_password: string
    created_at?: number
    deleted_at?: number
    created_by?: number
}
export type AccountTabedata = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    account_code: string,
    permission_id: number,
    is_active: number
}

export type UserData = {
    first_name: string
    last_name: string
    contact_number: string
    address: string
    email: string
    role?: number
    account_id?: number
}