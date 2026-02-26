import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, ExternalLink } from "lucide-react";
import radiantFlexoLogo from "@/assets/Radiant Flexo Logo.svg";
import containersLogo from "@/assets/ClamPak-Logo.svg";
import cartonsLogo from "@/assets/logo-five-star-cartons.svg";
import corrugatedLogo from "@/assets/CorrStar Logo.svg";
import ppcorr from "@/assets/Industry-Plastic-Logo.svg";
import flexibleImage from "@/assets/Radiant photo.png";
import containersImage from "@/assets/container photo.png";
import corrugatedImage from "@/assets/Corrugated photo.png";
import cartonImage from "@/assets/Folding photo.png";
import industryImage from "@/assets/pp corr photo.png";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

const Divisions = () => {
  const { t } = useI18n();

  const divisions = [
    {
      name: "Radiant Flexo",
      description: t("division.radiant.description"),
      details: [
        t("division.radiant.detail1"),
        t("division.radiant.detail2"),
        t("division.radiant.detail3"),
        t("division.radiant.detail4"),
      ],
      logo: radiantFlexoLogo,
      logoClassName: "scale-100",
      image: flexibleImage,
      website: "https://radiantflexo.com",
    },
    {
      name: "Apex Rigid",
      description: t("division.apex.description"),
      details: [
        t("division.apex.detail1"),
        t("division.apex.detail2"),
        t("division.apex.detail3"),
        t("division.apex.detail4"),
      ],
      logo: containersLogo,
      logoClassName: "scale-100",
      image: containersImage,
      website: "https://apexrigid.com",
    },
    {
      name: "CorrStar",
      description: t("division.starcorr.description"),
      details: [
        t("division.starcorr.detail1"),
        t("division.starcorr.detail2"),
        t("division.starcorr.detail3"),
        t("division.starcorr.detail4"),
      ],
      logo: corrugatedLogo,
      logoClassName: "scale-100",
      image: corrugatedImage,
      website: "https://starcorr.com",
    },
    {
      name: "Stellar Board",
      description: t("division.stellar.description"),
      details: [
        t("division.stellar.detail1"),
        t("division.stellar.detail2"),
        t("division.stellar.detail3"),
        t("division.stellar.detail4"),
      ],
      logo: cartonsLogo,
      logoClassName: "scale-100",
      image: cartonImage,
      website: "https://stellarboard.com",
    },
    {
      name: "Industry Plastic",
      description: t("division.industry.description"),
      details: [
        t("division.industry.detail1"),
        t("division.industry.detail2"),
        t("division.industry.detail3"),
        t("division.industry.detail4"),
      ],
      logo: ppcorr,
      logoClassName: "scale-125",
      image: industryImage,
      website: "https://www.industryplastic.com/",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-24 pb-10 border-b border-border">
          <div className="container-narrow px-6 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xs font-semibold text-primary tracking-widest uppercase mb-3"
            >
              {t("division.sectionLabel")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground max-w-3xl leading-tight"
            >
              {t("division.heading")}
            </motion.h1>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow px-6 lg:px-12 space-y-8">
            {divisions.map((division, index) => {
              const reverse = index % 2 === 1;

              return (
                <motion.article
                  key={division.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${reverse ? "" : ""}`}>
                    <div className={`${reverse ? "lg:order-2" : ""} relative min-h-[280px] md:min-h-[320px]`}>
                      <img
                        src={division.image}
                        alt={`${division.name} division visual`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/15 to-transparent" />
                    </div>

                    <div className={`${reverse ? "lg:order-1" : ""} p-6 md:p-8 lg:p-10 flex flex-col`}>
                      <div className="mb-5 h-10 w-44 flex items-center">
                        <img
                          src={division.logo}
                          alt={`${division.name} logo`}
                          className={`max-h-full max-w-full object-contain origin-left ${division.logoClassName}`}
                        />
                      </div>

                      <p className="text-base text-muted-foreground leading-relaxed mb-5">
                        {division.description}
                      </p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mb-7">
                        {division.details.map((item, itemIndex) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.3, delay: index * 0.05 + itemIndex * 0.04 }}
                            className="text-sm text-foreground/90 flex items-start gap-2.5"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <a
                        href={division.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("division.ariaVisit", { name: division.name })}
                        className="mt-auto inline-flex w-fit items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-all duration-300 hover:gap-2.5"
                      >
                        <ExternalLink size={14} />
                        {t("division.visitWebsite")}
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Divisions;
