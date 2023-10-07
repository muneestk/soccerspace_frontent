import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprouvalsComponent } from './approuvals.component';

describe('ApprouvalsComponent', () => {
  let component: ApprouvalsComponent;
  let fixture: ComponentFixture<ApprouvalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprouvalsComponent]
    });
    fixture = TestBed.createComponent(ApprouvalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
