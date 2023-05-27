import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  title = "Categories List";
  displayedColumns: string[] = ["id", "name", "createdAt", "action"];
  categoryData: any;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllCategories();
  }

  getAllCategories() {
    this.spinner.show();
    this.categoryService.getAllCategories().subscribe({
      next: (categorys) => {
        this.categoryData = categorys.data;
        console.log(categorys.data);
        this.categoryData = this.categoryData;
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editCategory/", id]);
  }

  onDelete(id: string) {
    this.spinner.show();
    this.categoryService.deleteCategory(id).subscribe({
      next: (category) => {
        console.log(category);
        this.getAllCategories();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }
}
