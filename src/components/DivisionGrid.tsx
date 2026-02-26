import ScrollReveal from "./ScrollReveal";
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
const DivisionGrid = () => {
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
      cta: t("division.visitWebsite"),
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
      cta: t("division.visitWebsite"),
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
      cta: t("division.visitWebsite"),
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
      cta: t("division.visitWebsite"),
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
      cta: t("division.visitWebsite"),
    },
  ];

  return (
    <section className="bg-background min-h-screen px-6 py-12 md:px-10 lg:px-12" aria-labelledby="divisions-title">
    <div className="mx-auto max-w-[1700px] h-full">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-2">
              {t("division.sectionLabel")}
            </p>
            <h2 id="divisions-title" className="text-2xl md:text-3xl font-bold text-foreground">
              {t("division.heading")}
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            {t("division.viewAll")} <ArrowRight size={14} />
          </a>
        </div>
      </ScrollReveal>

      <div className="h-[68vh] min-h-[500px] flex items-stretch gap-4 overflow-x-auto md:overflow-hidden pb-1">
        {divisions.map((division, i) => (
          <ScrollReveal
            key={division.name}
            delay={i * 0.06}
            className="h-full min-w-[240px] flex-1 transition-[flex-grow] duration-300 ease-out md:min-w-0 md:flex-[1_1_0%] md:hover:flex-[2_1_0%] md:focus-within:flex-[2_1_0%]"
          >
            <a
              href={division.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full w-full rounded-xl border border-border shadow-sm overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t("division.ariaVisit", { name: division.name })}
            >
              <img
                src={division.image}
                alt={`${division.name} division visual`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/58 to-foreground/25" />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30 group-focus-within:bg-black/30" />

              <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1 rounded-full bg-background/15 border border-background/25 px-2.5 py-1 text-[11px] font-semibold text-background/90">
                <ExternalLink size={11} />
                {t("division.websiteBadge")}
              </div>

              <div className="absolute inset-0 flex items-end justify-center pb-10 px-5 text-center transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-within:opacity-0">
                <h3 className="text-2xl font-bold text-background leading-tight">{division.name}</h3>
              </div>

              <div className="absolute inset-0 z-10 p-5 md:p-6 transition-all duration-300 ease-out opacity-0 translate-y-5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto overflow-y-auto">
                <div className="h-full flex flex-col">
                  <div className="mb-4 h-10 w-40 flex items-center justify-start">
                    <img
                      src={division.logo}
                      alt={`${division.name} logo`}
                      className={`max-h-full max-w-full object-contain origin-left ${division.logoClassName ?? ""}`}
                    />
                  </div>
                  <p className="text-sm text-background/85 leading-relaxed mb-4">{division.description}</p>

                  <ul className="space-y-2 mb-5">
                    {division.details.map((item) => (
                      <li key={item} className="text-sm text-background/90 leading-snug flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-background/95 group-hover:text-background">
                    {division.cta}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
  );
};

export default DivisionGrid;
