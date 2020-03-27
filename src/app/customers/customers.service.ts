import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggerService } from '../logger.service';

export interface Customer {
  id: number;
  name: string;
  sex: string;
  age: number;
}

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private allCustomersUrl = '/api/customer/list';
  private customerUrl = '/api/customer/';
  constructor(private httpClient: HttpClient,
              private loggerService: LoggerService) { }

  getAllCustomers(page: number) {
    return this.httpClient.get(`${this.allCustomersUrl}?page=${page}`, {
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

  getCustomerCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.customerUrl}count`);
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

  range(start, stop, step) {
    this.loggerService.log('Range Calculated');
    return Array.from({ length: (stop - start) / step + 1}, (_, i) => {
      return start + (i * step);
    });
  }
}






