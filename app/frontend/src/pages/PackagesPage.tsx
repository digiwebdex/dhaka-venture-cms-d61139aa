import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PackagesPage = () => {
  const { t, lang } = useLang();
  const { packages } = useCms();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">{t.nav.packages}</h1>
        <p className="text-muted-foreground text-center mb-10">{t.services.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-48 overflow-hidden">
                <img src={pkg.image} alt={lang === "bn" ? pkg.titleBn : pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
              <CardContent className="p-5">
                <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded mb-2 capitalize">
                  {pkg.category}
                </div>
                <h3 className="font-bold text-lg mb-1">{lang === "bn" ? pkg.titleBn : pkg.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {lang === "bn" ? pkg.destinationBn : pkg.destination} • {lang === "bn" ? pkg.durationBn : pkg.duration}
                </p>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{lang === "bn" ? pkg.descriptionBn : pkg.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-primary">{lang === "bn" ? pkg.priceBn : pkg.price}</span>
                  <Link to={`/packages/${pkg.id}`}>
                    <Button size="sm" variant="gold">{t.nav.viewDetails}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
