import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDefenderCommonComponent } from './planet-defender-common.component';

describe('PlanetDefenderCommonComponent', () => {
  let component: PlanetDefenderCommonComponent;
  let fixture: ComponentFixture<PlanetDefenderCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetDefenderCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetDefenderCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
