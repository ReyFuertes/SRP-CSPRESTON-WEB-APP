import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalEventsService {
  
  private event = new Subject<any>();
  public events$ = this.event.asObservable();
  
  constructor() { }
  
  emit(name:string,data:any){
    this.event.next({name:name,data:data});
  }

}
