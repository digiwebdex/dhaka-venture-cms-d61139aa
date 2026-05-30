import { Helmet } from "react-helmet-async";
import { useCms } from "@/contexts/CmsContext";
import { useLang } from "@/contexts/LanguageContext";

const SeoHead = () => {
  const { seoSettings, settings } = useCms();
  const { lang } = useLang();

  const title = lang === "bn" ? seoSettings.metaTitleBn : seoSettings.metaTitle;
  const description = lang === "bn" ? seoSettings.metaDescriptionBn : seoSettings.metaDescription;
  const keywords = lang === "bn" ? seoSettings.keywordsBn : seoSettings.keywords;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={settings.companyName} />
      {seoSettings.canonicalUrl && <link rel="canonical" href={seoSettings.canonicalUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {seoSettings.ogImage && <meta property="og:image" content={seoSettings.ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {seoSettings.ogImage && <meta name="twitter:image" content={seoSettings.ogImage} />}
    </Helmet>
  );
};

export default SeoHead;
