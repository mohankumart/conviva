import { TestBed } from '@angular/core/testing';
import { CustomersService, Customer } from './customers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { LoggerService } from '../logger.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';

describe('CustomersService', () => {
  let service: CustomersService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ LoggerService ]
    });
    service = TestBed.inject(CustomersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('generate random number array' , () => {
    expect(service.range(1, 2, 1).length).toEqual(2, 'unexpected range genearted');
  });

  it('returned the customer data', () => {
    const mockCustomer = {
      id: 4,
      name: 'c1',
      age: 33,
      sex: 'male'
    };

    service.getCustomerById(4).subscribe((response: HttpEvent<any>) => {
      if (response.type === HttpEventType.Response) {
        expect(response.body.name).toEqual('c1');
      }
    });

    const req = httpMock.expectOne(
        '/api/customer/4'
    );

    req.flush(mockCustomer);


  });

});
