import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, Tag, Bus, Building2, Utensils, Camera, Info,
  FileText, PlayCircle, Shield, Users, ChefHat, BadgeCheck, Images, Video,
} from "lucide-react";
import BookingFormDialog from "@/components/BookingFormDialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const toEmbed = (url: string) => {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return yt ? `https://www.youtube.com/embed/${yt[1]}` : url;
};

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) => (
  <div className="grid grid-cols-[auto_1fr_2fr] items-center border-b border-border last:border-b-0">
    <div className="px-4 py-3 text-primary"><Icon className="w-5 h-5" /></div>
    <div className="px-2 py-3 font-semibold text-foreground">{label}</div>
    <div className="px-4 py-3 text-muted-foreground border-l border-border">
      {value && value.trim() ? value : "—"}
    </div>
  </div>
);

const PackageDetailPage = () => {
  const { id } = useParams();
  const { lang } = useLang();
  const { packages } = useCms();
  const isBn = lang === "bn";
  const pkg = packages.find((p) => p.id === id);
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!pkg) return <Navigate to="/packages" replace />;

  const title = isBn ? pkg.titleBn : pkg.title;
  const desc = isBn ? pkg.descriptionBn : pkg.description;
  const dur = isBn ? pkg.durationBn : pkg.duration;
  const price = isBn ? pkg.priceBn : pkg.price;
  const tourDetails = isBn ? pkg.tourDetailsBn : pkg.tourDetails;

  const L = isBn
    ? {
        time: "সময়কাল", transport: "যাতায়াত", hotel: "হোটেল", food: "খাবার",
        sightSeen: "দর্শনীয় স্থান", others: "অন্যান্য",
        about: "ট্যুর সম্পর্কে", gallery: "ছবি সমূহ", videos: "ভিডিও সমূহ",
        infoTitle: "প্যাকেজের তথ্য", book: "বুকিং করুন",
        viewItinerary: "ট্যুরের বিস্তারিত সূচি দেখুন", back: "সব প্যাকেজ",
        perPerson: "জন প্রতি",
        media: "ছবি ও ভিডিও", viewMedia: "ছবি ও ভিডিও দেখুন",
        f1t: "নিরাপদ ভ্রমণ", f1d: "নিরাপত্তাই আমাদের প্রথম অগ্রাধিকার",
        f2t: "অভিজ্ঞ টিম", f2d: "দক্ষ ও অভিজ্ঞ টিম সার্ভিস",
        f3t: "সুস্বাদু খাবার", f3d: "পরিচ্ছন্ন ও মানসম্মত খাবার",
        f4t: "সেরা সার্ভিস", f4d: "আপনার সন্তুষ্টিই আমাদের লক্ষ্য",
      }
    : {
        time: "Duration", transport: "Transport", hotel: "Hotel", food: "Food",
        sightSeen: "Sight Seen", others: "Others",
        about: "About Tour", gallery: "Gallery", videos: "Videos",
        infoTitle: "Package Information", book: "Book Now",
        viewItinerary: "View Detailed Itinerary", back: "All Packages",
        perPerson: "per person",
        media: "Photos & Videos", viewMedia: "View Photos & Videos",
        f1t: "Safe Travel", f1d: "Safety is our first priority",
        f2t: "Expert Team", f2d: "Skilled & experienced team",
        f3t: "Tasty Food", f3d: "Clean & quality meals",
        f4t: "Best Service", f4d: "Your satisfaction is our goal",
      };

  const hasGallery = pkg.gallery && pkg.gallery.length > 0;
  const hasVideos = pkg.videos && pkg.videos.length > 0;
  const hasMedia = hasGallery || hasVideos;

  return (
    <div className="py-10 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <Link to="/packages" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> {L.back}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* HERO LEFT */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[320px] md:h-[420px]">
              <img src={pkg.image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between text-primary-foreground">
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-md mb-3">{title}</h1>
                  <div className="inline-flex items-center gap-2 bg-primary/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                    <Calendar className="w-4 h-4 text-gold" /> {dur}
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 bg-primary/80 backdrop-blur-sm px-5 py-3 rounded-full text-lg font-bold w-fit">
                  <Tag className="w-5 h-5 text-gold" />
                  <span className="text-gold">{price}</span>
                  <span className="text-xs font-normal opacity-90">{L.perPerson}</span>
                </div>
              </div>
            </div>

            {/* Description + Booking button */}
            <div className="mt-5 bg-card rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-border">
              <p className="text-muted-foreground flex-1">{desc}</p>
              <Button
                size="lg"
                onClick={() => setBookingOpen(true)}
                className="bg-[hsl(22_90%_55%)] hover:bg-[hsl(22_90%_48%)] text-white rounded-full px-6 shrink-0"
              >
                <Calendar className="w-4 h-4 mr-2" /> {L.book}
              </Button>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">
            {/* About */}
            <Card className="overflow-hidden">
              <div className="bg-primary text-primary-foreground py-3 px-5 text-center font-bold rounded-t-lg">{L.about}</div>
              <div className="p-5 text-sm text-muted-foreground leading-relaxed">{desc}</div>
            </Card>

            {/* Info Table */}
            <Card className="overflow-hidden">
              <div className="bg-primary text-primary-foreground py-3 px-5 text-center font-bold text-lg">{L.infoTitle}</div>
              <div>
                <InfoRow icon={Calendar} label={L.time} value={isBn ? pkg.timeBn || pkg.durationBn : pkg.time || pkg.duration} />
                <InfoRow icon={Bus} label={L.transport} value={isBn ? pkg.transportBn : pkg.transport} />
                <InfoRow icon={Building2} label={L.hotel} value={isBn ? pkg.hotelBn : pkg.hotel} />
                <InfoRow icon={Utensils} label={L.food} value={isBn ? pkg.foodBn : pkg.food} />
                <InfoRow icon={Camera} label={L.sightSeen} value={isBn ? pkg.sightSeenBn : pkg.sightSeen} />
                <InfoRow icon={Info} label={L.others} value={isBn ? pkg.othersBn : pkg.others} />
              </div>
            </Card>
          </div>
        </div>

        {/* Itinerary — collapsible */}
        {tourDetails && (
          <Card className="mb-6 overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-center gap-2 cursor-pointer py-4 px-5 text-primary font-semibold hover:bg-muted/50 list-none">
                <FileText className="w-5 h-5" /> {L.viewItinerary}
              </summary>
              <div className="p-6 text-muted-foreground whitespace-pre-line leading-relaxed border-t border-border">
                {tourDetails}
              </div>
            </details>
          </Card>
        )}

        {/* Media (Photos & Videos in tabs, collapsed by default) */}
        {hasMedia && (
          <Card className="mb-6 overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-center gap-2 cursor-pointer py-4 px-5 text-primary font-semibold hover:bg-muted/50 list-none">
                <Images className="w-5 h-5" /> {L.viewMedia}
              </summary>
              <div className="p-5 border-t border-border">
                <Tabs defaultValue={hasGallery ? "images" : "videos"} className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-5">
                    {hasGallery && (
                      <TabsTrigger value="images" className="gap-2">
                        <Images className="w-4 h-4" /> {L.gallery}
                      </TabsTrigger>
                    )}
                    {hasVideos && (
                      <TabsTrigger value="videos" className="gap-2">
                        <Video className="w-4 h-4" /> {L.videos}
                      </TabsTrigger>
                    )}
                  </TabsList>

                  {hasGallery && (
                    <TabsContent value="images">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {pkg.gallery!.map((src, i) => (
                          <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="block">
                            <img
                              src={src}
                              alt={`${title} ${i + 1}`}
                              className="w-full h-40 object-cover rounded-lg hover:opacity-90 transition"
                              loading="lazy"
                            />
                          </a>
                        ))}
                      </div>
                    </TabsContent>
                  )}

                  {hasVideos && (
                    <TabsContent value="videos">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pkg.videos!.map((url, i) => (
                          <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                            <iframe
                              src={toEmbed(url)}
                              title={`Video ${i + 1}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </details>
          </Card>
        )}

        {/* Trust Strip */}
        <div className="bg-[hsl(45_85%_95%)] dark:bg-muted rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { I: Shield, t: L.f1t, d: L.f1d },
            { I: Users, t: L.f2t, d: L.f2d },
            { I: ChefHat, t: L.f3t, d: L.f3d },
            { I: BadgeCheck, t: L.f4t, d: L.f4d },
          ].map(({ I, t, d }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full p-2 shrink-0">
                <I className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-foreground">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>

        <BookingFormDialog open={bookingOpen} onOpenChange={setBookingOpen} packageName={title} />
      </div>
    </div>
  );
};

export default PackageDetailPage;
