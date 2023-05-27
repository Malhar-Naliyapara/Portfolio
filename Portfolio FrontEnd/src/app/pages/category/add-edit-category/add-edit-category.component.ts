import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-add-edit-category",
  templateUrl: "./add-edit-category.component.html",
  styleUrls: ["./add-edit-category.component.scss"],
})
export class AddEditCategoryComponent implements OnInit {
  addTitle = "Add Category";
  editTitle = "Edit Category";
  checked = true;
  isAdd = true;
  categoryId!: string;
  categoryForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.categoryId = this.route.snapshot.params["id"];
    if (this.categoryId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.getcategoryById(this.categoryId);
    }
  }

  getcategoryById(id: string) {
    this.spinner.show();
    this.categoryService.getCategorybyId(id).subscribe({
      next: (category) => {
        console.log(category);

        this.categoryForm.patchValue({
          name: category.data.name,
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
    this.categoryService.createCategory(this.categoryForm.value).subscribe({
      next: async (category) => {
        console.log(category);
        this.spinner.hide();
        await this.router.navigate(["../category"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        this.spinner.hide();
        await this.router.navigate(["../category"], {
          relativeTo: this.route,
        });
      },
    });

    console.log(this.categoryForm.value);
  }

  onEdit() {
    this.spinner.show();
    const data = {
      _id: this.categoryId,
      data: this.categoryForm.value,
    };
    this.categoryService.updateCategory(data).subscribe({
      next: async (category) => {
        console.log(category);
        this.spinner.hide();
        await this.router.navigate(["../../category"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        this.spinner.hide();
        await this.router.navigate(["../../category"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
