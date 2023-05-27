import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { TechnologyService } from "src/app/services/technology.service";

@Component({
  selector: "app-technology-list",
  templateUrl: "./technology-list.component.html",
  styleUrls: ["./technology-list.component.scss"],
})
export class TechnologyListComponent implements OnInit {
  title = "Technology List";
  displayedColumns: string[] = ["id", "name", "createdAt", "action"];
  technologyData: any;

  constructor(
    private technologyService: TechnologyService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAlltechnologys();
  }

  getAlltechnologys() {
    this.technologyService.getAllTechnologies().subscribe({
      next: (technologys) => {
        this.technologyData = technologys.data;
        console.log(technologys.data);
        this.technologyData = this.technologyData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editTechnology/", id]);
  }

  onDelete(id: string) {
    this.technologyService.deleteTechnology(id).subscribe({
      next: (technology) => {
        console.log(technology);
        this.getAlltechnologys();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
