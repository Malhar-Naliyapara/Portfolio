import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { PaymentMethodsService } from "src/app/services/payment-methods.service";

@Component({
  selector: "app-payment-method-list",
  templateUrl: "./payment-method-list.component.html",
  styleUrls: ["./payment-method-list.component.scss"],
})
export class PaymentMethodListComponent implements OnInit {
  title = "Payment Method list";
  displayedColumns: string[] = ["id", "name", "createdAt", "action"];
  paymentMethodData: any;

  constructor(
    private paymentMethodService: PaymentMethodsService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllpaymentMethods();
  }

  getAllpaymentMethods() {
    this.paymentMethodService.getAllPaymentMethods().subscribe({
      next: (paymentMethods) => {
        this.paymentMethodData = paymentMethods.data;
        console.log(paymentMethods.data);
        this.paymentMethodData = this.paymentMethodData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editPaymentMethod/", id]);
  }

  onDelete(id: string) {
    this.paymentMethodService.deletePaymentMethod(id).subscribe({
      next: (paymentMethod) => {
        console.log(paymentMethod);
        this.getAllpaymentMethods();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
