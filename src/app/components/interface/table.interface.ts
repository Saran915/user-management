export interface IActionBtn<T> {
  value: T;
  actionType: string;
}

export interface IColumn<T>{
  label:string;
  key:string;
  Cell?:(data:T)=>void;
}