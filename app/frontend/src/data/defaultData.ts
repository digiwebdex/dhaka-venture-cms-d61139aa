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
  category: "umrah" | "tour" | "hajj";
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
];
