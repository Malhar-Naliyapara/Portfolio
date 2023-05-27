import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class PaymentMethodsService {
  constructor(private baseService: BaseService) {}

  createPaymentMethod(data: any): Observable<any> {
    return this.baseService.post("paymentMethods", data);
  }

  updatePaymentMethod(data: any): Observable<any> {
    return this.baseService.put("paymentMethods/:_id", data);
  }

  getAllPaymentMethods(): Observable<any> {
    return this.baseService.get("paymentMethods");
  }

  getPaymentMethodbyId(data: any): Observable<any> {
    return this.baseService.get("paymentMethods", data);
  }

  deletePaymentMethod(data: any): Observable<any> {
    return this.baseService.delete("paymentMethods", data);
  }
}
