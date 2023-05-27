import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  constructor(private baseService: BaseService) {}

  createTheme(data: any): Observable<any> {
    return this.baseService.post("themes", data);
  }

  updateTheme(data: any): Observable<any> {
    return this.baseService.put("themes/:_id", data);
  }

  getAllThemes(): Observable<any> {
    return this.baseService.get("themes");
  }

  getThemebyId(data: any): Observable<any> {
    return this.baseService.get("themes", data);
  }

  deleteTheme(data: any): Observable<any> {
    return this.baseService.delete("themes", data);
  }
}
