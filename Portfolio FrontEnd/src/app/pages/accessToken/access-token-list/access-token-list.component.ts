import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AccessTokenService } from "src/app/services/access-token.service";

@Component({
  selector: "app-access-token-list",
  templateUrl: "./access-token-list.component.html",
  styleUrls: ["./access-token-list.component.scss"],
})
export class AccessTokenListComponent implements OnInit {
  title = "Access Token List";
  displayedColumns: string[] = [
    "clientName",
    "token",
    "technology",
    "link",
    "status",
    "action",
  ];
  accessTokenData: any;

  constructor(
    private accessTokenService: AccessTokenService,
    private router: Router,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllAccessTokens();
  }

  getAllAccessTokens() {
    this.spinner.show();
    this.accessTokenService.getAllAccessTokens().subscribe({
      next: (accessTokens) => {
        this.accessTokenData = accessTokens.data;
        console.log(accessTokens);
        this.accessTokenData = this.accessTokenData;
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editAccessToken/", id]);
  }

  onDelete(id: string) {
    this.spinner.show();
    this.accessTokenService.deleteAccessToken(id).subscribe({
      next: (accessToken) => {
        console.log(accessToken);
        this.getAllAccessTokens();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }
}
