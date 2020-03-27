import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { CustomersComponent } from './customers.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { LoggerService } from '../logger.service';
import { DebugElement } from '@angular/core';
import { By } from 'protractor';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersComponent ],
      imports: [ HttpClientModule, AppRoutingModule ],
      providers: [ LoggerService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the customer list', () => {
    component.customersList = [{
      id: 12,
      name: 'mohan',
      age: 32,
      sex: 'male'
    }];
    fixture.detectChanges();
    console.log(el.nativeElement);
    let td = el.nativeElement.querySelector('td');
    expect(td).toBeTruthy();
  });

});
