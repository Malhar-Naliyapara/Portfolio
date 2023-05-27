import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-add-edit-client",
  templateUrl: "./add-edit-client.component.html",
  styleUrls: ["./add-edit-client.component.scss"],
})
export class AddEditClientComponent implements OnInit {
  addTitle = "Add Client";
  editTitle = "Edit Client";
  checked = true;
  isAdd = true;
  clientId!: string;
  clientForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
  });

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.clientId = this.route.snapshot.params["id"];
    if (this.clientId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.getClientById(this.clientId);
    }
  }

  getClientById(id: string) {
    this.spinner.show();
    this.clientService.getClientbyId(id).subscribe({
      next: (client) => {
        console.log(client);

        this.clientForm.patchValue({
          name: client.data.name,
          email: client.data.email,
        });
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
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
    this.spinner.show();
    this.clientService.createClient(this.clientForm.value).subscribe({
      next: async (clients) => {
        console.log(clients);
        this.spinner.hide();
        await this.router.navigate(["../clients"], { relativeTo: this.route });
      },
      error: async (error) => {
        console.log(error);
        this.spinner.hide();
        await this.router.navigate(["../clients"], { relativeTo: this.route });
      },
    });

    console.log(this.clientForm.value);
  }

  onEdit() {
    this.spinner.show();
    const data = {
      _id: this.clientId,
      data: this.clientForm.value,
    };
    this.clientService.updateClient(data).subscribe({
      next: async (clients) => {
        console.log(clients);
        this.spinner.hide();
        await this.router.navigate(["../../clients"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        this.spinner.hide();
        await this.router.navigate(["../../clients"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
