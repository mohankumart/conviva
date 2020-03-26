import { TestBed } from '@angular/core/testing';

import { AddressesService } from './addresses.service';
import { HttpClientModule } from '@angular/common/http';

describe('AddressesService', () => {
  let service: AddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(AddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
