import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../customers/customers.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  isAllAddressesLoadedInit = false;
  addressesList = [];
  customerName: string;

  constructor(private addressService: AddressesService,
              private route: ActivatedRoute,
              private customerService: CustomersService) { }

  ngOnInit(): void {
    this.addressesList.length = 0;
    this.getAddresses();
    this.getCustomerDetails();
  }

  getAddresses() {
    this.addressService.getAddresses(this.route.snapshot.paramMap.get('id')).subscribe(
      (response: HttpEvent<any>) => {
        if (response.type === HttpEventType.Sent) {
          this.isAllAddressesLoadedInit = true;
        } else if (response.type === HttpEventType.Response) {
          this.isAllAddressesLoadedInit = false;
          if (response.body.length) {
            this.addressesList = response.body;
          } else {
            this.addressesList = [];
          }
        }
      },
      (errorObj) => {
        this.isAllAddressesLoadedInit = false;
      }
    );
  }

  getCustomerDetails() {
    this.customerService.getCustomerById(this.route.snapshot.paramMap.get('id')).subscribe(
      (response: HttpEvent<any>) => {
        if (response.type === HttpEventType.Sent) {
        } else if (response.type === HttpEventType.Response) {
          this.customerName = response.body.name;
        }
      },
      (errorObj) => {
      }
    );
  }

}



