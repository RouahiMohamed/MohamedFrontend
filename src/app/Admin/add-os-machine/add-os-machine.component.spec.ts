import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOsMachineComponent } from './add-os-machine.component';

describe('AddOsMachineComponent', () => {
  let component: AddOsMachineComponent;
  let fixture: ComponentFixture<AddOsMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOsMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOsMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
