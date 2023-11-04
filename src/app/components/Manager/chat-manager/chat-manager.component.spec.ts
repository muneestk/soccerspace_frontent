import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatManagerComponent } from './chat-manager.component';

describe('ChatManagerComponent', () => {
  let component: ChatManagerComponent;
  let fixture: ComponentFixture<ChatManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatManagerComponent]
    });
    fixture = TestBed.createComponent(ChatManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
