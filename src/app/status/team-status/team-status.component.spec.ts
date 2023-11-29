import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStatusComponent } from './team-status.component';

describe('TeamStatusComponent', () => {
  let component: TeamStatusComponent;
  let fixture: ComponentFixture<TeamStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamStatusComponent]
    });
    fixture = TestBed.createComponent(TeamStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
