export interface GetCategoriesRes {
    results: number,
    metadata: {
        currentPage: number,
        numberOfPages: number,
        limit: number,
        nextPage?: number
    },
    data: category[]
}

export interface category {
    _id: string,
    name: string,
    slug: string,
    image: string,
    createdAt: string,
    updatedAt: string
}

