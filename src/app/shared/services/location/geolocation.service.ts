import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

const GEOLOCATION_ERRORS = {
    'errors.location.unsupportedBrowser': 'Browser does not support location services',
    'errors.location.permissionDenied': 'You have rejected access to your location',
    'errors.location.positionUnavailable': 'Unable to determine your location',
    'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class GeolocationService {

    private address = '';
    private geocoder = null;

    constructor(private mapsAPILoader: MapsAPILoader) {
        this.mapsAPILoader.load().then(() => {
            this.geocoder = new google.maps.Geocoder();
        });
    }

    /**
     * Obtains the geographic position, in terms of latitude and longitude coordinates, of the device.
     * @param {Object} [opts] An object literal to specify one or more of the following attributes and desired values:
     *   - enableHighAccuracy: Specify true to obtain the most accurate position possible, or false to optimize in favor of performance and power consumption.
     *   - timeout: An Integer value that indicates the time, in milliseconds, allowed for obtaining the position.
     *              If timeout is Infinity, (the default value) the location request will not time out.
     *              If timeout is zero (0) or negative, the results depend on the behavior of the location provider.
     *   - maximumAge: An Integer value indicating the maximum age, in milliseconds, of cached position information.
     *                 If maximumAge is non-zero, and a cached position that is no older than maximumAge is available, the cached position is used instead of obtaining an updated location.
     *                 If maximumAge is zero (0), watchPosition always tries to obtain an updated position, even if a cached position is already available.
     *                 If maximumAge is Infinity, any cached position is used, regardless of its age, and watchPosition only tries to obtain an updated position if no cached position data exists.
     * @returns {Observable} An observable sequence with the geographical location of the device running the client.
     */
    public getLocation(opts): Observable<any> {

        return Observable.create(observer => {
           
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        observer.next(position);
                        observer.complete();
                    },
                    (error) => {
                        switch (error.code) {
                            case 1:
                                observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                                break;
                            case 2:
                                observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                                break;
                            case 3:
                                observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                                break;
                        }
                    },
                    opts);
            }
            else {
                observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }

        });
    }

    public reverseGeocode(lat, long) {
        return Observable.create(observer => {
            if (typeof google == 'undefined') {
                observer.error('');
                return false;
            }

            let latlng = new google.maps.LatLng(lat, long);

            this.geocoder.geocode({ latLng: latlng }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    let storableLocation = { 
                        building: '',
                        street: '',
                        city: '', 
                        state: '', 
                        zip: '', 
                        country: '', 
                        registered_country_iso_code: '',
                        complete_address: ''
                    };

                    for (let ac = 0; ac < results[0].address_components.length; ac++) {
                        let component = results[0].address_components[ac];

                        switch(component.types[0]) {
                            case 'premise':
                                storableLocation.building = component.long_name;
                                break;
                            case 'street_address':
                                storableLocation.street = component.long_name;
                                break;
                            case 'locality':
                                storableLocation.city = component.long_name;
                                break;
                            case 'administrative_area_level_1':
                                storableLocation.state = component.short_name;
                                break;
                            case 'postal_code':
                                storableLocation.zip = component.short_name;
                            break;
                            case 'country':
                                storableLocation.country = component.long_name;
                                storableLocation.registered_country_iso_code = component.short_name;
                                break;
                        }
                    };
                    storableLocation.complete_address = results[0].formatted_address;
                    observer.next(storableLocation);
                    observer.complete();
                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});
                    observer.complete();
                }
            });
        })
    }
}

export var geolocationServiceInjectables: Array<any> = [
{ provide: GeolocationService, useClass: GeolocationService }
];