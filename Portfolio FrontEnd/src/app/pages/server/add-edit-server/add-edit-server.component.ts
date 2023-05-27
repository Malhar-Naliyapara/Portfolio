import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ServerService } from "src/app/services/server.service";

@Component({
  selector: "app-add-edit-server",
  templateUrl: "./add-edit-server.component.html",
  styleUrls: ["./add-edit-server.component.scss"],
})
export class AddEditServerComponent implements OnInit {
  addTitle = "Add Server";
  editTitle = "Edit Server";
  checked = true;
  isAdd = true;
  serverId!: string;
  serverForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });

  constructor(
    private serverService: ServerService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.addTitle);
    this.serverId = this.route.snapshot.params["id"];
    if (this.serverId) {
      this.titleService.setTitle(this.editTitle);
      this.isAdd = false;
      this.getserverById(this.serverId);
    }
  }

  getserverById(id: string) {
    this.serverService.getServerbyId(id).subscribe({
      next: (server) => {
        console.log(server);

        this.serverForm.patchValue({
          name: server.data.name,
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
    this.serverService.createServer(this.serverForm.value).subscribe({
      next: async (server) => {
        console.log(server);
        await this.router.navigate(["../servers"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../servers"], {
          relativeTo: this.route,
        });
      },
    });

    console.log(this.serverForm.value);
  }

  onEdit() {
    const data = {
      _id: this.serverId,
      data: this.serverForm.value,
    };
    this.serverService.updateServer(data).subscribe({
      next: async (server) => {
        console.log(server);
        await this.router.navigate(["../../servers"], {
          relativeTo: this.route,
        });
      },
      error: async (error) => {
        console.log(error);
        await this.router.navigate(["../../servers"], {
          relativeTo: this.route,
        });
      },
    });
  }
}
