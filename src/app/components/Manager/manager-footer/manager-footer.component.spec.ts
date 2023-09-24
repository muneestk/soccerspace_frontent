import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFooterComponent } from './manager-footer.component';

describe('ManagerFooterComponent', () => {
  let component: ManagerFooterComponent;
  let fixture: ComponentFixture<ManagerFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerFooterComponent]
    });
    fixture = TestBed.createComponent(ManagerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
