import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (!authToken) {
      this.authService.doLogout();
    }
    req = req.clone({
      setHeaders: {
        authorization: "Bearer " + authToken,
      },
    });
    return next.handle(req);
  }
}
