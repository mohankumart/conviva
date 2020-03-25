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
  customersList: any;
  constructor(private customersService: CustomersService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customersService.getAllCustomers().subscribe(
      (response: HttpEvent<object>) => {
        if (response.type === HttpEventType.Sent) {
          this.isAllCustomersLoadedInit = true;
        } else if (response.type === HttpEventType.Response) {
          this.isAllCustomersLoadedInit = false;
          this.customersList = response.body;
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
