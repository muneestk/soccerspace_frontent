import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FxtureComponent } from './fxture.component';

describe('FxtureComponent', () => {
  let component: FxtureComponent;
  let fixture: ComponentFixture<FxtureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FxtureComponent]
    });
    fixture = TestBed.createComponent(FxtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
