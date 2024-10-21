export interface Product {
  id: number;
  description: string;
  link: string;
  product_picture: string;
  price: number;
  origin: string;
  batch_number: string;
  expiration_date: string;
  stock: number;
  is_featured: boolean;
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

