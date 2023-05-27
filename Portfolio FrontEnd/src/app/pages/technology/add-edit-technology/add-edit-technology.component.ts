import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TechnologyService } from "src/app/services/technology.service";

@Component({
  selector: "app-add-edit-technology",
  templateUrl: "./add-edit-technology.component.html",
  styleUrls: ["./add-edit-technology.component.scss"],
})
export class AddEditTechnologyComponent implements OnInit {
  addTitle = "Add Technology";
  editTitle = "Edit Technology";
  checked = true;
  isAdd = true;
  technologyId!: string;
  technologyForm = new FormGroup({
    technology: new FormControl("", [Validators.required]),
  });

  constructor(
    private technologyService: TechnologyService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.technologyId = this.route.snapshot.params["id"];
    if (this.technologyId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.gettechnologyById(this.technologyId);
    }
  }

  gettechnologyById(id: string) {
    this.technologyService.getTechnologybyId(id).subscribe({
      next: (technology) => {
        console.log(technology);

        this.technologyForm.patchValue({
          technology: technology.data.technology,
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
    this.technologyService
      .createTechnology(this.technologyForm.value)
      .subscribe({
        next: async (technology) => {
          console.log(technology);
          await this.router.navigate(["../technology"], {
            relativeTo: this.route,
          });
        },
        error: async (error) => {
          console.log(error);
          await this.router.navigate(["../technology"], {
            relativeTo: this.route,
          });
        },
      });

    console.log(this.technologyForm.value);
  }

  onEdit() {
    const data = {
      _id: this.technologyId,
      data: this.technologyForm.value,
    };
    this.technologyService.updateTechnology(data).subscribe({
      next: async (technology) => {
        console.log(technology);
        await this.router.navigate(["../../technology"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../../technology"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
