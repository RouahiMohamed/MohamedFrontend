import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsMachineComponent } from './os-machine.component';

describe('OsMachineComponent', () => {
  let component: OsMachineComponent;
  let fixture: ComponentFixture<OsMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OsMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OsMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
