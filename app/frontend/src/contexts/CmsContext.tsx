import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import {
  SiteSettings, PageContent, VisaRate, Package, Booking,
  HeroSlide, StatItem, FlightRoute, UmrahOffer,
  SeoSettings, ServiceItem, FooterContent, ContactCtaContent,
  defaultSettings, defaultPageContent, defaultVisaRates, defaultPackages,
  defaultHeroSlides, defaultStats, defaultFlightRoutes, defaultUmrahOffer,
  defaultSeoSettings, defaultServices, defaultFooterContent, defaultContactCta,
} from "@/data/defaultData";
import { cmsGet, cmsPut, getAdminToken } from "@/lib/api";

interface CmsContextType {
  settings: SiteSettings;
  pageContent: PageContent;
  visaRates: VisaRate[];
  packages: Package[];
  bookings: Booking[];
  heroSlides: HeroSlide[];
  stats: StatItem[];
  flightRoutes: FlightRoute[];
  umrahOffer: UmrahOffer;
  seoSettings: SeoSettings;
  services: ServiceItem[];
  footerContent: FooterContent;
  contactCta: ContactCtaContent;
  loaded: boolean;
  updateSettings: (s: SiteSettings) => void;
  updatePageContent: (p: PageContent) => void;
  updateVisaRates: (v: VisaRate[]) => void;
  updatePackages: (p: Package[]) => void;
  addBooking: (b: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  addPackage: (p: Package) => void;
  deletePackage: (id: string) => void;
  addVisaRate: (v: VisaRate) => void;
  deleteVisaRate: (id: string) => void;
  updateHeroSlides: (s: HeroSlide[]) => void;
  addHeroSlide: (s: HeroSlide) => void;
  deleteHeroSlide: (id: string) => void;
  updateStats: (s: StatItem[]) => void;
  addStat: (s: StatItem) => void;
  deleteStat: (id: string) => void;
  updateFlightRoutes: (r: FlightRoute[]) => void;
  addFlightRoute: (r: FlightRoute) => void;
  deleteFlightRoute: (id: string) => void;
  updateUmrahOffer: (o: UmrahOffer) => void;
  updateSeoSettings: (s: SeoSettings) => void;
  updateServices: (s: ServiceItem[]) => void;
  addService: (s: ServiceItem) => void;
  deleteService: (id: string) => void;
  updateFooterContent: (f: FooterContent) => void;
  updateContactCta: (c: ContactCtaContent) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

// localStorage acts as offline cache + initial paint before API resolves
function sanitize<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (Array.isArray(fallback)) return (Array.isArray(value) ? value : fallback) as T;
  if (typeof fallback === "object") {
    if (typeof value !== "object" || Array.isArray(value)) return fallback;
    return { ...(fallback as object), ...(value as object) } as T;
  }
  return value as T;
}
function loadCache<T>(key: string, fallback: T): T {
  try {
    const data = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (!data) return fallback;
    return sanitize(JSON.parse(data), fallback);
  } catch {
    return fallback;
  }
}
function saveCache<T>(key: string, value: T) {
  try {
    if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(value));
  } catch { /* quota */ }
}

// Map of state key → backend cms key
const KEYS = {
  settings: "settings",
  pageContent: "pageContent",
  visaRates: "visaRates",
  packages: "packages",
  heroSlides: "heroSlides",
  stats: "stats",
  flightRoutes: "flightRoutes",
  umrahOffer: "umrahOffer",
  seoSettings: "seoSettings",
  services: "services",
  footerContent: "footerContent",
  contactCta: "contactCta",
} as const;

// Hook that hydrates from API once and saves writes back to API (debounced).
function useApiState<T>(cmsKey: string, fallback: T, hydrated: boolean): [T, React.Dispatch<React.SetStateAction<T>>] {
  const cacheKey = `cms_${cmsKey}`;
  const [value, setValue] = useState<T>(() => loadCache<T>(cacheKey, fallback));
  const skipNextSave = useRef(true); // skip first save (initial hydration)
  const timer = useRef<number | null>(null);

  // Save to cache + API on change (debounced)
  useEffect(() => {
    saveCache(cacheKey, value);
    if (!hydrated) return; // don't write during initial hydration
    if (skipNextSave.current) { skipNextSave.current = false; return; }
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      // Only attempt API write if admin token present (public visitors stay read-only)
      if (!getAdminToken()) return;
      cmsPut(cmsKey, value).catch((e) => console.warn(`[cms] save ${cmsKey} failed:`, e.message));
    }, 400);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [value, cmsKey, cacheKey, hydrated]);

  return [value, setValue];
}

export const CmsProvider = ({ children }: { children: ReactNode }) => {
  const [hydrated, setHydrated] = useState(false);

  const [settings, setSettings] = useApiState<SiteSettings>(KEYS.settings, defaultSettings, hydrated);
  const [pageContent, setPageContent] = useApiState<PageContent>(KEYS.pageContent, defaultPageContent, hydrated);
  const [visaRates, setVisaRates] = useApiState<VisaRate[]>(KEYS.visaRates, defaultVisaRates, hydrated);
  const [packages, setPackages] = useApiState<Package[]>(KEYS.packages, defaultPackages, hydrated);
  const [heroSlides, setHeroSlides] = useApiState<HeroSlide[]>(KEYS.heroSlides, defaultHeroSlides, hydrated);
  const [stats, setStats] = useApiState<StatItem[]>(KEYS.stats, defaultStats, hydrated);
  const [flightRoutes, setFlightRoutes] = useApiState<FlightRoute[]>(KEYS.flightRoutes, defaultFlightRoutes, hydrated);
  const [umrahOffer, setUmrahOffer] = useApiState<UmrahOffer>(KEYS.umrahOffer, defaultUmrahOffer, hydrated);
  const [seoSettings, setSeoSettings] = useApiState<SeoSettings>(KEYS.seoSettings, defaultSeoSettings, hydrated);
  const [services, setServices] = useApiState<ServiceItem[]>(KEYS.services, defaultServices, hydrated);
  const [footerContent, setFooterContent] = useApiState<FooterContent>(KEYS.footerContent, defaultFooterContent, hydrated);
  const [contactCta, setContactCta] = useApiState<ContactCtaContent>(KEYS.contactCta, defaultContactCta, hydrated);

  // Bookings stay localStorage-only for now (booking form already pushes to WhatsApp)
  const [bookings, setBookings] = useState<Booking[]>(() => loadCache<Booking[]>("cms_bookings", []));
  useEffect(() => { saveCache("cms_bookings", bookings); }, [bookings]);

  // Hydrate from API on mount — fetch all keys in parallel.
  // If a key returns null (not yet stored), keep cache/default value.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.allSettled([
          cmsGet<SiteSettings>(KEYS.settings),
          cmsGet<PageContent>(KEYS.pageContent),
          cmsGet<VisaRate[]>(KEYS.visaRates),
          cmsGet<Package[]>(KEYS.packages),
          cmsGet<HeroSlide[]>(KEYS.heroSlides),
          cmsGet<StatItem[]>(KEYS.stats),
          cmsGet<FlightRoute[]>(KEYS.flightRoutes),
          cmsGet<UmrahOffer>(KEYS.umrahOffer),
          cmsGet<SeoSettings>(KEYS.seoSettings),
          cmsGet<ServiceItem[]>(KEYS.services),
          cmsGet<FooterContent>(KEYS.footerContent),
          cmsGet<ContactCtaContent>(KEYS.contactCta),
        ]);
        if (cancelled) return;
        const setters = [
          setSettings, setPageContent, setVisaRates, setPackages,
          setHeroSlides, setStats, setFlightRoutes, setUmrahOffer,
          setSeoSettings, setServices, setFooterContent, setContactCta,
        ];
        const keys = [
          KEYS.settings, KEYS.pageContent, KEYS.visaRates, KEYS.packages,
          KEYS.heroSlides, KEYS.stats, KEYS.flightRoutes, KEYS.umrahOffer,
          KEYS.seoSettings, KEYS.services, KEYS.footerContent, KEYS.contactCta,
        ];
        const defaults: unknown[] = [
          defaultSettings, defaultPageContent, defaultVisaRates, defaultPackages,
          defaultHeroSlides, defaultStats, defaultFlightRoutes, defaultUmrahOffer,
          defaultSeoSettings, defaultServices, defaultFooterContent, defaultContactCta,
        ];
        const missingKeys: { key: string; value: unknown }[] = [];
        results.forEach((r, i) => {
          const apiValue = r.status === "fulfilled" ? r.value : undefined;
          if (apiValue == null) {
            // Mark for seeding if admin is logged in
            missingKeys.push({ key: keys[i], value: defaults[i] });
            return;
          }
          let value: unknown = sanitize(apiValue, defaults[i]);
          // Backfill packages: merge stored entries with defaults so old DB rows
          // automatically get gallery / videos / detail-table fields, AND
          // append any new default packages that aren't in the DB yet.
          if (setters[i] === setPackages && Array.isArray(value)) {
            const defaultsById = new Map(defaultPackages.map((p) => [p.id, p]));
            const pick = <T,>(stored: T, def: T): T => {
              if (stored === undefined || stored === null) return def;
              if (typeof stored === "string" && stored.trim() === "") return def;
              if (Array.isArray(stored) && stored.length === 0) return def;
              return stored;
            };
            const merged = (value as Package[]).map((p) => {
              const def = defaultsById.get(p.id);
              if (!def) return p;
              const m: Package = { ...def, ...p };
              (Object.keys(def) as (keyof Package)[]).forEach((k) => {
                (m as any)[k] = pick((p as any)[k], (def as any)[k]);
              });
              return m;
            });
            const existingIds = new Set(merged.map((p) => p.id));
            const newOnes = defaultPackages.filter((p) => !existingIds.has(p.id));
            const finalList = [...merged, ...newOnes];
            value = finalList;
            // Persist appended packages back to VPS so admin sees them
            if (newOnes.length > 0 && getAdminToken()) {
              console.log(`[cms] appending ${newOnes.length} new default packages to VPS…`);
              cmsPut(KEYS.packages, finalList).catch((e) =>
                console.warn("[cms] append packages failed:", e.message),
              );
            }
          }
          (setters[i] as React.Dispatch<React.SetStateAction<unknown>>)(value);
        });

        // Auto-seed missing keys when admin is logged in, so the admin panel
        // immediately shows all default sections and they persist on the VPS.
        if (getAdminToken() && missingKeys.length > 0) {
          console.log(`[cms] seeding ${missingKeys.length} default sections to VPS…`);
          await Promise.allSettled(
            missingKeys.map(({ key, value }) =>
              cmsPut(key, value).catch((e) => console.warn(`[cms] seed ${key} failed:`, e.message)),
            ),
          );
        }
      } catch (e) {
        console.warn("[cms] hydration failed, using cache/defaults:", e);
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CmsContext.Provider value={{
      settings, pageContent, visaRates, packages, bookings,
      heroSlides, stats, flightRoutes, umrahOffer,
      seoSettings, services, footerContent, contactCta,
      loaded: hydrated,
      updateSettings: setSettings,
      updatePageContent: setPageContent,
      updateVisaRates: setVisaRates,
      updatePackages: setPackages,
      addBooking: (b) => setBookings((prev) => [...prev, b]),
      updateBooking: (id, updates) => setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b))),
      deleteBooking: (id) => setBookings((prev) => prev.filter((b) => b.id !== id)),
      addPackage: (p) => setPackages((prev) => [...prev, p]),
      deletePackage: (id) => setPackages((prev) => prev.filter((p) => p.id !== id)),
      addVisaRate: (v) => setVisaRates((prev) => [...prev, v]),
      deleteVisaRate: (id) => setVisaRates((prev) => prev.filter((v) => v.id !== id)),
      updateHeroSlides: setHeroSlides,
      addHeroSlide: (s) => setHeroSlides((prev) => [...prev, s]),
      deleteHeroSlide: (id) => setHeroSlides((prev) => prev.filter((s) => s.id !== id)),
      updateStats: setStats,
      addStat: (s) => setStats((prev) => [...prev, s]),
      deleteStat: (id) => setStats((prev) => prev.filter((s) => s.id !== id)),
      updateFlightRoutes: setFlightRoutes,
      addFlightRoute: (r) => setFlightRoutes((prev) => [...prev, r]),
      deleteFlightRoute: (id) => setFlightRoutes((prev) => prev.filter((r) => r.id !== id)),
      updateUmrahOffer: setUmrahOffer,
      updateSeoSettings: setSeoSettings,
      updateServices: setServices,
      addService: (s) => setServices((prev) => [...prev, s]),
      deleteService: (id) => setServices((prev) => prev.filter((s) => s.id !== id)),
      updateFooterContent: setFooterContent,
      updateContactCta: setContactCta,
    }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    return {
      settings: defaultSettings, pageContent: defaultPageContent,
      visaRates: defaultVisaRates, packages: defaultPackages,
      bookings: [] as Booking[], heroSlides: defaultHeroSlides,
      stats: defaultStats, flightRoutes: defaultFlightRoutes,
      umrahOffer: defaultUmrahOffer, seoSettings: defaultSeoSettings,
      services: defaultServices, footerContent: defaultFooterContent,
      contactCta: defaultContactCta,
      loaded: false,
      updateSettings: () => {}, updatePageContent: () => {},
      updateVisaRates: () => {}, updatePackages: () => {},
      addBooking: () => {}, updateBooking: () => {}, deleteBooking: () => {},
      addPackage: () => {}, deletePackage: () => {},
      addVisaRate: () => {}, deleteVisaRate: () => {},
      updateHeroSlides: () => {}, addHeroSlide: () => {}, deleteHeroSlide: () => {},
      updateStats: () => {}, addStat: () => {}, deleteStat: () => {},
      updateFlightRoutes: () => {}, addFlightRoute: () => {}, deleteFlightRoute: () => {},
      updateUmrahOffer: () => {},
      updateSeoSettings: () => {}, updateServices: () => {},
      addService: () => {}, deleteService: () => {},
      updateFooterContent: () => {}, updateContactCta: () => {},
    } as CmsContextType;
  }
  return ctx;
};
