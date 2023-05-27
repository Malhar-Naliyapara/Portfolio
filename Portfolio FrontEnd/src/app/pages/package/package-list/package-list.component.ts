import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { PackagesService } from "src/app/services/packages.service";

@Component({
  selector: "app-package-list",
  templateUrl: "./package-list.component.html",
  styleUrls: ["./package-list.component.scss"],
})
export class PackageListComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "createdAt", "action"];
  packageData: any;
  title = "Package List";

  constructor(
    private packageService: PackagesService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllPackages();
  }

  getAllPackages() {
    this.packageService.getAllPackages().subscribe({
      next: (packages) => {
        this.packageData = packages.data;
        console.log(packages.data);
        this.packageData = this.packageData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editPackage/", id]);
  }

  onDelete(id: string) {
    this.packageService.deletePackage(id).subscribe({
      next: (packages) => {
        console.log(packages);
        this.getAllPackages();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
