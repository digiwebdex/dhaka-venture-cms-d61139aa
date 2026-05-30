import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users } from "lucide-react";

const AboutPage = () => {
  const { t, lang } = useLang();
  const { settings, pageContent } = useCms();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">{t.about.title}</h1>

        <div className="flex justify-center mb-8">
          <img src="/logo_prime.png" alt="Logo" className="h-24 w-auto" />
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed text-center mb-12">
          {lang === "bn" ? pageContent.aboutTextBn : pageContent.aboutText}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-gold">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-gold" />
                <h3 className="font-bold text-xl">{t.about.mission}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {lang === "bn" ? pageContent.missionTextBn : pageContent.missionText}
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-xl">{t.about.vision}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {lang === "bn" ? pageContent.visionTextBn : pageContent.visionText}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-navy-gradient text-primary-foreground">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-gold" />
            <h3 className="font-bold text-2xl mb-2">{lang === "bn" ? settings.companyNameBn : settings.companyName}</h3>
            <p className="text-gold text-lg">{lang === "bn" ? settings.sloganBn : settings.slogan}</p>
            <p className="mt-4 text-primary-foreground/70">{lang === "bn" ? settings.addressBn : settings.address}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
