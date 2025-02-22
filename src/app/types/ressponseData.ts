export type ResponseData<D> = {
    data: D[] | D;
    messafe: string;
    status: number;
}