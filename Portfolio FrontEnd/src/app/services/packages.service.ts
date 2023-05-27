import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class PackagesService {
  constructor(private baseService: BaseService) {}

  createPackage(data: any): Observable<any> {
    return this.baseService.post("packages", data);
  }

  updatePackage(data: any): Observable<any> {
    return this.baseService.put("packages/:_id", data);
  }

  getAllPackages(): Observable<any> {
    return this.baseService.get("packages");
  }

  getPackagebyId(data: any): Observable<any> {
    return this.baseService.get("packages", data);
  }

  deletePackage(data: any): Observable<any> {
    return this.baseService.delete("packages", data);
  }
}
