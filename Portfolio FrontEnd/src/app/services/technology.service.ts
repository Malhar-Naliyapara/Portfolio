import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class TechnologyService {
  constructor(private baseService: BaseService) {}

  createTechnology(data: any): Observable<any> {
    return this.baseService.post("technology", data);
  }

  updateTechnology(data: any): Observable<any> {
    return this.baseService.put("technology/:_id", data);
  }

  getAllTechnologies(): Observable<any> {
    return this.baseService.get("technology");
  }

  getTechnologybyId(data: any): Observable<any> {
    return this.baseService.get("technology", data);
  }

  deleteTechnology(data: any): Observable<any> {
    return this.baseService.delete("technology", data);
  }
}
