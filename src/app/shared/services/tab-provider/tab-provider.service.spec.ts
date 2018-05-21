/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TabProviderService } from './tab-provider.service';

describe('TabProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabProviderService]
    });
  });

  it('should ...', inject([TabProviderService], (service: TabProviderService) => {
    expect(service).toBeTruthy();
  }));
});
