
export interface ServiceItem {
  id: string; // URL slug
  title: string;
  description: string;
  price: string;
  longDescription?: string;
  features?: string[];
}

export interface ProjectItem {
  client: string;
  type: string;
  image: string;
  link: string;
  tags?: string[];
  year?: string;
  roi?: string;
}

export interface MousePosition {
  x: number;
  y: number;
}
