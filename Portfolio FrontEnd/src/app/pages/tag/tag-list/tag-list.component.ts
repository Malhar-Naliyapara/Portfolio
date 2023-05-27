import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { TagService } from "src/app/services/tag.service";

@Component({
  selector: "app-tag-list",
  templateUrl: "./tag-list.component.html",
  styleUrls: ["./tag-list.component.scss"],
})
export class TagListComponent implements OnInit {
  title = "Tag List";
  displayedColumns: string[] = ["id", "name", "createdAt", "action"];
  tagData: any;

  constructor(
    private tagService: TagService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllTags();
  }

  getAllTags() {
    this.tagService.getAllTags().subscribe({
      next: (tags) => {
        this.tagData = tags.data;
        console.log(tags.data);
        this.tagData = this.tagData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editTag/", id]);
  }

  onDelete(id: string) {
    this.tagService.deleteTag(id).subscribe({
      next: (tag) => {
        console.log(tag);
        this.getAllTags();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
