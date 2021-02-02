import {
  Injectable,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  Observable,
  NgxSpinnerService,
  ToastrService,
  MainService,
  Router
} from '../index';
import 'rxjs/add/operator/do';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: MainService,
    private router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('interceptor intercept ')
    this.spinner.show();
    request = request.clone({
      setHeaders: {}
    });

    return next.handle(request).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
          if (
            event.body.responseCode === 200 ||
            event.body.responseCode === 201 ||
            event.body.responseCode === 204 ||
            event.body.responseCode === 404
          ) {
          } else {
            if (
              event.body.responseCode === 401 ||
              event.body.responseCode === 403
            ) {
              this.toastr.error(event.body.responseMessage);
              this.service.removeStorage('userDetailYala');
              this.router.navigate(['/landing/login']);
            } else {
              this.toastr.error(event.body.responseMessage);
            }
          }
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.spinner.hide();
          this.toastr.error(`Something went wrong`);
        }
      }
    );
  }
}
