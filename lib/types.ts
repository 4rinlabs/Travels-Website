// ——— Database Models ———

export interface ItineraryDay {
  id?: string;
  title: string;
  description: string;
  activities: string[];
  images: string[];
  note?: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  image: string | null;
  duration: string | null;
  price: string | null;
  overview: string | null;
  itinerary: (string | ItineraryDay)[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  created_at: string;
}

export interface VisaService {
  id: string;
  slug: string;
  country: string;
  image: string | null;
  processing_time: string | null;
  validity: string | null;
  requirements: string[];
  created_at: string;
}

// ——— Component Props ———

export interface PackageFormProps {
  mode: "create" | "edit";
  initialData?: Package;
}

export interface VisaFormProps {
  mode: "create" | "edit";
  initialData?: VisaService;
}
