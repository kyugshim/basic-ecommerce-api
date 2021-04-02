export interface PaginationResult<T> {
    data: T[]
    pagination: {
        count: number,
        page: number,
        pageSize: number,
    };
}