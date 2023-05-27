import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  hide = true;
  checked = true;
  isAdd = true;
  userId!: string;
  userForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["id"];
    if (this.userId) {
      this.isAdd = false;
      this.userService.getUserbyId(this.userId).subscribe({
        next: (user) => {
          this.userForm.patchValue({
            name: user.data.name,
            email: user.data.email,
            password: user.data.password,
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  onSubmit() {
    if (this.isAdd) {
      this.onAdd();
    } else {
      this.onEdit();
    }
  }

  onAdd() {
    this.userService.createUser(this.userForm.value).subscribe({
      next: async (users) => {
        console.log(users);
        await this.router.navigate(["../users"], { relativeTo: this.route });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../users"], { relativeTo: this.route });
      },
    });

    console.log(this.userForm.value);
  }

  onEdit() {
    const data = {
      _id: this.userId,
      data: this.userForm.value,
    };
    this.userService.updateUser(data).subscribe({
      next: async (users) => {
        console.log(users);
        await this.router.navigate(["../../users"], { relativeTo: this.route });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../../users"], { relativeTo: this.route });
      },
    });
  }
}
