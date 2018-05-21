/* tslint:disable:no-unused-variable */
import { TestBed, inject } from "@angular/core/testing";
import { PageLoadingService } from "./page-loading.service";

describe( 'PageLoadingService', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
                                      providers: [ PageLoadingService ]
                                    } );
  } );
  
  it( 'should be instantiated', inject( [ PageLoadingService ], ( service: PageLoadingService ) => {
    expect( service ).toBeTruthy();
  } ) );
} );
