import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
})
export class ClientListComponent implements OnInit {
  title = "Client List";
  displayedColumns: string[] = ["id", "name", "email", "createdAt", "action"];
  clientData: any;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllClients();
  }

  getAllClients() {
    this.spinner.show();
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clientData = clients.data;
        console.log(clients.data);
        this.clientData = this.clientData;
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editClient/", id]);
  }

  onDelete(id: string) {
    this.spinner.show();
    this.clientService.deleteClient(id).subscribe({
      next: (client) => {
        console.log(client);
        this.getAllClients();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }
}
