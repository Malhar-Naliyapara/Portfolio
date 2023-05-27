import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: "app-theme-list",
  templateUrl: "./theme-list.component.html",
  styleUrls: ["./theme-list.component.scss"],
})
export class ThemeListComponent implements OnInit {
  title = "Theme List";
  displayedColumns: string[] = ["id", "name", "createdAt", "action"];
  themeData: any;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllThemes();
  }

  getAllThemes() {
    this.themeService.getAllThemes().subscribe({
      next: (themes) => {
        this.themeData = themes.data;
        console.log(themes.data);
        this.themeData = this.themeData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editTheme/", id]);
  }

  onDelete(id: string) {
    this.themeService.deleteTheme(id).subscribe({
      next: (theme) => {
        console.log(theme);
        this.getAllThemes();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
