import { TestBed, inject } from '@angular/core/testing';

import { PlanetDefenderCommonService } from './planet-defender-common.service';

describe('PlanetDefenderCommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanetDefenderCommonService]
    });
  });

  it('should be created', inject([PlanetDefenderCommonService], (service: PlanetDefenderCommonService) => {
    expect(service).toBeTruthy();
  }));
});
