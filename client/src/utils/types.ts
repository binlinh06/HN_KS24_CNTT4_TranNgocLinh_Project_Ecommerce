export interface Category {
  id: number;
  code: string;
  name: string;
  status: "active" | "inactive";
}
export interface Product {
  id: number;
  categoryId: number;
  name: string;
}
