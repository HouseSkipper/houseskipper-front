import { TestBed } from '@angular/core/testing';

import { DataaService } from './dataa.service';

describe('DataaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataaService = TestBed.get(DataaService);
    expect(service).toBeTruthy();
  });
});
