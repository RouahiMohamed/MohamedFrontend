import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArchitComponent } from './list-archit.component';

describe('ListArchitComponent', () => {
  let component: ListArchitComponent;
  let fixture: ComponentFixture<ListArchitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListArchitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListArchitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
