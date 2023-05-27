import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class AccessTokenService {
  constructor(private baseService: BaseService) {}

  createAccessToken(data: any): Observable<any> {
    return this.baseService.post("accessToken", data);
  }

  updateAccessToken(data: any): Observable<any> {
    return this.baseService.put("accessToken/:_id", data);
  }

  getAllAccessTokens(): Observable<any> {
    return this.baseService.get("accessToken");
  }

  getAccessTokenbyId(data: any): Observable<any> {
    return this.baseService.get("accessToken", data);
  }

  deleteAccessToken(data: any): Observable<any> {
    return this.baseService.delete("accessToken", data);
  }
}
