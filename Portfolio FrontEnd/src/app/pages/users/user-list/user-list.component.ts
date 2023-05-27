import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "email", "createdAt", "action"];
  userData: any;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.userData = users.data;
        console.log(users.data);
        this.userData = this.userData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editUser/", id]);
  }

  onDelete(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (user) => {
        console.log(user);
        this.getAllUsers();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
