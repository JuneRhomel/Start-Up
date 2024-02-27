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
}