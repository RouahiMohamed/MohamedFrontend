import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceGroupComponent } from './ressource-group.component';

describe('RessourceGroupComponent', () => {
  let component: RessourceGroupComponent;
  let fixture: ComponentFixture<RessourceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RessourceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RessourceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
