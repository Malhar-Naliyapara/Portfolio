import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: "app-add-edit-theme",
  templateUrl: "./add-edit-theme.component.html",
  styleUrls: ["./add-edit-theme.component.scss"],
})
export class AddEditThemeComponent implements OnInit {
  addTitle = "Add Theme";
  editTitle = "Edit Theme";
  checked = true;
  isAdd = true;
  themeId!: string;
  themeForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });

  constructor(
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.themeId = this.route.snapshot.params["id"];
    if (this.themeId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.getthemeById(this.themeId);
    }
  }

  getthemeById(id: string) {
    this.themeService.getThemebyId(id).subscribe({
      next: (theme) => {
        console.log(theme);

        this.themeForm.patchValue({
          name: theme.data.name,
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
    this.themeService.createTheme(this.themeForm.value).subscribe({
      next: async (theme) => {
        console.log(theme);
        await this.router.navigate(["../themes"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../themes"], {
          relativeTo: this.route,
        });
      },
    });

    console.log(this.themeForm.value);
  }

  onEdit() {
    const data = {
      _id: this.themeId,
      data: this.themeForm.value,
    };
    this.themeService.updateTheme(data).subscribe({
      next: async (theme) => {
        console.log(theme);
        await this.router.navigate(["../../themes"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../../themes"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
