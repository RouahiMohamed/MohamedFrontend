import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerraformCodeDialogComponent } from './terraform-code-dialog.component';

describe('TerraformCodeDialogComponent', () => {
  let component: TerraformCodeDialogComponent;
  let fixture: ComponentFixture<TerraformCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerraformCodeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerraformCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
