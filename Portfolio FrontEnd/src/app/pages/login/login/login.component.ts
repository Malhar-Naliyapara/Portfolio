import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  title = "Login";
  hide = true;
  checked = true;
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  onSubmit() {
    this.spinner.show();
    this.loginService.login(this.loginForm.value).subscribe({
      next: async (users) => {
        localStorage.setItem("access_token", users.token);
        this.spinner.hide();
        await this.router.navigate(["../home"], { relativeTo: this.route });
      },
      error: async (error) => {
        console.log(error);
        this.spinner.hide();
        await this.router.navigate(["../login"], { relativeTo: this.route });
      },
    });
  }
}
