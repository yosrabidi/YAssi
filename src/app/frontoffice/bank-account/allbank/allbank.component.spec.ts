import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbankComponent } from './allbank.component';

describe('AllbankComponent', () => {
  let component: AllbankComponent;
  let fixture: ComponentFixture<AllbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllbankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
