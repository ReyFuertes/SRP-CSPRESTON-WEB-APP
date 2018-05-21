import { Component, ComponentRef } from '@angular/core';

export interface TabItem{
  /**
   * Unique ID
   * This ID is used to identify whether a tab has been activated,registered or loaded
   */
  id:string,
  /**
   * Activate State of the Tab Item
   */
  active:boolean,
  /**
   * The Component that should be registered with the Tab initially
   */
  cmp?:string,
  /**
   * A reference to the Component that has been registered with the Tab
   */
  cmpRef?:ComponentRef<Component>,
  /**
   * Display Name of the Tab
   */
  name:string,
  /**
   * Flag to indicate if the tab is closeable or not (closeable tabs must be closed programmatically)
   */
  closeable:boolean,
}
