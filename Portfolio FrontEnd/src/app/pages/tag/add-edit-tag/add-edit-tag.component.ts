import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TagService } from "src/app/services/tag.service";

@Component({
  selector: "app-add-edit-tag",
  templateUrl: "./add-edit-tag.component.html",
  styleUrls: ["./add-edit-tag.component.scss"],
})
export class AddEditTagComponent implements OnInit {
  addTitle = "Add Tag";
  editTitle = "Edit Tag";
  checked = true;
  isAdd = true;
  tagId!: string;
  tagForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });

  constructor(
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.tagId = this.route.snapshot.params["id"];
    if (this.tagId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.gettagById(this.tagId);
    }
  }

  gettagById(id: string) {
    this.tagService.getTagbyId(id).subscribe({
      next: (tag) => {
        console.log(tag);

        this.tagForm.patchValue({
          name: tag.data.name,
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
    this.tagService.createTag(this.tagForm.value).subscribe({
      next: async (tag) => {
        console.log(tag);
        await this.router.navigate(["../tags"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../tags"], {
          relativeTo: this.route,
        });
      },
    });

    console.log(this.tagForm.value);
  }

  onEdit() {
    const data = {
      _id: this.tagId,
      data: this.tagForm.value,
    };
    this.tagService.updateTag(data).subscribe({
      next: async (tag) => {
        console.log(tag);
        await this.router.navigate(["../../tags"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../../tags"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
