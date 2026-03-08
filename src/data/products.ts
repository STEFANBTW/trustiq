export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  size: string;
  flavorProfile?: string[];
  isPremium?: boolean;
}

export const products: Product[] = [
  // Spirits
  { id: 1, name: "Gold Label Whiskey", price: 20, stock: 12, category: "Spirits", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80", size: "large", flavorProfile: ["Smoky", "Oaky", "Vanilla"] },
  { id: 2, name: "Crystal Vodka", price: 20, stock: 24, category: "Spirits", image: "https://images.unsplash.com/photo-1614315584260-b2f015665130?auto=format&fit=crop&w=400&q=80", size: "small", flavorProfile: ["Crisp", "Clean", "Citrus"] },
  { id: 3, name: "Botanical Gin", price: 20, stock: 8, category: "Spirits", image: "https://images.unsplash.com/photo-1563223771-5fe4038fbfc9?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Juniper", "Floral", "Herbal"] },
  { id: 4, name: "Aged Dark Rum", price: 20, stock: 15, category: "Spirits", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80", size: "small", flavorProfile: ["Caramel", "Spice", "Molasses"] },
  { id: 5, name: "Silver Tequila", price: 20, stock: 30, category: "Spirits", image: "https://images.unsplash.com/photo-1582222308762-7b5f2e5bb023?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Agave", "Pepper", "Earthy"] },
  { id: 6, name: "Single Malt Scotch", price: 20, stock: 5, category: "Spirits", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80", size: "large", flavorProfile: ["Peat", "Honey", "Dried Fruit"] },
  { id: 22, name: "Japanese Harmony Whiskey", price: 20, stock: 6, category: "Spirits", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80", size: "large", flavorProfile: ["Floral", "Sandalwood", "Citrus"] },
  { id: 23, name: "Mezcal Artesanal", price: 20, stock: 10, category: "Spirits", image: "https://images.unsplash.com/photo-1582222308762-7b5f2e5bb023?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Smoky", "Roasted Agave", "Leather"] },
  { id: 24, name: "Cognac VSOP", price: 20, stock: 12, category: "Spirits", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80", size: "small", flavorProfile: ["Vanilla", "Apricot", "Oak"] },
  { id: 25, name: "Absinthe Verte", price: 20, stock: 4, category: "Spirits", image: "https://images.unsplash.com/photo-1563223771-5fe4038fbfc9?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Anise", "Fennel", "Wormwood"] },
  
  // Sodas
  { id: 7, name: "Coca-Cola PET", price: 20, stock: 120, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/coca-cola", size: "50cl", flavorProfile: ["Sweet", "Caramel", "Cola"] },
  { id: 8, name: "Coca-Cola Can", price: 20, stock: 95, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/coca-cola/can", size: "33cl", flavorProfile: ["Sweet", "Caramel", "Cola"] },
  { id: 9, name: "Coca-Cola Glass", price: 20, stock: 85, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/coca-cola/glass", size: "35cl", flavorProfile: ["Sweet", "Caramel", "Cola"] },
  { id: 10, name: "Fanta Orange", price: 20, stock: 60, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/fanta-orange", size: "50cl", flavorProfile: ["Citrus", "Orange", "Sweet"] },
  { id: 26, name: "Fanta Apple", price: 20, stock: 40, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/fanta-apple", size: "50cl", flavorProfile: ["Apple", "Fruity", "Sweet"] },
  { id: 27, name: "Fanta Pineapple", price: 20, stock: 35, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/fanta-pineapple", size: "50cl", flavorProfile: ["Pineapple", "Tropical", "Sweet"] },
  { id: 31, name: "Sprite PET", price: 20, stock: 50, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/sprite", size: "50cl", flavorProfile: ["Lemon-Lime", "Crisp", "Refreshing"] },
  { id: 32, name: "Sprite Can", price: 20, stock: 45, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/sprite/can", size: "33cl", flavorProfile: ["Lemon-Lime", "Crisp", "Refreshing"] },
  { id: 33, name: "Sprite Glass", price: 20, stock: 30, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/sprite/glass", size: "35cl", flavorProfile: ["Lemon-Lime", "Crisp", "Refreshing"] },
  { id: 37, name: "Pepsi PET", price: 20, stock: 60, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/pepsi", size: "50cl", flavorProfile: ["Sweet", "Cola", "Citrus"] },
  { id: 38, name: "Pepsi Can", price: 20, stock: 40, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/pepsi/can", size: "33cl", flavorProfile: ["Sweet", "Cola", "Citrus"] },
  { id: 39, name: "Pepsi Glass", price: 20, stock: 30, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/pepsi/glass", size: "35cl", flavorProfile: ["Sweet", "Cola", "Citrus"] },
  { id: 40, name: "Mirinda Orange", price: 20, stock: 40, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/mirinda-orange", size: "50cl", flavorProfile: ["Orange", "Fruity", "Sweet"] },
  { id: 41, name: "Mirinda Apple", price: 20, stock: 30, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/mirinda-apple", size: "50cl", flavorProfile: ["Apple", "Fruity", "Sweet"] },
  { id: 42, name: "Mirinda Pineapple", price: 20, stock: 25, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/mirinda-pineapple", size: "50cl", flavorProfile: ["Pineapple", "Tropical", "Sweet"] },
  { id: 43, name: "Mirinda Strawberry", price: 20, stock: 20, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/mirinda-strawberry", size: "50cl", flavorProfile: ["Strawberry", "Fruity", "Sweet"] },
  { id: 44, name: "7Up PET", price: 20, stock: 35, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/7up", size: "50cl", flavorProfile: ["Lemon-Lime", "Bubbly", "Crisp"] },
  { id: 45, name: "7Up Can", price: 20, stock: 25, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/7up/can", size: "33cl", flavorProfile: ["Lemon-Lime", "Bubbly", "Crisp"] },
  { id: 46, name: "7Up Glass", price: 20, stock: 20, category: "Sodas", image: "https://www.pepsi.com/en-ng/products/7up/glass", size: "35cl", flavorProfile: ["Lemon-Lime", "Bubbly", "Crisp"] },
  { id: 47, name: "Bigi Cola PET", price: 20, stock: 50, category: "Sodas", image: "https://ritefoodsltd.com/bigi-cola", size: "60cl", flavorProfile: ["Sweet", "Cola", "Refreshing"] },
  { id: 48, name: "Bigi Cola Can", price: 20, stock: 40, category: "Sodas", image: "https://ritefoodsltd.com/bigi-cola-can", size: "33cl", flavorProfile: ["Sweet", "Cola", "Refreshing"] },
  { id: 49, name: "Bigi Apple", price: 20, stock: 30, category: "Sodas", image: "https://ritefoodsltd.com/bigi-apple", size: "60cl", flavorProfile: ["Apple", "Fruity", "Sweet"] },
  { id: 50, name: "Bigi Chapman", price: 20, stock: 35, category: "Sodas", image: "https://ritefoodsltd.com/bigi-chapman", size: "60cl", flavorProfile: ["Fruity", "Citrus", "Sweet"] },
  { id: 51, name: "Bigi Lemon", price: 20, stock: 25, category: "Sodas", image: "https://ritefoodsltd.com/bigi-lemon", size: "60cl", flavorProfile: ["Lemon", "Citrus", "Crisp"] },
  { id: 52, name: "Bigi Tropical", price: 20, stock: 20, category: "Sodas", image: "https://ritefoodsltd.com/bigi-tropical", size: "60cl", flavorProfile: ["Tropical", "Fruity", "Sweet"] },
  { id: 53, name: "La Casera Apple PET", price: 20, stock: 45, category: "Sodas", image: "https://lacasera.com/products/la-casera-apple", size: "50cl", flavorProfile: ["Apple", "Crisp", "Refreshing"] },
  { id: 54, name: "La Casera Apple Can", price: 20, stock: 30, category: "Sodas", image: "https://lacasera.com/products/la-casera-apple/can", size: "33cl", flavorProfile: ["Apple", "Crisp", "Refreshing"] },
  { id: 55, name: "Schweppes Tonic", price: 20, stock: 40, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/schweppes-tonic", size: "33cl", flavorProfile: ["Bitter", "Quinine", "Crisp"] },
  { id: 56, name: "Schweppes Bitter Lemon", price: 20, stock: 35, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/schweppes-bitter-lemon", size: "33cl", flavorProfile: ["Bitter", "Lemon", "Citrus"] },
  { id: 57, name: "Schweppes Soda Water", price: 20, stock: 30, category: "Sodas", image: "https://www.coca-cola.com/ng/en/products/schweppes-soda-water", size: "33cl", flavorProfile: ["Neutral", "Bubbly", "Crisp"] },
  
  // Adult Juiceboxes
  { id: 11, name: "Spiked Lemonade Box", price: 20, stock: 40, category: "Juiceboxes", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Tart", "Sweet", "Citrus"] },
  { id: 12, name: "Fruit Punch Spiked", price: 20, stock: 35, category: "Juiceboxes", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80", size: "small", flavorProfile: ["Fruity", "Tropical", "Sweet"] },
  { id: 13, name: "Margarita Pouch", price: 20, stock: 20, category: "Juiceboxes", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80", size: "large", flavorProfile: ["Lime", "Agave", "Salty"] },
  { id: 14, name: "Cosmo Juicebox", price: 20, stock: 18, category: "Juiceboxes", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Cranberry", "Citrus", "Tart"] },
  { id: 34, name: "Mojito Pouch", price: 20, stock: 25, category: "Juiceboxes", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Mint", "Lime", "Refreshing"] },
  
  // Water & Mixers
  { id: 15, name: "Swan Natural Spring Water", price: 20, stock: 80, category: "Water", image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=400&q=80", size: "75cl", flavorProfile: ["Pure", "Spring", "Crisp"] },
  { id: 16, name: "Elim Table Water", price: 20, stock: 50, category: "Water", image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=400&q=80", size: "75cl", flavorProfile: ["Clean", "Neutral", "Hydrating"] },
  { id: 17, name: "Kwopnan Premium Water", price: 20, stock: 70, category: "Water", image: "https://images.unsplash.com/photo-1523362628408-3c26bed47b94?auto=format&fit=crop&w=400&q=80", size: "75cl", flavorProfile: ["Mineral", "Smooth", "Fresh"] },
  { id: 35, name: "Eva Water", price: 20, stock: 60, category: "Water", image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&w=400&q=80", size: "75cl", flavorProfile: ["Treated", "Clean", "Classic"] },
  { id: 36, name: "Nestle Pure Life", price: 20, stock: 100, category: "Water", image: "https://images.unsplash.com/photo-1559839914-17a60a98f9a6?auto=format&fit=crop&w=400&q=80", size: "60cl", flavorProfile: ["Purified", "Balanced", "Light"] },
  
  // Snacks
  { id: 18, name: "Truffle Sea Salt Peanuts", price: 20, stock: 40, category: "Snacks", image: "https://images.unsplash.com/photo-1536584754829-12214d404f52?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Earthy", "Salty", "Nutty"] },
  { id: 19, name: "Smoked Almonds", price: 20, stock: 25, category: "Snacks", image: "https://images.unsplash.com/photo-1536584754829-12214d404f52?auto=format&fit=crop&w=400&q=80", size: "small", flavorProfile: ["Smoky", "Savory", "Crunchy"] },
  { id: 20, name: "Gourmet Pretzels", price: 20, stock: 55, category: "Snacks", image: "https://images.unsplash.com/photo-1536584754829-12214d404f52?auto=format&fit=crop&w=400&q=80", size: "small", flavorProfile: ["Salty", "Baked", "Crisp"] },
  { id: 21, name: "Spicy Wasabi Peas", price: 20, stock: 30, category: "Snacks", image: "https://images.unsplash.com/photo-1536584754829-12214d404f52?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Spicy", "Pungent", "Crunchy"] },
  { id: 28, name: "Beef Jerky Original", price: 20, stock: 20, category: "Snacks", image: "https://images.unsplash.com/photo-1536584754829-12214d404f52?auto=format&fit=crop&w=400&q=80", size: "medium", flavorProfile: ["Savory", "Smoky", "Chewy"] },
  { id: 29, name: "Kettle Cooked Chips", price: 20, stock: 45, category: "Snacks", image: "https://images.unsplash.com/photo-1536584754829-12214d404f52?auto=format&fit=crop&w=400&q=80", size: "small", flavorProfile: ["Salty", "Potato", "Crunchy"] },
  { id: 30, name: "Dark Chocolate Bar", price: 20, stock: 30, category: "Snacks", image: "https://images.unsplash.com/photo-1536584754829-12214d404f52?auto=format&fit=crop&w=400&q=80", size: "small", flavorProfile: ["Bitter", "Rich", "Cocoa"] },
];
