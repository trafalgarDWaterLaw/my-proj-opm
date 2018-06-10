
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsNavigationComponent } from './actions-navigation.component';

describe('ActionsNavigationComponent', () => {
  let component: ActionsNavigationComponent;
  let fixture: ComponentFixture<ActionsNavigationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
