/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PremiumPlanServiceService } from './premiumPlanService.service';

describe('Service: PremiumPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PremiumPlanServiceService]
    });
  });

  it('should ...', inject([PremiumPlanServiceService], (service: PremiumPlanServiceService) => {
    expect(service).toBeTruthy();
  }));
});
