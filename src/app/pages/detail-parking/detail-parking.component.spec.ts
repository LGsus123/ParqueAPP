import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailParkingComponent } from './detail-parking.component';

describe('DetailParkingComponent', () => {
  let component: DetailParkingComponent;
  let fixture: ComponentFixture<DetailParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailParkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
