import { TestBed } from '@angular/core/testing';
import { CustomersService } from './customers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
interface Customer {
  id: number;
  name: string;
  sex: string;
  age: number;
}

describe('CustomersService', () => {
  let service: CustomersService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CustomersService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returned the customer data', () => {
    const mockCustomer = {
      id: 4,
      name: 'c1',
      age: 33,
      sex: 'male'
    }

    service.getCustomerByIdTesting(4).subscribe((customerData: any) => {
      expect(customerData.name).toEqual('c1');
    });


    const req = httpMock.expectOne(
        '/api/customer/4'
    );

    req.flush(mockCustomer);


  });




});
