import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddUserComponent } from './client-add-user.component';

describe('ClientAddUserComponent', () => {
  let component: ClientAddUserComponent;
  let fixture: ComponentFixture<ClientAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
