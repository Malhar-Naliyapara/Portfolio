import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private baseService: BaseService) {}

  createUser(data: any): Observable<any> {
    return this.baseService.post("users", data);
  }

  updateUser(data: any): Observable<any> {
    return this.baseService.put("users/:_id", data);
  }

  getAllUsers(): Observable<any> {
    return this.baseService.get("users");
  }

  getUserbyId(data: any): Observable<any> {
    return this.baseService.get("users", data);
  }

  deleteUser(data: any): Observable<any> {
    return this.baseService.delete("users", data);
  }
}
