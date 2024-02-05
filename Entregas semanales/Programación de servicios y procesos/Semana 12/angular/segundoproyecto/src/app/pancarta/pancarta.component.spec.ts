import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PancartaComponent } from './pancarta.component';

describe('PancartaComponent', () => {
  let component: PancartaComponent;
  let fixture: ComponentFixture<PancartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PancartaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PancartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
