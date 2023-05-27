import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class PortfolioService {
  constructor(private baseService: BaseService) {}

  createPortfolio(data: any): Observable<any> {
    return this.baseService.post("portfolios", data);
  }

  updatePortfolio(data: any): Observable<any> {
    return this.baseService.put("portfolios/:_id", data);
  }

  getAllPortfolios(): Observable<any> {
    return this.baseService.get("portfolios");
  }

  getPortfoliobyId(data: any): Observable<any> {
    return this.baseService.get("portfolios", data);
  }

  deletePortfolio(data: any): Observable<any> {
    return this.baseService.delete("portfolios", data);
  }
}
