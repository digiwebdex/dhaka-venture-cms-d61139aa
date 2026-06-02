import { images } from "@/assets/images";

export interface VisaRate {
  id: string;
  country: string;
  countryBn: string;
  type: string;
  typeBn: string;
  rate: string;
  rateBn: string;
}

export interface Package {
  id: string;
  title: string;
  titleBn: string;
  destination: string;
  destinationBn: string;
  duration: string;
  durationBn: string;
  price: string;
  priceBn: string;
  description: string;
  descriptionBn: string;
  image: string;
  featured: boolean;
  category: "umrah" | "tour" | "hajj" | "hotel" | "visa";
  // Detail page fields (all optional — added per package via admin)
  time?: string;
  timeBn?: string;
  transport?: string;
  transportBn?: string;
  hotel?: string;
  hotelBn?: string;
  food?: string;
  foodBn?: string;
  sightSeen?: string;
  sightSeenBn?: string;
  others?: string;
  othersBn?: string;
  tourDetails?: string;
  tourDetailsBn?: string;
  gallery?: string[];
  videos?: string[];
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  destination: string;
  travelers: number;
  travelDate: string;
  notes: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  companyNameBn: string;
  slogan: string;
  sloganBn: string;
  address: string;
  addressBn: string;
  phone: string;
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface PageContent {
  heroTitle: string;
  heroTitleBn: string;
  heroSubtitle: string;
  heroSubtitleBn: string;
  aboutText: string;
  aboutTextBn: string;
  missionText: string;
  missionTextBn: string;
  visionText: string;
  visionTextBn: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  titleEn: string;
  titleBn: string;
  highlightEn: string;
  highlightBn: string;
  subtitleEn: string;
  subtitleBn: string;
  link: string;
  badgeEn: string;
  badgeBn: string;
  cta1En: string;
  cta1Bn: string;
  cta2En: string;
  cta2Bn: string;
}

export interface StatItem {
  id: string;
  icon: string;
  valueEn: string;
  valueBn: string;
  labelEn: string;
  labelBn: string;
}

export interface FlightRoute {
  id: string;
  from: string;
  to: string;
  fromBn: string;
  toBn: string;
  price: string;
  priceBn: string;
}

export interface UmrahOffer {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  price: string;
  image: string;
  featuresEn: string[];
  featuresBn: string[];
}

export interface SeoSettings {
  metaTitle: string;
  metaTitleBn: string;
  metaDescription: string;
  metaDescriptionBn: string;
  ogImage: string;
  keywords: string;
  keywordsBn: string;
  canonicalUrl: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  link: string;
  image: string;
}

export interface FooterContent {
  descriptionEn: string;
  descriptionBn: string;
  copyrightEn: string;
  copyrightBn: string;
  developerName: string;
  developerUrl: string;
}

export interface ContactCtaContent {
  badgeEn: string;
  badgeBn: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
}

export const defaultSettings: SiteSettings = {
  companyName: "Prime Sky International",
  companyNameBn: "প্রাইম স্কাই ইন্টারন্যাশনাল",
  slogan: "Your Journey, Our Priority",
  sloganBn: "আপনার যাত্রা, আমাদের অগ্রাধিকার",
  address: "29 Chamelibag, Shantinagar, Dhaka",
  addressBn: "২৯ চামেলীবাগ, শান্তিনগর, ঢাকা",
  phone: "01995-777222",
  whatsapp: "01765444445",
  email: "info@primeskyintl.com",
  facebook: "https://facebook.com/primeskyintl",
  instagram: "https://instagram.com/primeskyintl",
  youtube: "https://youtube.com/@primeskyintl",
};

export const defaultPageContent: PageContent = {
  heroTitle: "Your Journey, Our Priority",
  heroTitleBn: "আপনার যাত্রা, আমাদের অগ্রাধিকার",
  heroSubtitle: "Hajj & Umrah, Tour Packages, Air Tickets and Hotel Booking Services",
  heroSubtitleBn: "হজ্জ ও উমরাহ, ট্যুর প্যাকেজ, এয়ার টিকেট এবং হোটেল বুকিং সেবা",
  aboutText: "Prime Sky International is a reliable travel agency in Bangladesh. We provide Hajj & Umrah, Tour Packages, Air Tickets and Hotel Booking services. Customer satisfaction is our main goal.",
  aboutTextBn: "প্রাইম স্কাই ইন্টারন্যাশনাল বাংলাদেশের একটি নির্ভরযোগ্য ট্রাভেল এজেন্সি। আমরা হজ্জ ও উমরাহ, ট্যুর প্যাকেজ, এয়ার টিকেট এবং হোটেল বুকিং সেবা প্রদান করি। গ্রাহক সন্তুষ্টি আমাদের মূল লক্ষ্য।",
  missionText: "To provide quality travel services at affordable prices and make every customer's journey memorable.",
  missionTextBn: "সাশ্রয়ী মূল্যে মানসম্মত ভ্রমণ সেবা প্রদান করা এবং প্রতিটি গ্রাহকের যাত্রাকে স্মরণীয় করে তোলা।",
  visionText: "To become the most trusted and popular travel agency in Bangladesh.",
  visionTextBn: "বাংলাদেশের সবচেয়ে বিশ্বস্ত ও জনপ্রিয় ট্রাভেল এজেন্সি হিসেবে প্রতিষ্ঠিত হওয়া।",
};

export const defaultSeoSettings: SeoSettings = {
  metaTitle: "Prime Sky International | আপনার যাত্রা, আমাদের অগ্রাধিকার",
  metaTitleBn: "প্রাইম স্কাই ইন্টারন্যাশনাল | আপনার যাত্রা, আমাদের অগ্রাধিকার",
  metaDescription: "Prime Sky International - Hajj & Umrah, Tour Packages, Air Tickets and Hotel Booking Services. Your Journey, Our Priority.",
  metaDescriptionBn: "প্রাইম স্কাই ইন্টারন্যাশনাল - হজ্জ ও উমরাহ, ট্যুর প্যাকেজ, এয়ার টিকেট এবং হোটেল বুকিং সেবা।",
  ogImage: "https://storage.googleapis.com/gpt-engineer-file-uploads/PQPrdFGLf2h7j69joxFbm8SJlBp2/social-images/social-1772824219999-logo_prime.webp",
  keywords: "hajj, umrah, tour packages, air ticket, hotel booking, visa processing, bangladesh, travel agency, dhaka",
  keywordsBn: "হজ্জ, উমরাহ, ট্যুর প্যাকেজ, এয়ার টিকেট, হোটেল বুকিং, ভিসা প্রসেসিং, বাংলাদেশ",
  canonicalUrl: "https://primeskyintl.com",
  googleAnalyticsId: "",
  facebookPixelId: "",
};

export const defaultServices: ServiceItem[] = [
  { id: "1", icon: "Star", titleEn: "Hajj & Umrah", titleBn: "হজ্জ ও উমরাহ", descEn: "Complete packages for holy Hajj & Umrah tours. All responsibilities including visa processing are ours.", descBn: "পবিত্র হজ্জ ও উমরাহ সফরের জন্য সম্পূর্ণ প্যাকেজ। ভিসা প্রসেসিং সহ সকল দায়িত্ব আমাদের।", link: "/services/hajj-umrah", image: "" },
  { id: "2", icon: "MapPin", titleEn: "Tour Packages", titleBn: "ট্যুর প্যাকেজ", descEn: "Attractive tour packages domestic and international. Cox's Bazar, Thailand, Dubai and many more destinations.", descBn: "দেশ-বিদেশে আকর্ষণীয় ট্যুর প্যাকেজ। কক্সবাজার, থাইল্যান্ড, দুবাই সহ আরও অনেক গন্তব্য।", link: "/services/tour-packages", image: "" },
  { id: "3", icon: "Plane", titleEn: "Air Ticket", titleBn: "এয়ার টিকেট", descEn: "Best priced domestic and international air tickets. Dubai, Malaysia, Saudi Arabia, India.", descBn: "সেরা দামে ঘরোয়া ও আন্তর্জাতিক এয়ার টিকেট। দুবাই, মালয়েশিয়া, সৌদি, ভারত।", link: "/services/air-ticket", image: "" },
  { id: "4", icon: "Hotel", titleEn: "Hotel Booking", titleBn: "হোটেল বুকিং", descEn: "Booking service at the best hotels worldwide. Quality accommodation at affordable prices.", descBn: "বিশ্বজুড়ে সেরা হোটেলে বুকিং সেবা। সাশ্রয়ী মূল্যে মানসম্মত থাকার ব্যবস্থা।", link: "/services/hotel-booking", image: "" },
];

export const defaultFooterContent: FooterContent = {
  descriptionEn: "A reliable travel agency in Bangladesh. Hajj & Umrah, Tour Packages, Air Tickets and Hotel Booking services.",
  descriptionBn: "বাংলাদেশের একটি নির্ভরযোগ্য ট্রাভেল এজেন্সি। হজ্জ ও উমরাহ, ট্যুর প্যাকেজ, এয়ার টিকেট এবং হোটেল বুকিং সেবা।",
  copyrightEn: "All Rights Reserved",
  copyrightBn: "সর্বস্বত্ব সংরক্ষিত",
  developerName: "Digiwebdex",
  developerUrl: "https://digiwebdex.com/",
};

export const defaultContactCta: ContactCtaContent = {
  badgeEn: "Get in Touch",
  badgeBn: "যোগাযোগ",
  titleEn: "Contact Us Today",
  titleBn: "আজই যোগাযোগ করুন",
  subtitleEn: "Contact us to plan your dream trip",
  subtitleBn: "আপনার স্বপ্নের ভ্রমণ পরিকল্পনা করতে আমাদের সাথে যোগাযোগ করুন",
};

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: "1",
    image: images.kaaba,
    titleEn: "Find the Best Umrah Packages from Bangladesh",
    titleBn: "বাংলাদেশ থেকে সেরা উমরাহ প্যাকেজ খুঁজুন",
    highlightEn: "Umrah Packages",
    highlightBn: "উমরাহ প্যাকেজ",
    subtitleEn: "Prime Sky International offers comprehensive Hajj & Umrah packages with premium services, expert guidance and spiritual fulfillment.",
    subtitleBn: "প্রাইম স্কাই ইন্টারন্যাশনাল প্রিমিয়াম সেবা, বিশেষজ্ঞ গাইডেন্স এবং আধ্যাত্মিক পরিপূর্ণতার সাথে ব্যাপক হজ্জ ও উমরাহ প্যাকেজ অফার করে।",
    link: "/services/hajj-umrah",
    badgeEn: "Trusted Hajj & Umrah Partner",
    badgeBn: "বিশ্বস্ত হজ্জ ও উমরাহ পার্টনার",
    cta1En: "Plan Umrah",
    cta1Bn: "উমরাহ পরিকল্পনা করুন",
    cta2En: "View Hajj Packages",
    cta2Bn: "হজ্জ প্যাকেজ দেখুন",
  },
  {
    id: "2",
    image: images.beach,
    titleEn: "Explore Beautiful Destinations Worldwide",
    titleBn: "বিশ্বজুড়ে সুন্দর গন্তব্য অন্বেষণ করুন",
    highlightEn: "Beautiful Destinations",
    highlightBn: "সুন্দর গন্তব্য",
    subtitleEn: "Cox's Bazar, Thailand, Dubai — Unforgettable tour packages with the best travel experiences.",
    subtitleBn: "কক্সবাজার, থাইল্যান্ড, দুবাই — সেরা ভ্রমণ অভিজ্ঞতার সাথে অবিস্মরণীয় ট্যুর প্যাকেজ।",
    link: "/services/tour-packages",
    badgeEn: "Premium Tour Packages",
    badgeBn: "প্রিমিয়াম ট্যুর প্যাকেজ",
    cta1En: "Explore Tours",
    cta1Bn: "ট্যুর দেখুন",
    cta2En: "View Packages",
    cta2Bn: "প্যাকেজ দেখুন",
  },
  {
    id: "3",
    image: images.airplane,
    titleEn: "Fly With the Best Fare Guaranteed",
    titleBn: "সেরা ভাড়া নিশ্চয়তায় উড়ুন",
    highlightEn: "Best Fare",
    highlightBn: "সেরা ভাড়া",
    subtitleEn: "Dubai, Malaysia, Saudi Arabia, India — Get the most competitive air ticket prices.",
    subtitleBn: "দুবাই, মালয়েশিয়া, সৌদি আরব, ভারত — সবচেয়ে প্রতিযোগিতামূলক এয়ার টিকেটের দাম পান।",
    link: "/services/air-ticket",
    badgeEn: "Affordable Air Tickets",
    badgeBn: "সাশ্রয়ী এয়ার টিকেট",
    cta1En: "Book Flight",
    cta1Bn: "ফ্লাইট বুক করুন",
    cta2En: "View Offers",
    cta2Bn: "অফার দেখুন",
  },
  {
    id: "4",
    image: images.hotel,
    titleEn: "World-Class Hotel Booking Service",
    titleBn: "বিশ্বমানের হোটেল বুকিং সেবা",
    highlightEn: "Hotel Booking",
    highlightBn: "হোটেল বুকিং",
    subtitleEn: "Luxury & budget hotels worldwide at the best rates with guaranteed quality.",
    subtitleBn: "সেরা দামে বিশ্বজুড়ে লাক্সারি ও বাজেট হোটেল মানসম্মত নিশ্চয়তায়।",
    link: "/services/hotel-booking",
    badgeEn: "Premium Hotels",
    badgeBn: "প্রিমিয়াম হোটেল",
    cta1En: "Book Hotel",
    cta1Bn: "হোটেল বুক করুন",
    cta2En: "View Hotels",
    cta2Bn: "হোটেল দেখুন",
  },
];

export const defaultStats: StatItem[] = [
  { id: "1", icon: "Shield", valueEn: "10+", valueBn: "১০+", labelEn: "Years Experience", labelBn: "বছরের অভিজ্ঞতা" },
  { id: "2", icon: "BookOpen", valueEn: "1000+", valueBn: "১০০০+", labelEn: "Happy Clients", labelBn: "সুখী ক্লায়েন্ট" },
  { id: "3", icon: "Globe", valueEn: "25+", valueBn: "২৫+", labelEn: "Destinations", labelBn: "গন্তব্যস্থল" },
  { id: "4", icon: "Headphones", valueEn: "24/7", valueBn: "২৪/৭", labelEn: "Support", labelBn: "সাপোর্ট" },
];

export const defaultFlightRoutes: FlightRoute[] = [
  { id: "1", from: "Dhaka", to: "Dubai", fromBn: "ঢাকা", toBn: "দুবাই", price: "BDT 28,000", priceBn: "৳ ২৮,০০০" },
  { id: "2", from: "Dhaka", to: "Malaysia", fromBn: "ঢাকা", toBn: "মালয়েশিয়া", price: "BDT 22,000", priceBn: "৳ ২২,০০০" },
  { id: "3", from: "Dhaka", to: "Saudi Arabia", fromBn: "ঢাকা", toBn: "সৌদি আরব", price: "BDT 35,000", priceBn: "৳ ৩৫,০০০" },
  { id: "4", from: "Dhaka", to: "India", fromBn: "ঢাকা", toBn: "ভারত", price: "BDT 12,000", priceBn: "৳ ১২,০০০" },
];

export const defaultUmrahOffer: UmrahOffer = {
  titleEn: "UMRAH SPECIAL OFFER",
  titleBn: "উমরাহ স্পেশাল অফার",
  descEn: "All responsibilities including visa processing are ours. Premium service guaranteed.",
  descBn: "ভিসা প্রসেসিং সহ সকল দায়িত্ব আমাদের। প্রিমিয়াম সেবা নিশ্চিত।",
  price: "BDT 135,000",
  image: images.mosque,
  featuresEn: ["Visa Processing", "5-Star Hotel", "Flight Included", "Expert Guide", "Ziyarat Tour", "24/7 Support"],
  featuresBn: ["ভিসা প্রসেসিং", "৫-স্টার হোটেল", "ফ্লাইট অন্তর্ভুক্ত", "বিশেষজ্ঞ গাইড", "জিয়ারত ট্যুর", "২৪/৭ সাপোর্ট"],
};

export const defaultVisaRates: VisaRate[] = [
  { id: "1", country: "Thailand", countryBn: "থাইল্যান্ড", type: "e-Visa", typeBn: "ই-ভিসা", rate: "5,800/-", rateBn: "৫,৮০০/-" },
  { id: "2", country: "Malaysia", countryBn: "মালয়েশিয়া", type: "e-Visa", typeBn: "ই-ভিসা", rate: "4,500/-", rateBn: "৪,৫০০/-" },
  { id: "3", country: "Singapore", countryBn: "সিঙ্গাপুর", type: "e-Visa", typeBn: "ই-ভিসা", rate: "6,000/-", rateBn: "৬,০০০/-" },
  { id: "4", country: "Sri Lanka", countryBn: "শ্রীলঙ্কা", type: "e-Visa", typeBn: "ই-ভিসা", rate: "3,500/-", rateBn: "৩,৫০০/-" },
  { id: "5", country: "Hong Kong", countryBn: "হংকং", type: "e-Visa", typeBn: "ই-ভিসা", rate: "9,000/-", rateBn: "৯,০০০/-" },
  { id: "6", country: "Philippines", countryBn: "ফিলিপাইন", type: "Sticker Visa", typeBn: "স্টিকার ভিসা", rate: "9,000/-", rateBn: "৯,০০০/-" },
  { id: "7", country: "China", countryBn: "চীন", type: "Sticker Visa", typeBn: "স্টিকার ভিসা", rate: "10,500/-", rateBn: "১০,৫০০/-" },
  { id: "8", country: "Turkey", countryBn: "তুরস্ক", type: "Sticker Visa", typeBn: "স্টিকার ভিসা", rate: "27,000/-", rateBn: "২৭,০০০/-" },
  { id: "9", country: "Japan", countryBn: "জাপান", type: "Sticker Visa", typeBn: "স্টিকার ভিসা", rate: "1,000/- (Processing fee)", rateBn: "১,০০০/- (প্রসেসিং ফি)" },
  { id: "10", country: "Indonesia", countryBn: "ইন্দোনেশিয়া", type: "Sticker Visa", typeBn: "স্টিকার ভিসা", rate: "1,500/- (Processing fee)", rateBn: "১,৫০০/- (প্রসেসিং ফি)" },
  { id: "11", country: "Schengen", countryBn: "শেনজেন", type: "Sticker Visa", typeBn: "স্টিকার ভিসা", rate: "5,000/- (Processing fee)", rateBn: "৫,০০০/- (প্রসেসিং ফি)" },
  { id: "12", country: "1st World Country", countryBn: "উন্নত দেশ", type: "Sticker Visa", typeBn: "স্টিকার ভিসা", rate: "5,000/- (Processing fee)", rateBn: "৫,০০০/- (প্রসেসিং ফি)" },
];

export const defaultPackages: Package[] = [
  {
    id: "1",
    title: "Umrah Package - Economy",
    titleBn: "উমরাহ প্যাকেজ - ইকোনমি",
    destination: "Makkah & Madinah",
    destinationBn: "মক্কা ও মদিনা",
    duration: "14 Days",
    durationBn: "১৪ দিন",
    price: "BDT 135,000",
    priceBn: "৳ ১,৩৫,০০০",
    description: "Complete Umrah package including visa, flight, hotel, transport and guidance.",
    descriptionBn: "ভিসা, ফ্লাইট, হোটেল, পরিবহন ও গাইডেন্স সহ সম্পূর্ণ উমরাহ প্যাকেজ।",
    image: images.kaaba,
    featured: true,
    category: "umrah",
    time: "14 Days 13 Nights", timeBn: "১৪ দিন ১৩ রাত",
    transport: "Return Air Ticket + AC Bus", transportBn: "রিটার্ন এয়ার টিকেট + এসি বাস",
    hotel: "3 Star (Makkah & Madinah)", hotelBn: "৩ স্টার (মক্কা ও মদিনা)",
    food: "3 times daily (Bangladeshi)", foodBn: "প্রতিদিন ৩ বেলা (বাংলাদেশি)",
    sightSeen: "Ziyarat in Makkah & Madinah", sightSeenBn: "মক্কা ও মদিনায় জিয়ারত",
    others: "Visa, Guide, Insurance", othersBn: "ভিসা, গাইড, ইন্স্যুরেন্স",
    tourDetails: "Economy Umrah package covers all essentials — visa processing, return air ticket, 3-star hotel near Haram, daily Bangladeshi meals, transport between Makkah-Madinah-Jeddah, guided ziyarat tours and 24/7 support throughout the journey.",
    tourDetailsBn: "ইকোনমি উমরাহ প্যাকেজে অন্তর্ভুক্ত — ভিসা প্রসেসিং, রিটার্ন এয়ার টিকেট, হারামের নিকটবর্তী ৩-স্টার হোটেল, প্রতিদিন বাংলাদেশি খাবার, মক্কা-মদিনা-জেদ্দার মধ্যে পরিবহন, গাইডেড জিয়ারত ট্যুর এবং পুরো যাত্রায় ২৪/৭ সাপোর্ট।",
    gallery: [images.kaaba, images.mosque, images.madinahMosque, images.hajjPilgrims],
    videos: [
      "https://www.youtube.com/watch?v=CDM7HnYHqV0",
      "https://www.youtube.com/watch?v=h0XYjz2bzFw",
    ],
  },
  {
    id: "2",
    title: "Umrah Package - Premium",
    titleBn: "উমরাহ প্যাকেজ - প্রিমিয়াম",
    destination: "Makkah & Madinah",
    destinationBn: "মক্কা ও মদিনা",
    duration: "21 Days",
    durationBn: "২১ দিন",
    price: "BDT 225,000",
    priceBn: "৳ ২,২৫,০০০",
    description: "Premium Umrah package with 5-star hotel, private transport and VIP services.",
    descriptionBn: "৫-স্টার হোটেল, প্রাইভেট পরিবহন ও VIP সেবা সহ প্রিমিয়াম উমরাহ প্যাকেজ।",
    image: images.mosque,
    featured: true,
    category: "umrah",
    time: "21 Days 20 Nights", timeBn: "২১ দিন ২০ রাত",
    transport: "Return Air Ticket + Private Car", transportBn: "রিটার্ন এয়ার টিকেট + প্রাইভেট কার",
    hotel: "5 Star (Walking distance from Haram)", hotelBn: "৫ স্টার (হারাম থেকে হাঁটা দূরত্ব)",
    food: "Buffet 3 times daily", foodBn: "প্রতিদিন ৩ বেলা বুফে",
    sightSeen: "Full Ziyarat + Taif Tour", sightSeenBn: "সম্পূর্ণ জিয়ারত + তায়েফ ট্যুর",
    others: "VIP Visa, Personal Guide, Zamzam Water", othersBn: "VIP ভিসা, ব্যক্তিগত গাইড, জমজমের পানি",
    tourDetails: "Premium Umrah experience with 5-star accommodation directly facing the Haram, private car transfers, buffet meals, dedicated guide, Taif and complete ziyarat tours, plus VIP visa processing.",
    tourDetailsBn: "প্রিমিয়াম উমরাহ অভিজ্ঞতা — হারামের সরাসরি সামনে ৫-স্টার আবাসন, প্রাইভেট কার ট্রান্সফার, বুফে খাবার, ডেডিকেটেড গাইড, তায়েফ ও সম্পূর্ণ জিয়ারত ট্যুর এবং VIP ভিসা প্রসেসিং।",
    gallery: [images.mosque, images.madinahMosque, images.kaaba, images.hajjPilgrims],
    videos: [
      "https://www.youtube.com/watch?v=h0XYjz2bzFw",
      "https://www.youtube.com/watch?v=CDM7HnYHqV0",
    ],
  },
  {
    id: "3",
    title: "Cox's Bazar Tour",
    titleBn: "কক্সবাজার ট্যুর",
    destination: "Cox's Bazar",
    destinationBn: "কক্সবাজার",
    duration: "3 Days 2 Nights",
    durationBn: "৩ দিন ২ রাত",
    price: "BDT 8,500",
    priceBn: "৳ ৮,৫০০",
    description: "Enjoy the world's longest sea beach with comfortable accommodation and sightseeing.",
    descriptionBn: "বিশ্বের দীর্ঘতম সমুদ্র সৈকতে আরামদায়ক থাকা ও ভ্রমণ উপভোগ করুন।",
    image: images.beach,
    featured: true,
    category: "tour",
    time: "3 Day's 2 Night", timeBn: "৩ দিন ২ রাত",
    transport: "Bus", transportBn: "বাস",
    hotel: "3 Star", hotelBn: "৩ স্টার",
    food: "9 Times", foodBn: "৯ বেলা",
    sightSeen: "Himchori, Inani", sightSeenBn: "হিমছড়ি, ইনানী",
    others: "Etc.", othersBn: "ইত্যাদি",
    tourDetails: "Travel by AC bus from Dhaka to Cox's Bazar, stay in a 3-star hotel near the beach, enjoy 9 meals during the trip, and visit famous spots like Himchori waterfall and Inani sea beach.",
    tourDetailsBn: "ঢাকা থেকে কক্সবাজার এসি বাসে যাত্রা, সমুদ্র সৈকতের কাছে ৩-স্টার হোটেলে থাকা, ভ্রমণে ৯ বেলা খাবার এবং হিমছড়ি জলপ্রপাত ও ইনানী সমুদ্র সৈকতের মতো বিখ্যাত স্থান পরিদর্শন।",
    gallery: [images.beach, images.coxsbazarSunset, images.coxsbazarResort, images.hotel],
    videos: [
      "https://www.youtube.com/watch?v=YbW9c1Fb-_Q",
      "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
    ],
  },
  {
    id: "4",
    title: "Thailand Tour",
    titleBn: "থাইল্যান্ড ট্যুর",
    destination: "Bangkok & Pattaya",
    destinationBn: "ব্যাংকক ও পাতায়া",
    duration: "5 Days 4 Nights",
    durationBn: "৫ দিন ৪ রাত",
    price: "BDT 35,000",
    priceBn: "৳ ৩৫,০০০",
    description: "Explore Bangkok and Pattaya with guided tours, shopping and Thai culture.",
    descriptionBn: "গাইডেড ট্যুর, শপিং ও থাই সংস্কৃতি সহ ব্যাংকক ও পাতায়া উপভোগ করুন।",
    image: images.thailand,
    featured: true,
    category: "tour",
    time: "5 Days 4 Nights", timeBn: "৫ দিন ৪ রাত",
    transport: "Return Air Ticket + Tour Bus", transportBn: "রিটার্ন এয়ার টিকেট + ট্যুর বাস",
    hotel: "4 Star (Bangkok & Pattaya)", hotelBn: "৪ স্টার (ব্যাংকক ও পাতায়া)",
    food: "Daily Breakfast", foodBn: "প্রতিদিন সকালের নাস্তা",
    sightSeen: "Coral Island, Safari World, Floating Market", sightSeenBn: "কোরাল আইল্যান্ড, সাফারি ওয়ার্ল্ড, ফ্লোটিং মার্কেট",
    others: "Visa, Guide, Airport Pickup", othersBn: "ভিসা, গাইড, এয়ারপোর্ট পিকআপ",
    tourDetails: "5-day Thailand tour covering Bangkok and Pattaya with 4-star accommodation, guided sightseeing to Coral Island, Safari World and the famous Floating Market, plus visa and airport assistance.",
    tourDetailsBn: "৫ দিনের থাইল্যান্ড ট্যুর — ব্যাংকক ও পাতায়ায় ৪-স্টার আবাসন, কোরাল আইল্যান্ড, সাফারি ওয়ার্ল্ড ও বিখ্যাত ফ্লোটিং মার্কেট গাইডেড ভ্রমণ এবং ভিসা ও এয়ারপোর্ট সহায়তা।",
    gallery: [images.thailand, images.thailandMarket, images.hotel, images.airplane],
    videos: [
      "https://www.youtube.com/watch?v=fTjhYVN3OoI",
      "https://www.youtube.com/watch?v=0e3GPea1Tyg",
    ],
  },
  {
    id: "5",
    title: "Dubai City Tour",
    titleBn: "দুবাই সিটি ট্যুর",
    destination: "Dubai, UAE",
    destinationBn: "দুবাই, সংযুক্ত আরব আমিরাত",
    duration: "4 Days 3 Nights",
    durationBn: "৪ দিন ৩ রাত",
    price: "BDT 45,000",
    priceBn: "৳ ৪৫,০০০",
    description: "Visit Burj Khalifa, Dubai Mall, Desert Safari and more iconic attractions.",
    descriptionBn: "বুর্জ খলিফা, দুবাই মল, ডেজার্ট সাফারি সহ আরও অনেক আকর্ষণ পরিদর্শন করুন।",
    image: images.dubai,
    featured: true,
    category: "tour",
    time: "4 Days 3 Nights", timeBn: "৪ দিন ৩ রাত",
    transport: "Return Air Ticket + AC Coach", transportBn: "রিটার্ন এয়ার টিকেট + এসি কোচ",
    hotel: "4 Star (Downtown Dubai)", hotelBn: "৪ স্টার (ডাউনটাউন দুবাই)",
    food: "Breakfast & Dinner", foodBn: "সকালের নাস্তা ও রাতের খাবার",
    sightSeen: "Burj Khalifa, Dubai Mall, Desert Safari, Marina Cruise", sightSeenBn: "বুর্জ খলিফা, দুবাই মল, ডেজার্ট সাফারি, মেরিনা ক্রুজ",
    others: "Visa, Guide, Airport Transfer", othersBn: "ভিসা, গাইড, এয়ারপোর্ট ট্রান্সফার",
    tourDetails: "Discover Dubai's iconic skyline and desert in 4 days. Includes Burj Khalifa entry, full-day Dubai Mall, thrilling Desert Safari with BBQ dinner, and a luxurious Marina dhow cruise.",
    tourDetailsBn: "৪ দিনে দুবাইয়ের আইকনিক স্কাইলাইন ও মরুভূমি আবিষ্কার করুন। অন্তর্ভুক্ত — বুর্জ খলিফা প্রবেশ, পুরো দিন দুবাই মল, রোমাঞ্চকর ডেজার্ট সাফারি ও বিবিকিউ ডিনার এবং বিলাসবহুল মেরিনা ধাও ক্রুজ।",
    gallery: [images.dubai, images.dubaiNight, images.hotel, images.airplane],
    videos: [
      "https://www.youtube.com/watch?v=2Lxn4XWjvXk",
      "https://www.youtube.com/watch?v=GbrNQbqUgbo",
    ],
  },
  {
    id: "6",
    title: "Hajj Package 2025",
    titleBn: "হজ্জ প্যাকেজ ২০২৫",
    destination: "Makkah & Madinah",
    destinationBn: "মক্কা ও মদিনা",
    duration: "40 Days",
    durationBn: "৪০ দিন",
    price: "BDT 650,000",
    priceBn: "৳ ৬,৫০,০০০",
    description: "Complete Hajj package with all arrangements, experienced guide and group support.",
    descriptionBn: "সকল ব্যবস্থাপনা, অভিজ্ঞ গাইড ও গ্রুপ সাপোর্ট সহ সম্পূর্ণ হজ্জ প্যাকেজ।",
    image: images.hajj,
    featured: false,
    category: "hajj",
    time: "40 Days", timeBn: "৪০ দিন",
    transport: "Return Air Ticket + AC Bus", transportBn: "রিটার্ন এয়ার টিকেট + এসি বাস",
    hotel: "Makkah 3-Star + Madinah 3-Star", hotelBn: "মক্কা ৩-স্টার + মদিনা ৩-স্টার",
    food: "3 Times Daily (Bangladeshi)", foodBn: "প্রতিদিন ৩ বেলা (বাংলাদেশি)",
    sightSeen: "Mina, Arafah, Muzdalifah, Ziyarat", sightSeenBn: "মিনা, আরাফা, মুজদালিফা, জিয়ারত",
    others: "Visa, Trained Mualem, Insurance, Ihram Kit", othersBn: "ভিসা, প্রশিক্ষিত মুয়াল্লিম, ইন্স্যুরেন্স, এহরাম কিট",
    tourDetails: "Government-approved 2025 Hajj package with full arrangements: visa, return air ticket, hotels in Makkah & Madinah, all transport, daily meals, trained Mualem, Ihram kit and complete guidance through every ritual at Mina, Arafah and Muzdalifah.",
    tourDetailsBn: "সরকার অনুমোদিত ২০২৫ হজ্জ প্যাকেজ — ভিসা, রিটার্ন এয়ার টিকেট, মক্কা ও মদিনায় হোটেল, সকল পরিবহন, প্রতিদিন খাবার, প্রশিক্ষিত মুয়াল্লিম, এহরাম কিট এবং মিনা, আরাফা ও মুজদালিফার প্রতিটি আনুষ্ঠানিকতায় সম্পূর্ণ গাইডেন্স।",
    gallery: [images.hajj, images.hajjPilgrims, images.kaaba, images.madinahMosque],
    videos: [
      "https://www.youtube.com/watch?v=CDM7HnYHqV0",
      "https://www.youtube.com/watch?v=h0XYjz2bzFw",
    ],
  },
  {
    id: "7",
    title: "Umrah Package - Family",
    titleBn: "উমরাহ প্যাকেজ - ফ্যামিলি",
    destination: "Makkah & Madinah",
    destinationBn: "মক্কা ও মদিনা",
    duration: "18 Days",
    durationBn: "১৮ দিন",
    price: "BDT 175,000",
    priceBn: "৳ ১,৭৫,০০০",
    description: "Family-friendly Umrah package with spacious 4-star rooms and group transport.",
    descriptionBn: "প্রশস্ত ৪-স্টার রুম ও গ্রুপ পরিবহন সহ পরিবারবান্ধব উমরাহ প্যাকেজ।",
    image: images.madinahMosque,
    featured: false,
    category: "umrah",
    time: "18 Days 17 Nights", timeBn: "১৮ দিন ১৭ রাত",
    transport: "Return Air Ticket + AC Coach", transportBn: "রিটার্ন এয়ার টিকেট + এসি কোচ",
    hotel: "4 Star (Family Rooms)", hotelBn: "৪ স্টার (ফ্যামিলি রুম)",
    food: "3 times daily (Bangladeshi)", foodBn: "প্রতিদিন ৩ বেলা (বাংলাদেশি)",
    sightSeen: "Full Ziyarat Makkah & Madinah", sightSeenBn: "মক্কা ও মদিনায় সম্পূর্ণ জিয়ারত",
    others: "Visa, Female Guide Available, Zamzam", othersBn: "ভিসা, নারী গাইড উপলব্ধ, জমজম",
    tourDetails: "Designed for families — 4-star hotels with connected family rooms close to the Haram, comfortable group transport, daily home-style meals and complete ziyarat tours in both cities.",
    tourDetailsBn: "পরিবারের জন্য ডিজাইন করা — হারামের কাছে কানেক্টেড ফ্যামিলি রুম সহ ৪-স্টার হোটেল, আরামদায়ক গ্রুপ পরিবহন, প্রতিদিন ঘরের মতো খাবার এবং উভয় শহরে সম্পূর্ণ জিয়ারত ট্যুর।",
    gallery: [images.madinahMosque, images.kaaba, images.mosque, images.hajjPilgrims],
    videos: ["https://www.youtube.com/watch?v=h0XYjz2bzFw"],
  },
  {
    id: "8",
    title: "Umrah Package - Ramadan Special",
    titleBn: "উমরাহ প্যাকেজ - রমজান স্পেশাল",
    destination: "Makkah & Madinah",
    destinationBn: "মক্কা ও মদিনা",
    duration: "15 Days",
    durationBn: "১৫ দিন",
    price: "BDT 195,000",
    priceBn: "৳ ১,৯৫,০০০",
    description: "Experience the blessed month of Ramadan with iftar in Haram and Taraweeh prayers.",
    descriptionBn: "হারামে ইফতার ও তারাবি নামাজ সহ পবিত্র রমজান মাস উপভোগ করুন।",
    image: images.kaaba,
    featured: false,
    category: "umrah",
    time: "15 Days 14 Nights", timeBn: "১৫ দিন ১৪ রাত",
    transport: "Return Air Ticket + AC Bus", transportBn: "রিটার্ন এয়ার টিকেট + এসি বাস",
    hotel: "4 Star (Near Haram)", hotelBn: "৪ স্টার (হারামের নিকটে)",
    food: "Sehri & Iftar (Bangladeshi)", foodBn: "সেহরি ও ইফতার (বাংলাদেশি)",
    sightSeen: "Ziyarat + Special Ramadan Tour", sightSeenBn: "জিয়ারত + বিশেষ রমজান ট্যুর",
    others: "Visa, Guide, Iftar in Haram", othersBn: "ভিসা, গাইড, হারামে ইফতার",
    tourDetails: "Special Ramadan Umrah with daily sehri & iftar arrangements, hotel near Haram for easy Taraweeh attendance, guided ziyarat tours and complete spiritual experience during the holy month.",
    tourDetailsBn: "বিশেষ রমজান উমরাহ — প্রতিদিন সেহরি ও ইফতার ব্যবস্থা, তারাবিতে অংশগ্রহণের জন্য হারামের কাছে হোটেল, গাইডেড জিয়ারত ট্যুর এবং পবিত্র মাসে সম্পূর্ণ আধ্যাত্মিক অভিজ্ঞতা।",
    gallery: [images.kaaba, images.mosque, images.madinahMosque, images.hajjPilgrims],
    videos: ["https://www.youtube.com/watch?v=CDM7HnYHqV0"],
  },
  {
    id: "9",
    title: "Malaysia Tour",
    titleBn: "মালয়েশিয়া ট্যুর",
    destination: "Kuala Lumpur & Genting",
    destinationBn: "কুয়ালালামপুর ও জেন্টিং",
    duration: "5 Days 4 Nights",
    durationBn: "৫ দিন ৪ রাত",
    price: "BDT 38,000",
    priceBn: "৳ ৩৮,০০০",
    description: "Explore KL, Petronas Towers, Genting Highlands and Batu Caves.",
    descriptionBn: "কুয়ালালামপুর, পেট্রোনাস টাওয়ার, জেন্টিং হাইল্যান্ডস ও বাটু কেভস ঘুরে দেখুন।",
    image: images.malaysia,
    featured: false,
    category: "tour",
    time: "5 Days 4 Nights", timeBn: "৫ দিন ৪ রাত",
    transport: "Return Air Ticket + Tour Coach", transportBn: "রিটার্ন এয়ার টিকেট + ট্যুর কোচ",
    hotel: "4 Star (KL & Genting)", hotelBn: "৪ স্টার (কুয়ালালামপুর ও জেন্টিং)",
    food: "Daily Breakfast + 2 Dinners", foodBn: "প্রতিদিন সকালের নাস্তা + ২ রাতের খাবার",
    sightSeen: "Petronas Towers, Genting, Batu Caves, KL Tower", sightSeenBn: "পেট্রোনাস টাওয়ার, জেন্টিং, বাটু কেভস, কেএল টাওয়ার",
    others: "Visa, Guide, Airport Transfer", othersBn: "ভিসা, গাইড, এয়ারপোর্ট ট্রান্সফার",
    tourDetails: "5-day Malaysia tour covering Kuala Lumpur city sights, Petronas Twin Towers, cable car ride to Genting Highlands theme park, and the iconic Batu Caves with all transfers and visa support.",
    tourDetailsBn: "৫ দিনের মালয়েশিয়া ট্যুর — কুয়ালালামপুর সিটি দর্শন, পেট্রোনাস টুইন টাওয়ার, জেন্টিং হাইল্যান্ডস থিম পার্কে কেবল কার রাইড এবং আইকনিক বাটু কেভস, সব ট্রান্সফার ও ভিসা সাপোর্ট সহ।",
    gallery: [images.malaysia, images.hotel, images.singapore, images.airplane],
    videos: ["https://www.youtube.com/watch?v=fTjhYVN3OoI"],
  },
  {
    id: "10",
    title: "Hajj Package - Economy",
    titleBn: "হজ্জ প্যাকেজ - ইকোনমি",
    destination: "Makkah & Madinah",
    destinationBn: "মক্কা ও মদিনা",
    duration: "42 Days",
    durationBn: "৪২ দিন",
    price: "BDT 550,000",
    priceBn: "৳ ৫,৫০,০০০",
    description: "Budget-friendly Hajj package with all government-approved arrangements.",
    descriptionBn: "সকল সরকার-অনুমোদিত ব্যবস্থাপনা সহ বাজেট-বান্ধব হজ্জ প্যাকেজ।",
    image: images.hajjPilgrims,
    featured: false,
    category: "hajj",
    time: "42 Days", timeBn: "৪২ দিন",
    transport: "Return Air Ticket + AC Bus", transportBn: "রিটার্ন এয়ার টিকেট + এসি বাস",
    hotel: "Shared Rooms (Makkah & Madinah)", hotelBn: "শেয়ার্ড রুম (মক্কা ও মদিনা)",
    food: "3 Times Daily (Bangladeshi)", foodBn: "প্রতিদিন ৩ বেলা (বাংলাদেশি)",
    sightSeen: "Mina, Arafah, Muzdalifah", sightSeenBn: "মিনা, আরাফা, মুজদালিফা",
    others: "Visa, Mualem, Ihram Kit", othersBn: "ভিসা, মুয়াল্লিম, এহরাম কিট",
    tourDetails: "Economy Hajj package with shared rooms in approved hotels, daily Bangladeshi meals, all required transport, experienced Mualem and complete arrangements for all rituals at Mina, Arafah and Muzdalifah.",
    tourDetailsBn: "ইকোনমি হজ্জ প্যাকেজ — অনুমোদিত হোটেলে শেয়ার্ড রুম, প্রতিদিন বাংলাদেশি খাবার, প্রয়োজনীয় সকল পরিবহন, অভিজ্ঞ মুয়াল্লিম এবং মিনা, আরাফা ও মুজদালিফার সকল আনুষ্ঠানিকতার সম্পূর্ণ ব্যবস্থা।",
    gallery: [images.hajjPilgrims, images.hajj, images.kaaba, images.madinahMosque],
    videos: ["https://www.youtube.com/watch?v=CDM7HnYHqV0"],
  },
  {
    id: "11",
    title: "Hajj Package - Premium",
    titleBn: "হজ্জ প্যাকেজ - প্রিমিয়াম",
    destination: "Makkah & Madinah",
    destinationBn: "মক্কা ও মদিনা",
    duration: "38 Days",
    durationBn: "৩৮ দিন",
    price: "BDT 850,000",
    priceBn: "৳ ৮,৫০,০০০",
    description: "VIP Hajj package with 5-star hotels close to Haram and private services.",
    descriptionBn: "হারামের কাছে ৫-স্টার হোটেল ও প্রাইভেট সেবা সহ VIP হজ্জ প্যাকেজ।",
    image: images.hajj,
    featured: true,
    category: "hajj",
    time: "38 Days", timeBn: "৩৮ দিন",
    transport: "Return Air Ticket + Private Coach", transportBn: "রিটার্ন এয়ার টিকেট + প্রাইভেট কোচ",
    hotel: "5 Star (Walking to Haram)", hotelBn: "৫ স্টার (হারাম থেকে হাঁটা দূরত্ব)",
    food: "Buffet 3 times daily", foodBn: "প্রতিদিন ৩ বেলা বুফে",
    sightSeen: "All Hajj Sites + VIP Camps in Mina", sightSeenBn: "সকল হজ্জ স্থান + মিনায় VIP ক্যাম্প",
    others: "VIP Visa, Personal Mualem, AC Tents", othersBn: "VIP ভিসা, ব্যক্তিগত মুয়াল্লিম, এসি তাঁবু",
    tourDetails: "Premium Hajj experience with 5-star hotels within walking distance of the Haram, AC tents in Mina, buffet meals, personal Mualem assistance and VIP visa processing for utmost comfort during the sacred journey.",
    tourDetailsBn: "প্রিমিয়াম হজ্জ অভিজ্ঞতা — হারাম থেকে হাঁটা দূরত্বে ৫-স্টার হোটেল, মিনায় এসি তাঁবু, বুফে খাবার, ব্যক্তিগত মুয়াল্লিম সহায়তা এবং পবিত্র যাত্রায় সর্বোচ্চ আরামের জন্য VIP ভিসা প্রসেসিং।",
    gallery: [images.hajj, images.kaaba, images.madinahMosque, images.mosque],
    videos: ["https://www.youtube.com/watch?v=h0XYjz2bzFw"],
  },
  {
    id: "12",
    title: "Hajj Package - Government",
    titleBn: "হজ্জ প্যাকেজ - সরকারি",
    destination: "Makkah & Madinah",
    destinationBn: "মক্কা ও মদিনা",
    duration: "45 Days",
    durationBn: "৪৫ দিন",
    price: "BDT 480,000",
    priceBn: "৳ ৪,৮০,০০০",
    description: "Standard government-rate Hajj package following Ministry of Religious Affairs guidelines.",
    descriptionBn: "ধর্ম মন্ত্রণালয়ের নির্দেশনা অনুযায়ী সরকারি দরে হজ্জ প্যাকেজ।",
    image: images.madinahMosque,
    featured: false,
    category: "hajj",
    time: "45 Days", timeBn: "৪৫ দিন",
    transport: "Return Air Ticket + Govt. Bus", transportBn: "রিটার্ন এয়ার টিকেট + সরকারি বাস",
    hotel: "Standard (Govt. allocated)", hotelBn: "স্ট্যান্ডার্ড (সরকার বরাদ্দকৃত)",
    food: "3 Times Daily", foodBn: "প্রতিদিন ৩ বেলা",
    sightSeen: "Mina, Arafah, Muzdalifah", sightSeenBn: "মিনা, আরাফা, মুজদালিফা",
    others: "Visa, Mualem, Ihram, Insurance", othersBn: "ভিসা, মুয়াল্লিম, এহরাম, ইন্স্যুরেন্স",
    tourDetails: "Government-rate Hajj package strictly following Ministry of Religious Affairs guidelines — standard accommodations, all required transport, daily meals, trained Mualem and complete coverage of all Hajj rituals.",
    tourDetailsBn: "সরকারি দরে হজ্জ প্যাকেজ — ধর্ম মন্ত্রণালয়ের নির্দেশনা কঠোরভাবে অনুসরণ করে স্ট্যান্ডার্ড আবাসন, প্রয়োজনীয় সকল পরিবহন, প্রতিদিন খাবার, প্রশিক্ষিত মুয়াল্লিম এবং সকল হজ্জ আনুষ্ঠানিকতার সম্পূর্ণ কভারেজ।",
    gallery: [images.madinahMosque, images.hajj, images.kaaba, images.hajjPilgrims],
    videos: ["https://www.youtube.com/watch?v=CDM7HnYHqV0"],
  },
  {
    id: "13",
    title: "Makkah Hotel - Hilton Suites",
    titleBn: "মক্কা হোটেল - হিলটন স্যুটস",
    destination: "Makkah, Saudi Arabia",
    destinationBn: "মক্কা, সৌদি আরব",
    duration: "Per Night",
    durationBn: "প্রতি রাত",
    price: "BDT 12,500",
    priceBn: "৳ ১২,৫০০",
    description: "5-star luxury hotel with direct Haram view, walking distance to Kaaba.",
    descriptionBn: "হারামের সরাসরি দৃশ্যসহ ৫-স্টার লাক্সারি হোটেল, কাবা থেকে হাঁটা দূরত্ব।",
    image: images.mosque,
    featured: true,
    category: "hotel",
    time: "Flexible Check-in", timeBn: "নমনীয় চেক-ইন",
    transport: "Airport Pickup Available", transportBn: "এয়ারপোর্ট পিকআপ উপলব্ধ",
    hotel: "5 Star (Haram View)", hotelBn: "৫ স্টার (হারাম ভিউ)",
    food: "Buffet Breakfast Included", foodBn: "বুফে নাস্তা অন্তর্ভুক্ত",
    sightSeen: "Walking to Masjid al-Haram", sightSeenBn: "মসজিদুল হারামে হেঁটে যাওয়া",
    others: "Free WiFi, Prayer Mat, Quran", othersBn: "ফ্রি WiFi, জায়নামাজ, কুরআন",
    tourDetails: "Luxury 5-star accommodation in Makkah with stunning Haram views, premium amenities, buffet breakfast, and walking distance to the Holy Kaaba. Perfect for Umrah pilgrims seeking comfort.",
    tourDetailsBn: "মক্কায় ৫-স্টার লাক্সারি আবাসন — হারামের অসাধারণ দৃশ্য, প্রিমিয়াম সুবিধা, বুফে নাস্তা এবং পবিত্র কাবা থেকে হাঁটা দূরত্ব। উমরাহ যাত্রীদের জন্য পারফেক্ট।",
    gallery: [images.mosque, images.kaaba, images.hotel, images.madinahMosque],
    videos: [],
  },
  {
    id: "14",
    title: "Madinah Hotel - Anwar Al Madinah",
    titleBn: "মদিনা হোটেল - আনওয়ার আল মদিনা",
    destination: "Madinah, Saudi Arabia",
    destinationBn: "মদিনা, সৌদি আরব",
    duration: "Per Night",
    durationBn: "প্রতি রাত",
    price: "BDT 9,800",
    priceBn: "৳ ৯,৮০০",
    description: "Premium hotel facing Masjid an-Nabawi with modern rooms and excellent service.",
    descriptionBn: "মসজিদে নববীর সামনে প্রিমিয়াম হোটেল — আধুনিক রুম ও চমৎকার সেবা।",
    image: images.madinahMosque,
    featured: true,
    category: "hotel",
    time: "Flexible Check-in", timeBn: "নমনীয় চেক-ইন",
    transport: "Airport Pickup Available", transportBn: "এয়ারপোর্ট পিকআপ উপলব্ধ",
    hotel: "5 Star (Nabawi View)", hotelBn: "৫ স্টার (নববী ভিউ)",
    food: "Breakfast & Dinner Buffet", foodBn: "নাস্তা ও রাতের বুফে",
    sightSeen: "Walking to Masjid an-Nabawi", sightSeenBn: "মসজিদে নববীতে হেঁটে যাওয়া",
    others: "Free WiFi, Concierge, Laundry", othersBn: "ফ্রি WiFi, কনসিয়ারজ, লন্ড্রি",
    tourDetails: "Top-rated Madinah hotel directly facing the Prophet's Mosque with luxurious rooms, full board options, and 24/7 concierge service for a peaceful spiritual stay.",
    tourDetailsBn: "মদিনার শীর্ষ-রেটেড হোটেল — সরাসরি নবীজির মসজিদের সামনে, লাক্সারিয়াস রুম, ফুল বোর্ড অপশন এবং শান্ত আধ্যাত্মিক থাকার জন্য ২৪/৭ কনসিয়ারজ সেবা।",
    gallery: [images.madinahMosque, images.mosque, images.hotel, images.kaaba],
    videos: [],
  },
  {
    id: "15",
    title: "Dubai Hotel - Marina Luxury",
    titleBn: "দুবাই হোটেল - মেরিনা লাক্সারি",
    destination: "Dubai, UAE",
    destinationBn: "দুবাই, সংযুক্ত আরব আমিরাত",
    duration: "Per Night",
    durationBn: "প্রতি রাত",
    price: "BDT 11,000",
    priceBn: "৳ ১১,০০০",
    description: "Stunning marina-view hotel in downtown Dubai with pool and fine dining.",
    descriptionBn: "ডাউনটাউন দুবাইয়ে অসাধারণ মেরিনা-ভিউ হোটেল — পুল ও ফাইন ডাইনিং।",
    image: images.dubaiNight,
    featured: true,
    category: "hotel",
    time: "Flexible Check-in", timeBn: "নমনীয় চেক-ইন",
    transport: "Airport Transfer Included", transportBn: "এয়ারপোর্ট ট্রান্সফার অন্তর্ভুক্ত",
    hotel: "5 Star (Marina View)", hotelBn: "৫ স্টার (মেরিনা ভিউ)",
    food: "International Buffet Breakfast", foodBn: "ইন্টারন্যাশনাল বুফে নাস্তা",
    sightSeen: "Near Burj Khalifa & Dubai Mall", sightSeenBn: "বুর্জ খলিফা ও দুবাই মলের কাছে",
    others: "Pool, Spa, Gym, Free WiFi", othersBn: "পুল, স্পা, জিম, ফ্রি WiFi",
    tourDetails: "Experience luxury at Dubai Marina with panoramic views, infinity pool, spa, world-class dining, and easy access to Dubai's top attractions including Burj Khalifa and Dubai Mall.",
    tourDetailsBn: "দুবাই মেরিনায় বিলাসিতা উপভোগ করুন — প্যানোরামিক ভিউ, ইনফিনিটি পুল, স্পা, বিশ্বমানের ডাইনিং এবং বুর্জ খলিফা ও দুবাই মল সহ দুবাইয়ের শীর্ষ আকর্ষণে সহজ প্রবেশাধিকার।",
    gallery: [images.dubaiNight, images.dubai, images.hotel, images.airplane],
    videos: [],
  },
  {
    id: "16",
    title: "Cox's Bazar Hotel - Sea Pearl Resort",
    titleBn: "কক্সবাজার হোটেল - সি পার্ল রিসোর্ট",
    destination: "Cox's Bazar, Bangladesh",
    destinationBn: "কক্সবাজার, বাংলাদেশ",
    duration: "Per Night",
    durationBn: "প্রতি রাত",
    price: "BDT 6,500",
    priceBn: "৳ ৬,৫০০",
    description: "Beachfront 5-star resort with private beach access, pool and spa facilities.",
    descriptionBn: "সমুদ্র সৈকতে ৫-স্টার রিসোর্ট — প্রাইভেট সৈকত, পুল ও স্পা সুবিধা।",
    image: images.coxsbazarResort,
    featured: false,
    category: "hotel",
    time: "Flexible Check-in", timeBn: "নমনীয় চেক-ইন",
    transport: "Airport Pickup Available", transportBn: "এয়ারপোর্ট পিকআপ উপলব্ধ",
    hotel: "5 Star (Beachfront)", hotelBn: "৫ স্টার (সৈকতমুখী)",
    food: "Breakfast Buffet Included", foodBn: "বুফে নাস্তা অন্তর্ভুক্ত",
    sightSeen: "Private Beach, Himchori nearby", sightSeenBn: "প্রাইভেট সৈকত, হিমছড়ি কাছে",
    others: "Pool, Spa, Kids Zone, WiFi", othersBn: "পুল, স্পা, কিডস জোন, WiFi",
    tourDetails: "Bangladesh's premier beach resort offering luxurious sea-view rooms, private beach access, swimming pools, spa, kids zone and multiple dining options for the perfect family getaway.",
    tourDetailsBn: "বাংলাদেশের শীর্ষ বিচ রিসোর্ট — লাক্সারিয়াস সমুদ্র-ভিউ রুম, প্রাইভেট সৈকত, সুইমিং পুল, স্পা, কিডস জোন এবং পারফেক্ট পারিবারিক ভ্রমণের জন্য একাধিক ডাইনিং অপশন।",
    gallery: [images.coxsbazarResort, images.beach, images.coxsbazarSunset, images.hotel],
    videos: [],
  },
  {
    id: "17",
    title: "Thailand Tourist Visa",
    titleBn: "থাইল্যান্ড ট্যুরিস্ট ভিসা",
    destination: "Thailand",
    destinationBn: "থাইল্যান্ড",
    duration: "7-10 Working Days",
    durationBn: "৭-১০ কার্যদিবস",
    price: "BDT 5,800",
    priceBn: "৳ ৫,৮০০",
    description: "Hassle-free Thailand e-Visa processing with document support and quick approval.",
    descriptionBn: "ঝামেলামুক্ত থাইল্যান্ড ই-ভিসা প্রসেসিং — ডকুমেন্ট সাপোর্ট ও দ্রুত অনুমোদন।",
    image: images.thailand,
    featured: true,
    category: "visa",
    time: "7-10 Working Days", timeBn: "৭-১০ কার্যদিবস",
    transport: "N/A", transportBn: "প্রযোজ্য নয়",
    hotel: "N/A", hotelBn: "প্রযোজ্য নয়",
    food: "N/A", foodBn: "প্রযোজ্য নয়",
    sightSeen: "Single Entry / 60 Days Stay", sightSeenBn: "সিঙ্গেল এন্ট্রি / ৬০ দিন থাকা",
    others: "Passport, Photo, Bank Statement", othersBn: "পাসপোর্ট, ছবি, ব্যাংক স্টেটমেন্ট",
    tourDetails: "Complete Thailand tourist visa processing service. We handle document preparation, embassy submission, and follow-up. Required: passport (6+ months validity), 2 photos, bank statement (last 3 months), NID copy.",
    tourDetailsBn: "সম্পূর্ণ থাইল্যান্ড ট্যুরিস্ট ভিসা প্রসেসিং সেবা। আমরা ডকুমেন্ট প্রস্তুতি, দূতাবাসে জমা ও ফলো-আপ করি। প্রয়োজন: পাসপোর্ট (৬+ মাস মেয়াদ), ২টি ছবি, ব্যাংক স্টেটমেন্ট (শেষ ৩ মাস), NID কপি।",
    gallery: [images.thailand, images.thailandMarket],
    videos: [],
  },
  {
    id: "18",
    title: "Malaysia e-Visa",
    titleBn: "মালয়েশিয়া ই-ভিসা",
    destination: "Malaysia",
    destinationBn: "মালয়েশিয়া",
    duration: "5-7 Working Days",
    durationBn: "৫-৭ কার্যদিবস",
    price: "BDT 4,500",
    priceBn: "৳ ৪,৫০০",
    description: "Quick Malaysia eVisa processing with full document guidance for tourists and visitors.",
    descriptionBn: "দ্রুত মালয়েশিয়া ই-ভিসা প্রসেসিং — পর্যটক ও ভিজিটরদের জন্য সম্পূর্ণ ডকুমেন্ট গাইডেন্স।",
    image: images.malaysia,
    featured: true,
    category: "visa",
    time: "5-7 Working Days", timeBn: "৫-৭ কার্যদিবস",
    transport: "N/A", transportBn: "প্রযোজ্য নয়",
    hotel: "N/A", hotelBn: "প্রযোজ্য নয়",
    food: "N/A", foodBn: "প্রযোজ্য নয়",
    sightSeen: "Single Entry / 30 Days Stay", sightSeenBn: "সিঙ্গেল এন্ট্রি / ৩০ দিন থাকা",
    others: "Passport, Photo, Hotel Booking", othersBn: "পাসপোর্ট, ছবি, হোটেল বুকিং",
    tourDetails: "Fast and reliable Malaysia eVisa service. Required documents: passport (6+ months validity), recent photo, hotel booking confirmation, return ticket, bank statement.",
    tourDetailsBn: "দ্রুত ও নির্ভরযোগ্য মালয়েশিয়া ই-ভিসা সেবা। প্রয়োজনীয় ডকুমেন্ট: পাসপোর্ট (৬+ মাস মেয়াদ), সাম্প্রতিক ছবি, হোটেল বুকিং কনফার্মেশন, রিটার্ন টিকেট, ব্যাংক স্টেটমেন্ট।",
    gallery: [images.malaysia],
    videos: [],
  },
  {
    id: "19",
    title: "Dubai (UAE) Tourist Visa",
    titleBn: "দুবাই (UAE) ট্যুরিস্ট ভিসা",
    destination: "United Arab Emirates",
    destinationBn: "সংযুক্ত আরব আমিরাত",
    duration: "3-5 Working Days",
    durationBn: "৩-৫ কার্যদিবস",
    price: "BDT 18,500",
    priceBn: "৳ ১৮,৫০০",
    description: "30-day UAE tourist visa with express processing — perfect for Dubai holidays and family visits.",
    descriptionBn: "৩০ দিনের UAE ট্যুরিস্ট ভিসা — এক্সপ্রেস প্রসেসিং, দুবাই ভ্রমণ ও পরিবার দেখার জন্য পারফেক্ট।",
    image: images.dubai,
    featured: true,
    category: "visa",
    time: "3-5 Working Days", timeBn: "৩-৫ কার্যদিবস",
    transport: "N/A", transportBn: "প্রযোজ্য নয়",
    hotel: "N/A", hotelBn: "প্রযোজ্য নয়",
    food: "N/A", foodBn: "প্রযোজ্য নয়",
    sightSeen: "Single Entry / 30 Days Stay", sightSeenBn: "সিঙ্গেল এন্ট্রি / ৩০ দিন থাকা",
    others: "Passport, Photo, Ticket, Hotel", othersBn: "পাসপোর্ট, ছবি, টিকেট, হোটেল",
    tourDetails: "Hassle-free UAE tourist visa processing with high approval rate. We assist with all paperwork including passport copy, color photo, confirmed return ticket, hotel booking and bank statement.",
    tourDetailsBn: "উচ্চ অনুমোদনের হার সহ ঝামেলামুক্ত UAE ট্যুরিস্ট ভিসা প্রসেসিং। আমরা সমস্ত কাগজপত্রে সহায়তা করি — পাসপোর্ট কপি, কালার ছবি, কনফার্ম রিটার্ন টিকেট, হোটেল বুকিং ও ব্যাংক স্টেটমেন্ট।",
    gallery: [images.dubai, images.dubaiNight],
    videos: [],
  },
  {
    id: "20",
    title: "Schengen Visa Processing",
    titleBn: "শেনজেন ভিসা প্রসেসিং",
    destination: "Schengen Countries (EU)",
    destinationBn: "শেনজেন দেশসমূহ (EU)",
    duration: "15-30 Working Days",
    durationBn: "১৫-৩০ কার্যদিবস",
    price: "BDT 5,000 (Processing Fee)",
    priceBn: "৳ ৫,০০০ (প্রসেসিং ফি)",
    description: "Professional Schengen visa consultation and full document preparation for 27 European countries.",
    descriptionBn: "পেশাদার শেনজেন ভিসা পরামর্শ ও ২৭টি ইউরোপীয় দেশের জন্য সম্পূর্ণ ডকুমেন্ট প্রস্তুতি।",
    image: images.airplane,
    featured: false,
    category: "visa",
    time: "15-30 Working Days", timeBn: "১৫-৩০ কার্যদিবস",
    transport: "N/A", transportBn: "প্রযোজ্য নয়",
    hotel: "N/A", hotelBn: "প্রযোজ্য নয়",
    food: "N/A", foodBn: "প্রযোজ্য নয়",
    sightSeen: "27 European Countries Access", sightSeenBn: "২৭টি ইউরোপীয় দেশে প্রবেশ",
    others: "Insurance, Sponsor Letter, Itinerary", othersBn: "ইন্স্যুরেন্স, স্পনসর লেটার, ভ্রমণসূচি",
    tourDetails: "Expert Schengen visa preparation covering France, Germany, Italy, Spain, Netherlands and 22 other countries. We help with travel insurance, accommodation booking, detailed itinerary, sponsor letter, financial documents and embassy appointment.",
    tourDetailsBn: "ফ্রান্স, জার্মানি, ইতালি, স্পেন, নেদারল্যান্ডস সহ ২৭টি দেশের জন্য বিশেষজ্ঞ শেনজেন ভিসা প্রস্তুতি। ভ্রমণ ইন্স্যুরেন্স, আবাসন বুকিং, বিস্তারিত ভ্রমণসূচি, স্পনসর লেটার, আর্থিক ডকুমেন্ট ও দূতাবাস অ্যাপয়েন্টমেন্টে আমরা সহায়তা করি।",
    gallery: [images.airplane],
    videos: [],
  },
];
