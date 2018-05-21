import { Injectable } from "@angular/core";
import { AuthService } from 'ng2-ui-auth';
import { environment } from '../../../../environments/environment';
declare const Echo: any;
declare const io: any;

@Injectable()
export class SocketIOService {
  Echo;
  isAvailable: boolean = false;
  
  constructor( private auth: AuthService ) {
    this.isAvailable = typeof io !== undefined;
    if ( this.isAvailable ) {
      try{
        this.Echo = new Echo( {
          broadcaster: 'socket.io',
          host       : environment.socketIOHost,
          auth       : { headers: { 'Authorization': 'Bearer ' + this.auth.getToken() } }
        } );
        this.isAvailable = true;
      }catch(e){
        this.isAvailable = false;
      }
    }
    else {
      console.error("Socket.IO Server not available!");
    }
  }
  
  listen( event: string, callback: ( any ) => any ): void {
    if ( this.isAvailable ) {
      this.Echo.private( `u-XXXXXXXXX` )
          .listen( `.${event}`, ( socket ) => {
            callback( socket.data );
          } );
    }
    else {
      console.error("Socket.IO Server not available");
    }
  }
  
  listenTo( event: string, callback: ( any ) => any ): void {
    if ( this.isAvailable ) {
      this.Echo.channel( event )
        .listen( `.${event}`, ( socket ) => {
          callback( socket.data );
        } );
    }
    else {
      console.error("Socket.IO Server not available");
    }
  }
}
