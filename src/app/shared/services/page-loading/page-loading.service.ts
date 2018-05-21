import { Injectable } from '@angular/core';




@Injectable()
export class PageLoadingService {
  
  instances:any[];
  el:any;
  
  constructor() {
    this.instances = [];
    this.el = window.document.querySelector('.nexxt-overlay');
  }
  
  public enable(instanceId = null) {
    instanceId = instanceId !== null ? instanceId : this.generateInstanceId();
    if(this.instances.length <= 0){
      this.el.style.display = 'block';
    }
    this.instances.push(instanceId);
    return instanceId;
  }
  
  public disable(instanceId){
    if(this.instances.indexOf(instanceId) >= 0){
      this.instances.splice(this.instances.indexOf(instanceId),1);
    }
    if(this.instances.length <= 0){
      this.el.style.display = 'none';
    }
  }
  
  private generateInstanceId(){
    let instanceId = "";
    let possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 10; i++)
      instanceId += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
  
    return this.instances.indexOf(instanceId) < 0 ? instanceId : this.generateInstanceId();
  }
}
