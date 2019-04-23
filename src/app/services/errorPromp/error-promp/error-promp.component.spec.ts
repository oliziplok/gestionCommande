import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPrompComponent } from './error-promp.component';

describe('ErrorPrompComponent', () => {
  let component: ErrorPrompComponent;
  let fixture: ComponentFixture<ErrorPrompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPrompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPrompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
