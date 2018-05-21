'use strict';
import { ConfigService } from 'ng2-ui-auth';
import { environment } from '../../../environments/environment';

export const SRPConfig = {
  
  defaultHeaders : {
    'Content-Type': 'application/json'
  },
  
  loginUrl : `${environment.baseUrl}/api/login`,
  
  signupUrl : `${environment.baseUrl}/api/login`,
  
  unlinkUrl : `${environment.baseUrl}/api/unlink`,
  
  refreshUrl : `${environment.baseUrl}/api/refresh`
}
