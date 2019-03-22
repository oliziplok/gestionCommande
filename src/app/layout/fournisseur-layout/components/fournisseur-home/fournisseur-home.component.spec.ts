import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurHomeComponent } from './fournisseur-home.component';

describe('FournisseurHomeComponent', () => {
  let component: FournisseurHomeComponent;
  let fixture: ComponentFixture<FournisseurHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisseurHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
