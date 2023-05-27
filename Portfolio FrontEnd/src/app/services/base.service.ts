import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  private baseUrl: string = "";
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "content-Type": "application/x-www-form-urlencoded",
    }),
  };

  get<T>(
    url: string,
    id?: number | boolean,
    params?: any,
    headers?: any
  ): Observable<T> {
    const options = {
      params,
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    if (params) {
      options["params"] = params;
    }
    if (headers) {
      options["headers"] = headers;
    }

    if (id !== null && id !== undefined) {
      return this.httpClient.get<T>(
        `${this.baseUrl}${url}/${id}`,
        this.httpOptions
      );
    } else {
      return this.httpClient.get<T>(`${this.baseUrl}${url}`, this.httpOptions);
    }
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}${url}`, data);
  }

  delete<T>(url: string, id: number): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${url}/${id}`);
  }

  patch<T>(url: string, data?: any): Observable<T> {
    return this.httpClient.patch<T>(`${this.baseUrl}${url}`, data);
  }
}
