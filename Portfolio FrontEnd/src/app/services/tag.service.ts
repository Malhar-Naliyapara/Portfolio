import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class TagService {
  constructor(private baseService: BaseService) {}

  createTag(data: any): Observable<any> {
    return this.baseService.post("tags", data);
  }

  updateTag(data: any): Observable<any> {
    return this.baseService.put("tags/:_id", data);
  }

  getAllTags(): Observable<any> {
    return this.baseService.get("tags");
  }

  getTagbyId(data: any): Observable<any> {
    return this.baseService.get("tags", data);
  }

  deleteTag(data: any): Observable<any> {
    return this.baseService.delete("tags", data);
  }
}
