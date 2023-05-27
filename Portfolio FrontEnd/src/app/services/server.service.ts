import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class ServerService {
  constructor(private baseService: BaseService) {}

  createServer(data: any): Observable<any> {
    return this.baseService.post("servers", data);
  }

  updateServer(data: any): Observable<any> {
    return this.baseService.put("servers/:_id", data);
  }

  getAllServers(): Observable<any> {
    return this.baseService.get("servers");
  }

  getServerbyId(data: any): Observable<any> {
    return this.baseService.get("servers", data);
  }

  deleteServer(data: any): Observable<any> {
    return this.baseService.delete("servers", data);
  }
}
