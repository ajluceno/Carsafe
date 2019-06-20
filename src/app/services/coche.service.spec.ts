import { TestBed } from '@angular/core/testing';

import { CocheService } from './coche.service';

describe('CocheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CocheService = TestBed.get(CocheService);
    expect(service).toBeTruthy();
  });
});
