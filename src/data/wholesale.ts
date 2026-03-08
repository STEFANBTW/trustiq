export interface CrateProduct {
  id: number;
  name: string;
  qty: string;
  price: string;
  image: string;
  description: string;
  options: string[];
}

export const crateProducts: CrateProduct[] = [
  { id: 1, name: "Coca-Cola Classic Crate", qty: "12 Bottles", price: "₦20", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80", description: "The world's favorite soda. 12 glass bottles of pure refreshment.", options: ["Coke", "Diet Coke", "Coke Zero"] },
  { id: 2, name: "Pepsi Blue Crate", qty: "12 Bottles", price: "₦20", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80", description: "Bold and refreshing. 12 bottles of classic Pepsi flavor.", options: ["Pepsi", "Pepsi Max", "7Up"] },
  { id: 3, name: "Fanta Orange Crate", qty: "12 Bottles", price: "₦20", image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=400&q=80", description: "Bright and bubbly. 12 bottles of citrus goodness.", options: ["Orange", "Pineapple", "Lemon"] },
  { id: 4, name: "Sprite Lemon-Lime Crate", qty: "12 Bottles", price: "₦20", image: "https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=400&q=80", description: "Crisp and clear. 12 bottles of lemon-lime refreshment.", options: ["Sprite", "Sprite Zero"] },
  { id: 5, name: "Premium Lager Crate", qty: "24 Bottles", price: "₦20", image: "https://images.unsplash.com/photo-1618885472118-20c140c40e5c?auto=format&fit=crop&w=400&q=80", description: "Crisp and cold. 24 bottles of premium brewed lager.", options: ["Lager", "Stout", "Malt"] },
  { id: 6, name: "Natural Spring Water Bulk", qty: "24 Bottles", price: "₦20", image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=400&q=80", description: "Pure hydration. 24 bottles of natural spring water.", options: ["75cl", "50cl"] },
  { id: 7, name: "Energy Drink Carton", qty: "24 Cans", price: "₦20", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80", description: "Maximum energy. 24 cans of high-performance energy drink.", options: ["Original", "Sugar-Free"] },
  { id: 8, name: "Juicebox Variety Pack", qty: "12 Boxes", price: "₦20", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80", description: "Fruity goodness. 12 boxes of assorted fruit juices.", options: ["Orange", "Apple", "Punch"] },
];
