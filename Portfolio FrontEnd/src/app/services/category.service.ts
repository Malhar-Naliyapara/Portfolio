import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private baseService: BaseService) {}

  createCategory(data: any): Observable<any> {
    return this.baseService.post("category", data);
  }

  updateCategory(data: any): Observable<any> {
    return this.baseService.put("category/:_id", data);
  }

  getAllCategories(): Observable<any> {
    return this.baseService.get("category");
  }

  getCategorybyId(data: any): Observable<any> {
    return this.baseService.get("category", data);
  }

  deleteCategory(data: any): Observable<any> {
    return this.baseService.delete("category", data);
  }
}
