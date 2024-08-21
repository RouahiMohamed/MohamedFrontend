import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetComponent } from './subnet.component';

describe('SubnetComponent', () => {
  let component: SubnetComponent;
  let fixture: ComponentFixture<SubnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubnetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
