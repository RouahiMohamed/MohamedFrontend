import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOsMachineComponent } from './update-os-machine.component';

describe('UpdateOsMachineComponent', () => {
  let component: UpdateOsMachineComponent;
  let fixture: ComponentFixture<UpdateOsMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateOsMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateOsMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
