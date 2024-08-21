import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationGatewayComponent } from './application-gateway.component';

describe('ApplicationGatewayComponent', () => {
  let component: ApplicationGatewayComponent;
  let fixture: ComponentFixture<ApplicationGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationGatewayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
