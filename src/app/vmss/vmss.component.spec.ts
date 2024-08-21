import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmssComponent } from './vmss.component';

describe('VmssComponent', () => {
  let component: VmssComponent;
  let fixture: ComponentFixture<VmssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VmssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VmssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
