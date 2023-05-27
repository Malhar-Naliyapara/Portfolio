import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AccessTokenService } from "src/app/services/access-token.service";
import { ClientService } from "src/app/services/client.service";
import { TechnologyService } from "src/app/services/technology.service";

@Component({
  selector: "app-add-edit-access-token",
  templateUrl: "./add-edit-access-token.component.html",
  styleUrls: ["./add-edit-access-token.component.scss"],
})
export class AddEditAccessTokenComponent implements OnInit {
  checked = true;
  isAdd = true;
  addTitle = "Add Access Token";
  editTitle = "Edit Access Token";
  accessTokenId!: string;
  accessTokenForm = new FormGroup({
    token: new FormControl("", [Validators.required]),
    url: new FormControl("", [Validators.required]),
    technology: new FormControl("", [Validators.required]),
    client: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
  });
  technologies: any;
  clients: any;

  constructor(
    private accessTokenService: AccessTokenService,
    private technologyService: TechnologyService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.accessTokenId = this.route.snapshot.params["id"];
    if (this.accessTokenId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.getaccessTokenById(this.accessTokenId);
    }
    this.getAllTechnology();
    this.getAllClients();
  }

  getaccessTokenById(id: string) {
    this.spinner.show();
    this.accessTokenService.getAccessTokenbyId(id).subscribe({
      next: (accessToken) => {
        console.log(accessToken.data.technology.technology);

        this.accessTokenForm.patchValue({
          token: accessToken.data.token,
          url: accessToken.data.url,
          technology: accessToken.data.technology.technology,
          client: accessToken.data.client.name,
          status: accessToken.data.status,
        });
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  getAllTechnology() {
    this.spinner.show();
    this.technologyService.getAllTechnologies().subscribe({
      next: (technologies) => {
        this.technologies = technologies.data;
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  getAllClients() {
    this.spinner.show();
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients.data;
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
    this.accessTokenService
      .createAccessToken(this.accessTokenForm.value)
      .subscribe({
        next: async (accessToken) => {
          console.log(accessToken);
          this.spinner.hide();
          await this.router.navigate(["../accessToken"], {
            relativeTo: this.route,
          });
        },
        error: async (error) => {
          console.log(error);
          this.spinner.hide();
          await this.router.navigate(["../accessToken"], {
            relativeTo: this.route,
          });
        },
      });

    console.log(this.accessTokenForm.value);
  }

  onEdit() {
    this.spinner.show();
    const data = {
      _id: this.accessTokenId,
      data: this.accessTokenForm.value,
    };
    this.accessTokenService.updateAccessToken(data).subscribe({
      next: async (accessToken) => {
        this.spinner.hide();
        console.log(accessToken);
        await this.router.navigate(["../../accessToken"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        this.spinner.hide();
        console.log(error);
        await this.router.navigate(["../../accessToken"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
