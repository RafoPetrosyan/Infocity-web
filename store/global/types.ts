// Cities
export interface City {
  id: number;
  slug: string;
  name: string;
}

// Emotions
export interface Emotion {
  id: number;
  icon: string;
  color: string;
  name: string;
}

// Categories
export interface SubCategory {
  id: number;
  slug: string;
  icon: string | null;
  order: number;
  name: string;
}

export interface Category {
  id: number;
  slug: string;
  icon: string;
  places_count: string;
  name: string;
  sub_categories: SubCategory[];
}
