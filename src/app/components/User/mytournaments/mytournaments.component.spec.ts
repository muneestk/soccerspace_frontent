import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytournamentsComponent } from './mytournaments.component';

describe('MytournamentsComponent', () => {
  let component: MytournamentsComponent;
  let fixture: ComponentFixture<MytournamentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MytournamentsComponent]
    });
    fixture = TestBed.createComponent(MytournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
