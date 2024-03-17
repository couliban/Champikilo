import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VingtEtUnComponent } from './vingt-et-un.component';

describe('VingtEtUnComponent', () => {
  let component: VingtEtUnComponent;
  let fixture: ComponentFixture<VingtEtUnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VingtEtUnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VingtEtUnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
