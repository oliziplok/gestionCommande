import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurLayoutComponent } from './fournisseur-layout.component';

describe('FournisseurLayoutComponent', () => {
  let component: FournisseurLayoutComponent;
  let fixture: ComponentFixture<FournisseurLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisseurLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
