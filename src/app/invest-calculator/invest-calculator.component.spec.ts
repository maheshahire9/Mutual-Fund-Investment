import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestCalculatorComponent } from './invest-calculator.component';

describe('InvestCalculatorComponent', () => {
  let component: InvestCalculatorComponent;
  let fixture: ComponentFixture<InvestCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
