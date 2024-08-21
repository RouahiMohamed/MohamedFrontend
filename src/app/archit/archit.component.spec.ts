import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitComponent } from './archit.component';

describe('ArchitComponent', () => {
  let component: ArchitComponent;
  let fixture: ComponentFixture<ArchitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
