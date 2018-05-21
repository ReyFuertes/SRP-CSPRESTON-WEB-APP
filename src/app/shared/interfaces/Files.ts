'use strict';

export interface FileFolder{
  name:string,
  files:File[],
  url?:string,
  isPublic?:boolean
}

export interface File{
  name:string,
  alias?:string,
  url?:string,
  isPublic?:boolean
}
