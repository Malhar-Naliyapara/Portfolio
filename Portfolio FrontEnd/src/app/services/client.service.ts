import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private baseService: BaseService) {}

  createClient(data: any): Observable<any> {
    return this.baseService.post("clients", data);
  }

  updateClient(data: any): Observable<any> {
    return this.baseService.put("clients/:_id", data);
  }

  getAllClients(): Observable<any> {
    return this.baseService.get("clients");
  }

  getClientbyId(data: any): Observable<any> {
    return this.baseService.get("clients", data);
  }

  deleteClient(data: any): Observable<any> {
    return this.baseService.delete("clients", data);
  }
}
