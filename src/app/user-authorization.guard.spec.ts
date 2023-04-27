import { TestBed } from '@angular/core/testing';

import { UserAuthorizationGuard } from './user-authorization.guard';

describe('UserAuthorizationGuard', () => {
  let guard: UserAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
