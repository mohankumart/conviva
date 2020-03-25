import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  isAllAddressesLoadedInit = false;
  addressesList: any;
  constructor(private addressSefvice: AddressesService) { }

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses() {
    this.addressSefvice.getAddresses(4).subscribe(
      (response: HttpEvent<object>) => {
        if (response.type === HttpEventType.Sent) {
          this.isAllAddressesLoadedInit = true;
        } else if (response.type === HttpEventType.Response) {
          this.isAllAddressesLoadedInit = false;
          this.addressesList = response.body;
        }
      },
      (errorObj) => {
        this.isAllAddressesLoadedInit = false;
      }
    );
  }

}



