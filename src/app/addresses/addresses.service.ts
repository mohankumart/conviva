import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  private addressesUrl = 'http://localhost:8080/api/address/';
  constructor(private httpClient: HttpClient) { }

  getAddresses(customer_id) {
    return this.httpClient.get(`${this.addressesUrl}${customer_id}`, {
      observe: 'events',
      headers
    }).pipe(
        map(
            (response) => {
                return response;
            }
        ),
        catchError(errorRes => {
            return throwError(errorRes);
        })
    );
  }
}



