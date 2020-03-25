import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private allCustomersUrl = 'http://localhost:8080/api/customer/list';
  private customerUrl = 'http://localhost:8080/api/customer/';
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

  getCustomerById(customer_id) {
    return this.httpClient.get(`${this.customerUrl}${customer_id}`, {
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





