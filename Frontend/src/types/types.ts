export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  status: string;
  user_id: number;
  is_featured: number;
  stock: number;
  image_path: string | null;
  created_at: string;
  updated_at: string;
  product_picture: string;
}

export interface ProductData {
  id: number;
  sku: string;
  name: string;
  is_featured?: number;
  description: string;
  price: number;
  image: string;
  stock: number;
  image_path: string;
}

export interface StoreState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PriceRangeSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
  max?: number;
}

export interface RegisterData {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
}

export interface CustomError {
  errors?: {
    email?: string;
    username?: string;
  };
}
export interface LoginData {
  identifier: string;
  password: string;
}

export interface Slide {
  id: number;
  tagline: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface CarouselApi {
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollTo: (index: number) => void;
  selectedScrollSnap: () => number;
  on: (event: string, callback: () => void) => void;
}

export interface IconsProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export interface ProductsApiResponse {
  data: Product[];
  message: string;
  meta: {
    total: number;
  };
}
// types/types.ts
export interface ProductFilterProps {
  category_id?: number;
  sort?: string;
  onFilterChange: (filters: Record<string, unknown>) => void;
}

export interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export interface ProductFilters {
  is_featured?: number;
  sort?: string;
  page?: number; 
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}