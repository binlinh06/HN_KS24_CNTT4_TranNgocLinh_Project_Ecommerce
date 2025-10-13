export interface Category {
  id: number;
  code: string;
  name: string;
  status: "active" | "inactive";
}
export interface Product {
  id: number;
  code: string;
  name: string;
  price:string;
  quantity:number;
  discount:number;
  status: "active" | "inactive";
  categoryId: number;
}
