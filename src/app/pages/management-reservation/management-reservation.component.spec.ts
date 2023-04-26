import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementReservationComponent } from './management-reservation.component';

describe('ManagementReservationComponent', () => {
  let component: ManagementReservationComponent;
  let fixture: ComponentFixture<ManagementReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
