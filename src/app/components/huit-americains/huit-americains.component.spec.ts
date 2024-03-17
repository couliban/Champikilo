import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuitAmericainsComponent } from './huit-americains.component';

describe('HuitAmericainsComponent', () => {
  let component: HuitAmericainsComponent;
  let fixture: ComponentFixture<HuitAmericainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuitAmericainsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuitAmericainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
