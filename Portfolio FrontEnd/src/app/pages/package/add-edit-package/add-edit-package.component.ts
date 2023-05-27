import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { PackagesService } from "src/app/services/packages.service";

@Component({
  selector: "app-add-edit-package",
  templateUrl: "./add-edit-package.component.html",
  styleUrls: ["./add-edit-package.component.scss"],
})
export class AddEditPackageComponent implements OnInit {
  addTitle = "Add Package";
  editTitle = "Edit Package";
  checked = true;
  isAdd = true;
  packageId!: string;
  packageForm = new FormGroup({
    package: new FormControl("", [Validators.required]),
  });

  constructor(
    private packageService: PackagesService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.packageId = this.route.snapshot.params["id"];
    if (this.packageId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.getpackageById(this.packageId);
    }
  }

  getpackageById(id: string) {
    this.packageService.getPackagebyId(id).subscribe({
      next: (packages) => {
        console.log(packages);

        this.packageForm.patchValue({
          package: packages.data.package,
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
    this.packageService.createPackage(this.packageForm.value).subscribe({
      next: async (packages) => {
        console.log(packages);
        await this.router.navigate(["../packages"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../packages"], {
          relativeTo: this.route,
        });
      },
    });

    console.log(this.packageForm.value);
  }

  onEdit() {
    const data = {
      _id: this.packageId,
      data: this.packageForm.value,
    };
    this.packageService.updatePackage(data).subscribe({
      next: async (packages) => {
        console.log(packages);
        await this.router.navigate(["../../packages"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../../packages"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
