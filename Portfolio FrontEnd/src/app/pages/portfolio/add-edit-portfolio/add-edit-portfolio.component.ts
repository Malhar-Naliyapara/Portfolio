import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, startWith } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { PackagesService } from "src/app/services/packages.service";
import { PortfolioService } from "src/app/services/portfolio.service";
import { TagService } from "src/app/services/tag.service";
import { TechnologyService } from "src/app/services/technology.service";

@Component({
  selector: "app-add-edit-portfolio",
  templateUrl: "./add-edit-portfolio.component.html",
  styleUrls: ["./add-edit-portfolio.component.scss"],
})
export class AddEditPortfolioComponent implements OnInit {
  addTitle = "Add Portfolio";
  editTitle = "Edit Portfolio";
  @ViewChild("categoryInput")
  categoryInput!: ElementRef<HTMLInputElement>;
  @ViewChild("tagInput")
  tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild("packageInput")
  packageInput!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  checked = null;
  isAdd = true;
  portfolioId!: string;
  categories: any;
  tags: any;
  technologies: any;
  packages: any;
  categoryObject: any = [];
  tagObject: any = [];
  packageObject: any = [];
  filteredCategories: Observable<any> | undefined;
  filteredTags: Observable<any> | undefined;
  filteredPackages: Observable<any> | undefined;
  portfolioForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    clientName: new FormControl("", [Validators.required]),
    image: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    technology: new FormControl("", [Validators.required]),
    tags: new FormControl("", [Validators.required]),
    webServer: new FormControl("", [Validators.required]),
    theme: new FormControl("", [Validators.required]),
    package: new FormControl("", [Validators.required]),
    paymentMethod: new FormControl("", [Validators.required]),
    multiTheme: new FormControl(false),
    multiSite: new FormControl(false),
    siteDevelopmentDuration: new FormControl("", [Validators.required]),
    addOn: new FormControl("", [Validators.required]),
    siteLink: new FormControl("", [Validators.required]),
    displayIndex: new FormControl("", [Validators.required]),
    projectClosed: new FormControl(false),
    notes: new FormControl("", [Validators.required]),
  });
  srcResult: any;

  constructor(
    private portfolioService: PortfolioService,
    private categoryService: CategoryService,
    private technologyService: TechnologyService,
    private tagsService: TagService,
    private packagesService: PackagesService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.portfolioId = this.route.snapshot.params["id"];
    if (this.portfolioId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.getportfolioById(this.portfolioId);
    }
    this.getAllCategory();
    this.getAllTechnology();
    this.getAllTags();
    this.getAllPackages();
    this.filteredCategories = this.portfolioForm
      .get("category")
      ?.valueChanges.pipe(
        startWith(null),
        map((category: string | null) =>
          category ? this._filterCategory(category) : this.categories
        )
      );
    this.filteredTags = this.portfolioForm.get("tags")?.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filterTag(tag) : this.tags))
    );
    this.filteredPackages = this.portfolioForm
      .get("package")
      ?.valueChanges.pipe(
        startWith(null),
        map((packages: string | null) =>
          packages ? this._filterPackage(packages) : this.packages
        )
      );
  }

  getportfolioById(id: string) {
    this.portfolioService.getPortfoliobyId(id).subscribe({
      next: (portfolio) => {
        this.categoryObject = portfolio.data.category;
        this.tagObject = portfolio.data.tags;
        this.packageObject = portfolio.data.package;
        this.portfolioForm.patchValue({
          title: portfolio.data.title,
          clientName: portfolio.data.clientName,
          image: portfolio.data.image,
          content: portfolio.data.content,
          category: portfolio.data.category,
          technology: portfolio.data.technology,
          tags: portfolio.data.tags,
          webServer: portfolio.data.webServer,
          theme: portfolio.data.theme,
          package: portfolio.data.package,
          paymentMethod: portfolio.data.paymentMethod,
          multiTheme: portfolio.data.multiTheme,
          multiSite: portfolio.data.multiSite,
          siteDevelopmentDuration: portfolio.data.siteDevelopmentDuration,
          addOn: portfolio.data.addOn,
          siteLink: portfolio.data.siteLink,
          displayIndex: portfolio.data.displayIndex,
          projectClosed: portfolio.data.projectClosed,
          notes: portfolio.data.notes,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllCategory() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllTechnology() {
    this.technologyService.getAllTechnologies().subscribe({
      next: (technologies) => {
        this.technologies = technologies.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllTags() {
    this.tagsService.getAllTags().subscribe({
      next: (tags) => {
        this.tags = tags.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllPackages() {
    this.packagesService.getAllPackages().subscribe({
      next: (packages) => {
        this.packages = packages.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our category
    if (value) {
      this.categoryObject.push(value);
    }
    console.log(this.categoryObject);

    // Clear the input value
    event.chipInput!.clear();

    this.portfolioForm.get("category")?.setValue(this.categoryObject);
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our category
    if (value) {
      this.tagObject.push(value);
    }
    console.log(this.tagObject);

    // Clear the input value
    event.chipInput!.clear();

    this.portfolioForm.get("tags")?.setValue(this.tagObject);
  }

  addPackage(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our category
    if (value) {
      this.packageObject.push(value);
    }
    console.log(this.packageObject);

    // Clear the input value
    event.chipInput!.clear();

    this.portfolioForm.get("package")?.setValue(this.packageObject);
  }

  removeCategory(category: string): void {
    const index = this.categoryObject.indexOf(category);

    if (index >= 0) {
      this.categoryObject.splice(index, 1);
    }
  }

  removeTag(tag: string): void {
    const index = this.tagObject.indexOf(tag);

    if (index >= 0) {
      this.tagObject.splice(index, 1);
    }
  }

  removePackage(packages: string): void {
    const index = this.packageObject.indexOf(packages);

    if (index >= 0) {
      this.packageObject.splice(index, 1);
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    this.categoryObject.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = "";
    this.portfolioForm.get("category")?.setValue(this.categoryObject);
    console.log(this.categoryObject);
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.tagObject.push(event.option.viewValue);
    this.tagInput.nativeElement.value = "";
    this.portfolioForm.get("tags")?.setValue(this.tagObject);
    console.log(this.tagObject);
  }

  selectedPackage(event: MatAutocompleteSelectedEvent): void {
    this.packageObject.push(event.option.viewValue);
    this.packageInput.nativeElement.value = "";
    this.portfolioForm.get("package")?.setValue(this.packageObject);
    console.log(this.packageObject);
  }

  private _filterCategory(value: string): string[] {
    const filterValue = value;

    return this.categories.filter((category: any) =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterTag(value: string): string[] {
    const filterValue = value;

    return this.tags.filter((tag: any) =>
      tag.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterPackage(value: string): string[] {
    const filterValue = value;

    return this.packages.filter((packages: any) =>
      packages.package.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    if (this.isAdd) {
      this.onAdd();
    } else {
      this.onEdit();
    }
  }

  onAdd() {
    var image1 = new FormData();
    let finalData = JSON.stringify(this.portfolioForm.value);
    console.log(finalData);

    image1.append("image", this.portfolioForm.get("image")?.value);
    image1.append("data", finalData);
    console.log("In add function : ", image1);
    console.log(this.portfolioForm.get("image")?.value);

    this.portfolioService.createPortfolio(image1).subscribe({
      next: async (portfolio) => {
        console.log(portfolio);
        await this.router.navigate(["../portfolios"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../portfolios"], {
          relativeTo: this.route,
        });
      },
    });
  }

  onEdit() {
    var image = new FormData();
    var data = {
      _id: this.portfolioId,
      data: this.portfolioForm.value,
    };
    let finalData = JSON.stringify(data);
    image.append("image", this.portfolioForm.get("image")?.value);
    image.append("data", finalData);
    console.log(image);

    this.portfolioService.updatePortfolio(image).subscribe({
      next: async (portfolio) => {
        console.log(portfolio);
        await this.router.navigate(["../../portfolios"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../../portfolios"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
