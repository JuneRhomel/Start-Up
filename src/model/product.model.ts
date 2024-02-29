export type Product = {
    id: string
    product_name: string
    price: number
    status: string
    status_id?: number
    created_by?: number
    created_at?: number
    deleted_at?: number
    deleted_by?: number
    updated_at?: number
}

export type ProductUploadModel = {
    product_name: string
    price: number
    status: string
    created_by?: number
    created_at?: number
}