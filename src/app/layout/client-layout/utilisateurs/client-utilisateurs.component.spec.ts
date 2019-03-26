import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUtilisateursComponent } from './client-utilisateurs.component';

describe('ClientUtilisateursComponent', () => {
  let component: ClientUtilisateursComponent;
  let fixture: ComponentFixture<ClientUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientUtilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
