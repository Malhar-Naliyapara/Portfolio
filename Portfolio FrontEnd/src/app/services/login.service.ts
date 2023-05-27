import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private baseService: BaseService) {}

  login(data: any): Observable<any> {
    return this.baseService.post("login", data);
  }
}
