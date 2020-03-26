import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private allCustomersUrl = '/api/customer/list';
  private customerUrl = '/api/customer/';
  constructor(private httpClient: HttpClient) { }

  getAllCustomers() {
    return this.httpClient.get(this.allCustomersUrl, {
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

  getCustomerById(customerId: any) {
    return this.httpClient.get(`${this.customerUrl}${customerId}`, {
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

  getCustomerByIdTesting(customerId: any): Observable<any> {
     return this.httpClient.get(`${this.customerUrl}${customerId}`);
   }
}






