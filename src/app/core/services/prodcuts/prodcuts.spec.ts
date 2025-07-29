import { TestBed } from '@angular/core/testing';

import { Prodcuts } from './prodcuts';

describe('Prodcuts', () => {
  let service: Prodcuts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prodcuts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
