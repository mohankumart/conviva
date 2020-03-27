import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  isAllCustomersLoadedInit = false;
  customersList = [];
  totalCount: number;
  numberOfPages = 1;
  pageList = [];
  constructor(private customersService: CustomersService,
              private router: Router,
              private route: ActivatedRoute,
              private logger: LoggerService) {
  }

  ngOnInit(): void {
    this.customersList.length = 0;
    this.route.queryParams.subscribe( (params: any) => {
      this.getInitialData(params.page);
    });
  }

  getInitialData(page: number) {
    this.customersService.getCustomerCount().subscribe(
      (count) => {
        this.totalCount = count;
        this.numberOfPages = Math.floor(this.totalCount / 5);
        this.pageList = this.customersService.range(1, this.numberOfPages, 1);
        this.getAllCustomers(page);
      }
    );
  }

  goToPage(page: number) {
    this.router.navigate(['/customers'], { queryParams: { page } });
  }

  getAllCustomers(page: number) {
    this.customersService.getAllCustomers(page).subscribe(
      (response: HttpEvent<any>) => {
        if (response.type === HttpEventType.Sent) {
          this.isAllCustomersLoadedInit = true;
        } else if (response.type === HttpEventType.Response) {
          this.isAllCustomersLoadedInit = false;
          if (response.body.length) {
            this.customersList = response.body;
          } else {
            this.customersList = [];
          }
        }
      },
      (errorObj) => {
        this.isAllCustomersLoadedInit = false;
        this.logger.warn(JSON.stringify(errorObj));
      }
    );
  }

  showAddresses(id: number) {
    this.router.navigateByUrl(`/customers/${id}`);
  }

}
