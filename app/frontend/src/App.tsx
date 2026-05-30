import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CmsProvider } from "@/contexts/CmsContext";
import SeoHead from "@/components/SeoHead";

import PublicLayout from "@/components/PublicLayout";
import Index from "./pages/Index";
import PackagesPage from "./pages/PackagesPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import HajjUmrahPage from "./pages/services/HajjUmrahPage";
import TourPackagesPage from "./pages/services/TourPackagesPage";
import AirTicketPage from "./pages/services/AirTicketPage";
import HotelBookingPage from "./pages/services/HotelBookingPage";
import VisaProcessingPage from "./pages/services/VisaProcessingPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContent from "./pages/admin/AdminContent";
import AdminPackages from "./pages/admin/AdminPackages";
import AdminVisa from "./pages/admin/AdminVisa";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminHeroSlides from "./pages/admin/AdminHeroSlides";
import AdminStats from "./pages/admin/AdminStats";
import AdminFlightOffers from "./pages/admin/AdminFlightOffers";
import AdminUmrahOffer from "./pages/admin/AdminUmrahOffer";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminServices from "./pages/admin/AdminServices";
import AdminFooter from "./pages/admin/AdminFooter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <LanguageProvider>
        <CmsProvider>
          <TooltipProvider>
            <SeoHead />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/packages" element={<PackagesPage />} />
                  <Route path="/packages/:id" element={<PackageDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/services/hajj-umrah" element={<HajjUmrahPage />} />
                  <Route path="/services/tour-packages" element={<TourPackagesPage />} />
                  <Route path="/services/air-ticket" element={<AirTicketPage />} />
                  <Route path="/services/hotel-booking" element={<HotelBookingPage />} />
                  <Route path="/services/visa-processing" element={<VisaProcessingPage />} />
                </Route>

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="packages" element={<AdminPackages />} />
                  <Route path="visa" element={<AdminVisa />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="hero-slides" element={<AdminHeroSlides />} />
                  <Route path="stats" element={<AdminStats />} />
                  <Route path="flight-offers" element={<AdminFlightOffers />} />
                  <Route path="umrah-offer" element={<AdminUmrahOffer />} />
                  <Route path="seo" element={<AdminSEO />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="footer" element={<AdminFooter />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CmsProvider>
      </LanguageProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
