import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitsClientComponent } from './liste-produits-client.component';

describe('ListeProduitsClientComponent', () => {
  let component: ListeProduitsClientComponent;
  let fixture: ComponentFixture<ListeProduitsClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProduitsClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProduitsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
