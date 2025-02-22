import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BlogItem, ProductItems } from "../types/product-item";
import { ResponseData } from "../types/ressponseData";

@Injectable({ providedIn: 'root' })
export class BlogService {
    constructor(private http: HttpClient) {

    }

    // getBlogs(): Observable<ResponseData<ProductItems[]>> {
    //     return this.http.get<any>('https://ninedev-api.vercel.app/blogs')
    // }

    getBlogs(): Observable<ResponseData<ProductItems[]>> {
        return this.http.get<any>('https://ninedev-api.vercel.app/blogs');
    }

    detailBlogs(id: number): Observable<ResponseData<ProductItems[]>> {
        return this.http.get<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
    }

    postBlog(blogitem: BlogItem): Observable<ResponseData<ProductItems[]>> {
        return this.http.post<any>(`https://ninedev-api.vercel.app/blogs`, blogitem);
    }

    deleteBlog(id: number): Observable<ResponseData<ProductItems[]>> {
        return this.http.delete<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
    }
}