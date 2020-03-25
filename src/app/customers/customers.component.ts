import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  isAllCustomersLoadedInit = false;
  customersList = [];
  constructor(private customersService: CustomersService, private router: Router) { }

  ngOnInit(): void {
    this.customersList.length = 0;
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customersService.getAllCustomers().subscribe(
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
      }
    );
  }

  showAddresses(id: number) {
    this.router.navigateByUrl(`/customers/${id}`);
  }

}
