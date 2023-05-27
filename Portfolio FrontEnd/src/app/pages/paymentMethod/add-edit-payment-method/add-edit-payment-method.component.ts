import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PaymentMethodsService } from "src/app/services/payment-methods.service";

@Component({
  selector: "app-add-edit-payment-method",
  templateUrl: "./add-edit-payment-method.component.html",
  styleUrls: ["./add-edit-payment-method.component.scss"],
})
export class AddEditPaymentMethodComponent implements OnInit {
  addTitle = "Add Payment Method";
  editTitle = "Edit Payment Method";
  checked = true;
  isAdd = true;
  paymentMethodId!: string;
  paymentMethodForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });

  constructor(
    private paymentMethodService: PaymentMethodsService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.paymentMethodId = this.route.snapshot.params["id"];
    if (this.paymentMethodId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.getpaymentMethodById(this.paymentMethodId);
    }
  }

  getpaymentMethodById(id: string) {
    this.paymentMethodService.getPaymentMethodbyId(id).subscribe({
      next: (paymentMethod) => {
        console.log(paymentMethod);

        this.paymentMethodForm.patchValue({
          name: paymentMethod.data.name,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.isAdd) {
      this.onAdd();
    } else {
      this.onEdit();
    }
  }

  onAdd() {
    this.paymentMethodService
      .createPaymentMethod(this.paymentMethodForm.value)
      .subscribe({
        next: async (paymentMethod) => {
          console.log(paymentMethod);
          await this.router.navigate(["../paymentMethods"], {
            relativeTo: this.route,
          });
        },
        error: async (error) => {
          console.log(error);
          await this.router.navigate(["../paymentMethods"], {
            relativeTo: this.route,
          });
        },
      });

    console.log(this.paymentMethodForm.value);
  }

  onEdit() {
    const data = {
      _id: this.paymentMethodId,
      data: this.paymentMethodForm.value,
    };
    this.paymentMethodService.updatePaymentMethod(data).subscribe({
      next: async (paymentMethod) => {
        console.log(paymentMethod);
        await this.router.navigate(["../../paymentMethods"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../../paymentMethods"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
