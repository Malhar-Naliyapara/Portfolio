import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FeatherModule } from "angular-feather";
import { allIcons } from "angular-feather/icons";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FullComponent } from "./layouts/full/full.component";
import { DemoFlexyModule } from "./demo-flexy-module";

// Modules
import { DashboardModule } from "./dashboard/dashboard.module";
import { ComponentsModule } from "./components/components.module";
import { UsersComponent } from "./pages/users/addEditUser/users.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserListComponent } from "./pages/users/user-list/user-list.component";
import { ClientListComponent } from "./pages/client/client-list/client-list.component";
import { AddEditClientComponent } from "./pages/client/add-edit-client/add-edit-client.component";
import { CategoryListComponent } from "./pages/category/category-list/category-list.component";
import { AddEditCategoryComponent } from "./pages/category/add-edit-category/add-edit-category.component";
import { PackageListComponent } from "./pages/package/package-list/package-list.component";
import { AddEditPackageComponent } from "./pages/package/add-edit-package/add-edit-package.component";
import { PaymentMethodListComponent } from "./pages/paymentMethod/payment-method-list/payment-method-list.component";
import { AddEditPaymentMethodComponent } from "./pages/paymentMethod/add-edit-payment-method/add-edit-payment-method.component";
import { PortfolioListComponent } from "./pages/portfolio/portfolio-list/portfolio-list.component";
import { AddEditPortfolioComponent } from "./pages/portfolio/add-edit-portfolio/add-edit-portfolio.component";
import { ServerListComponent } from "./pages/server/server-list/server-list.component";
import { AddEditServerComponent } from "./pages/server/add-edit-server/add-edit-server.component";
import { TagListComponent } from "./pages/tag/tag-list/tag-list.component";
import { AddEditTagComponent } from "./pages/tag/add-edit-tag/add-edit-tag.component";
import { TechnologyListComponent } from "./pages/technology/technology-list/technology-list.component";
import { AddEditTechnologyComponent } from "./pages/technology/add-edit-technology/add-edit-technology.component";
import { ThemeListComponent } from "./pages/theme/theme-list/theme-list.component";
import { AddEditThemeComponent } from "./pages/theme/add-edit-theme/add-edit-theme.component";
import { LoginComponent } from "./pages/login/login/login.component";
import { AccessTokenListComponent } from "./pages/accessToken/access-token-list/access-token-list.component";
import { AddEditAccessTokenComponent } from "./pages/accessToken/add-edit-access-token/add-edit-access-token.component";
import { AuthconfigInterceptor } from "./auth/authconfig.interceptor";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    UsersComponent,
    UserListComponent,
    ClientListComponent,
    AddEditClientComponent,
    CategoryListComponent,
    AddEditCategoryComponent,
    PackageListComponent,
    AddEditPackageComponent,
    PaymentMethodListComponent,
    AddEditPaymentMethodComponent,
    PortfolioListComponent,
    AddEditPortfolioComponent,
    ServerListComponent,
    AddEditServerComponent,
    TagListComponent,
    AddEditTagComponent,
    TechnologyListComponent,
    AddEditTechnologyComponent,
    ThemeListComponent,
    AddEditThemeComponent,
    LoginComponent,
    AccessTokenListComponent,
    AddEditAccessTokenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthconfigInterceptor,
      multi: true,
    },
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
