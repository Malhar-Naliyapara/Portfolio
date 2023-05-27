import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlertsComponent } from "./components/alerts/alerts.component";
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { ChipsComponent } from "./components/chips/chips.component";
import { ExpansionComponent } from "./components/expansion/expansion.component";
import { FormsComponent } from "./components/forms/forms.component";
import { GridListComponent } from "./components/grid-list/grid-list.component";
import { MenuComponent } from "./components/menu/menu.component";
import { ProgressSnipperComponent } from "./components/progress-snipper/progress-snipper.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { SlideToggleComponent } from "./components/slide-toggle/slide-toggle.component";
import { SliderComponent } from "./components/slider/slider.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { TabsComponent } from "./components/tabs/tabs.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { TooltipsComponent } from "./components/tooltips/tooltips.component";
import { ProductComponent } from "./dashboard/dashboard-components/product/product.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FullComponent } from "./layouts/full/full.component";
import { UserListComponent } from "./pages/users/user-list/user-list.component";
import { UsersComponent } from "./pages/users/addEditUser/users.component";
import { ClientListComponent } from "./pages/client/client-list/client-list.component";
import { AddEditClientComponent } from "./pages/client/add-edit-client/add-edit-client.component";
import { CategoryListComponent } from "./pages/category/category-list/category-list.component";
import { AddEditCategoryComponent } from "./pages/category/add-edit-category/add-edit-category.component";
import { PackageListComponent } from "./pages/package/package-list/package-list.component";
import { AddEditPackageComponent } from "./pages/package/add-edit-package/add-edit-package.component";
import { PaymentMethodListComponent } from "./pages/paymentMethod/payment-method-list/payment-method-list.component";
import { AddEditPaymentMethodComponent } from "./pages/paymentMethod/add-edit-payment-method/add-edit-payment-method.component";
import { TagListComponent } from "./pages/tag/tag-list/tag-list.component";
import { AddEditTagComponent } from "./pages/tag/add-edit-tag/add-edit-tag.component";
import { TechnologyListComponent } from "./pages/technology/technology-list/technology-list.component";
import { AddEditTechnologyComponent } from "./pages/technology/add-edit-technology/add-edit-technology.component";
import { ServerListComponent } from "./pages/server/server-list/server-list.component";
import { AddEditServerComponent } from "./pages/server/add-edit-server/add-edit-server.component";
import { PortfolioListComponent } from "./pages/portfolio/portfolio-list/portfolio-list.component";
import { AddEditPortfolioComponent } from "./pages/portfolio/add-edit-portfolio/add-edit-portfolio.component";
import { LoginComponent } from "./pages/login/login/login.component";
import { AuthGuard } from "./guard/auth.guard";
import { AccessTokenListComponent } from "./pages/accessToken/access-token-list/access-token-list.component";
import { AddEditAccessTokenComponent } from "./pages/accessToken/add-edit-access-token/add-edit-access-token.component";
import { ThemeListComponent } from "./pages/theme/theme-list/theme-list.component";
import { AddEditThemeComponent } from "./pages/theme/add-edit-theme/add-edit-theme.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "home", component: DashboardComponent },
      { path: "alerts", component: AlertsComponent },
      { path: "forms", component: FormsComponent },
      { path: "table", component: ProductComponent },
      { path: "grid-list", component: GridListComponent },
      { path: "menu", component: MenuComponent },
      { path: "tabs", component: TabsComponent },
      { path: "expansion", component: ExpansionComponent },
      { path: "chips", component: ChipsComponent },
      { path: "progress", component: ProgressComponent },
      { path: "toolbar", component: ToolbarComponent },
      { path: "progress-snipper", component: ProgressSnipperComponent },
      { path: "snackbar", component: SnackbarComponent },
      { path: "slider", component: SliderComponent },
      { path: "slide-toggle", component: SlideToggleComponent },
      { path: "tooltip", component: TooltipsComponent },
      { path: "button", component: ButtonsComponent },
      { path: "users", component: UserListComponent },
      { path: "addUser", component: UsersComponent },
      { path: "editUser/:id", component: UsersComponent },
      { path: "clients", component: ClientListComponent },
      { path: "addClient", component: AddEditClientComponent },
      { path: "editClient/:id", component: AddEditClientComponent },
      { path: "category", component: CategoryListComponent },
      { path: "addCategory", component: AddEditCategoryComponent },
      { path: "editCategory/:id", component: AddEditCategoryComponent },
      { path: "packages", component: PackageListComponent },
      { path: "addPackage", component: AddEditPackageComponent },
      { path: "editPackage/:id", component: AddEditPackageComponent },
      { path: "paymentMethods", component: PaymentMethodListComponent },
      { path: "addPaymentMethod", component: AddEditPaymentMethodComponent },
      {
        path: "editPaymentMethod/:id",
        component: AddEditPaymentMethodComponent,
      },
      { path: "tags", component: TagListComponent },
      { path: "addTag", component: AddEditTagComponent },
      { path: "editTag/:id", component: AddEditTagComponent },
      { path: "technology", component: TechnologyListComponent },
      { path: "addTechnology", component: AddEditTechnologyComponent },
      { path: "editTechnology/:id", component: AddEditTechnologyComponent },
      { path: "servers", component: ServerListComponent },
      { path: "addServer", component: AddEditServerComponent },
      { path: "editServer/:id", component: AddEditServerComponent },
      { path: "portfolios", component: PortfolioListComponent },
      { path: "addPortfolio", component: AddEditPortfolioComponent },
      { path: "editPortfolio/:id", component: AddEditPortfolioComponent },
      { path: "accessToken", component: AccessTokenListComponent },
      { path: "addAccessToken", component: AddEditAccessTokenComponent },
      { path: "editAccessToken/:id", component: AddEditAccessTokenComponent },
      { path: "themes", component: ThemeListComponent },
      { path: "addTheme", component: AddEditThemeComponent },
      { path: "editTheme/:id", component: AddEditThemeComponent },
    ],
  },

  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
