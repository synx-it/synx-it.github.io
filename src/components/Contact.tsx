import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { t, SupportedLocale } from "../i18n";
import { Linkedin } from "lucide-react";
import { toast } from "sonner";

interface ContactProps {
  locale: SupportedLocale;
}

const Contact: React.FC<ContactProps> = ({ locale }) => {
  const formSchema = z.object({
    name: z.string().min(1, t(locale, "contact.nameRequired")),
    email: z
      .email(t(locale, "contact.emailInvalid"))
      .min(1, t(locale, "contact.emailRequired")),
    message: z.string().min(10, t(locale, "contact.messageRequired")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
    toast.success(t(locale, "contact.thankYou"));
    form.reset();
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-white" style={{ scrollMarginTop: '100px' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tighter">
            {t(locale, "contact.title")}
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            {t(locale, "contact.description")}
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 text-left"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 sr-only"
              >
                {t(locale, "contact.namePlaceholder")}
              </label>
              <Input
                id="name"
                {...register("name")}
                placeholder={t(locale, "contact.namePlaceholder")}
                className="w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 sr-only"
              >
                {t(locale, "contact.emailPlaceholder")}
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder={t(locale, "contact.emailPlaceholder")}
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-700 sr-only"
              >
                {t(locale, "contact.messagePlaceholder")}
              </label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder={t(locale, "contact.messagePlaceholder")}
                className="w-full min-h-[150px]"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[var(--primary)] text-white hover:bg-[var(--tertiary)] transition-colors text-lg py-3 rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t(locale, "contact.sending")
                : t(locale, "contact.button")}
            </Button>
            <p className="text-sm text-gray-500 mt-4 text-center">
              {t(locale, "contact.privacy")}
            </p>
          </form>
          <div className="mt-16 flex justify-center">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
