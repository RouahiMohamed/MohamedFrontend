import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiskComponent } from './update-disk.component';

describe('UpdateDiskComponent', () => {
  let component: UpdateDiskComponent;
  let fixture: ComponentFixture<UpdateDiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDiskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
