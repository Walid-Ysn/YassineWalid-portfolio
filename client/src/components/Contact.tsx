import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT_EMAIL, getGmailComposeUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export default function Contact() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(t("contact.validation.required"));
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error(t("contact.validation.email"));
      return;
    }

    try {
      setIsSubmitting(true);
      const body = [
        `${t("contact.fullName")}: ${formData.name}`,
        `${t("contact.email")}: ${formData.email}`,
        `${t("contact.message")}:\n${formData.message}`,
      ].join("\n\n");

      trackEvent("contact_submit", { location: "contact_form" });
      window.location.assign(
        getGmailComposeUrl({
          subject: `${t("contact.title")} — ${formData.subject}`,
          body,
        }),
      );
    } catch {
      setIsSubmitting(false);
      toast.error(t("contact.error"));
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      trackEvent("contact_copy_email", { location: "contact_section" });
      setEmailCopied(true);
      toast.success(t("contact.emailCopied"));
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      toast.error(t("contact.copyError"));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: CONTACT_EMAIL,
      link: getGmailComposeUrl(),
    },
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "(+212) 635 260 207",
      link: "tel:+212635260207",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: t("hero.location"),
      link: "#contact",
    },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "https://github.com/Walid-Ysn" },
    { icon: Linkedin, label: "LinkedIn", url: "https://shorturl.at/ZeIzo" },
  ];

  return (
    <section className="bg-secondary py-20 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <div className="accent-line mb-4" />
            <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{t("contact.title")}</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">{t("contact.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="mb-8 text-2xl font-bold text-foreground">{t("contact.information")}</h3>

              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const IconComponent = info.icon;
                  const isEmail = info.label === t("contact.email");

                  return (
                    <motion.div
                      key={info.label}
                      className="flex items-start gap-2"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a
                        href={info.link}
                        onClick={() => isEmail && trackEvent("contact_click", { location: "contact_email" })}
                        className="group flex min-w-0 flex-1 items-start gap-4"
                      >
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          <p className="break-words font-semibold text-foreground transition-colors group-hover:text-primary">
                            {info.value}
                          </p>
                        </div>
                      </a>
                      {isEmail && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleCopyEmail}
                          aria-label={t("contact.copyEmail")}
                          title={t("contact.copyEmail")}
                          className="mt-1 flex-shrink-0 border-border text-foreground hover:border-primary hover:text-primary"
                        >
                          {emailCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 border-t border-border pt-8">
                <h4 className="mb-6 text-lg font-bold text-foreground">{t("contact.social")}</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        onClick={() => trackEvent("social_click", { network: social.label })}
                        className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="h-5 w-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-background p-8">
                <h3 className="mb-2 text-2xl font-bold text-foreground">{t("contact.send")}</h3>
                <p className="mb-6 text-sm text-muted-foreground">{t("contact.gmailNote")}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.fullName")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.namePlaceholder")}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.emailPlaceholder")}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.subject")}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("contact.subjectPlaceholder")}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.message")}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.messagePlaceholder")}
                      rows={6}
                      className="w-full"
                      required
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 animate-spin">⏳</span>
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t("contact.submit")}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
