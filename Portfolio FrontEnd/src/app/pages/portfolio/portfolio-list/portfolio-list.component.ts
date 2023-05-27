import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { PortfolioService } from "src/app/services/portfolio.service";

@Component({
  selector: "app-portfolio-list",
  templateUrl: "./portfolio-list.component.html",
  styleUrls: ["./portfolio-list.component.scss"],
})
export class PortfolioListComponent implements OnInit {
  title = "Portfolio List";
  displayedColumns: string[] = [
    "title",
    "image",
    "content",
    "technology",
    "siteLink",
    "displayIndex",
    "projectOpened",
    "action",
  ];
  portfolioData: any;

  constructor(
    private portfolioService: PortfolioService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllportfolios();
  }

  getAllportfolios() {
    this.portfolioService.getAllPortfolios().subscribe({
      next: (portfolios) => {
        this.portfolioData = portfolios.data;
        console.log(portfolios.data);
        this.portfolioData = this.portfolioData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editPortfolio/", id]);
  }

  onDelete(id: string) {
    this.portfolioService.deletePortfolio(id).subscribe({
      next: (portfolio) => {
        console.log(portfolio);
        this.getAllportfolios();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
