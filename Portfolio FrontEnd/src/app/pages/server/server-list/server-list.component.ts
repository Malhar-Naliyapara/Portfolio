import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { ServerService } from "src/app/services/server.service";

@Component({
  selector: "app-server-list",
  templateUrl: "./server-list.component.html",
  styleUrls: ["./server-list.component.scss"],
})
export class ServerListComponent implements OnInit {
  title = "Server List";
  displayedColumns: string[] = ["id", "name", "createdAt", "action"];
  serverData: any;

  constructor(
    private serverService: ServerService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getAllServers();
  }

  getAllServers() {
    this.serverService.getAllServers().subscribe({
      next: (servers) => {
        this.serverData = servers.data;
        console.log(servers.data);
        this.serverData = this.serverData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate(["../editServer/", id]);
  }

  onDelete(id: string) {
    this.serverService.deleteServer(id).subscribe({
      next: (server) => {
        console.log(server);
        this.getAllServers();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
