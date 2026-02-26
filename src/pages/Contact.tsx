import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Contact = () => {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", division: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert(t("contact.form.thankYou"));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-primary">
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="text-primary-foreground/60 text-sm font-semibold tracking-widest uppercase mb-3">{t("contact.label")}</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 max-w-2xl">
                {t("contact.title")}
              </h1>
              <p className="text-primary-foreground/70 text-lg max-w-xl">
                {t("contact.body")}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <h2 className="text-2xl font-extrabold text-foreground mb-6">{t("contact.getInTouch")}</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <Mail size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t("contact.email")}</p>
                        <p className="text-sm text-muted-foreground">info@fivestarcorr.com</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <Phone size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t("contact.phone")}</p>
                        <p className="text-sm text-muted-foreground">+1 (718) 875-0022</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t("contact.hq")}</p>
                        <p className="text-sm text-muted-foreground">
                          Five Star Group<br />
                          175 Classon Ave<br />
                          Brooklyn, NY 11205
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <ScrollReveal delay={0.1}>
                  <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-card border border-border shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.form.fullName")}</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          placeholder={t("contact.form.placeholder.name")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.form.email")}</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          placeholder={t("contact.form.placeholder.email")}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.form.division")}</label>
                      <select
                        value={form.division}
                        onChange={e => setForm({...form, division: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="">{t("contact.form.placeholder.division")}</option>
                        <option value="flexible">Radiant Flexo</option>
                        <option value="containers">Industry Plastic</option>
                        <option value="containers">Apex Rigid</option>
                        <option value="carton">Stellar Board</option>
                        <option value="corrugated">CorrStar</option>
                        <option value="general">{t("contact.option.general")}</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.form.message")}</label>
                      <textarea
                        rows={5}
                        required
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-colors"
                        placeholder={t("contact.form.placeholder.message")}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:brightness-110 transition-all text-sm"
                    >
                      <Send size={16} />
                      {t("contact.form.send")}
                    </button>
                  </form>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
