export type Profile = {
    id?: number
    user_id?: number
    url_image: string
    file_name?: string
    original_name?: string
    path?: string
    size?: number
    created_at?: number
    created_by?: number
    deleted_at?: number
    deleted_by?: number
}
export type ProfileUploadModel = {
    user_id: number
    url_image: string
    file_name: string
    original_name: string
    path: string
    size: number
    created_by?: number
    created_at?: number
}