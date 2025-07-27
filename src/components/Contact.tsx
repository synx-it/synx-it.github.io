'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { t, SupportedLocale } from "../i18n";
import { Linkedin } from "lucide-react";
import emailjs from '@emailjs/browser';
import { emailjsConfig, isEmailjsConfigured } from "../config/emailjs";

interface ContactProps {
  locale: SupportedLocale;
}

const Contact: React.FC<ContactProps> = ({ locale }) => {
  const formSchema = z.object({
    name: z.string().min(1, t(locale, "contact.nameRequired")),
    email: z
      .string()
      .min(1, t(locale, "contact.emailRequired"))
      .email(t(locale, "contact.emailInvalid")),
    message: z.string().min(10, t(locale, "contact.messageRequired")),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { 
    register, 
    handleSubmit, 
    reset: resetForm,
    formState: { errors } 
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isEmailjsConfigured) {
      alert('Contact form is not configured. Please check environment variables.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        values,
        emailjsConfig.publicKey
      );
      
      setSubmitStatus('success');
      resetForm();
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
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
              <input
                id="name"
                {...register("name")}
                placeholder={t(locale, "contact.namePlaceholder")}
                className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder={t(locale, "contact.emailPlaceholder")}
                className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              <textarea
                id="message"
                {...register("message")}
                placeholder={t(locale, "contact.messagePlaceholder")}
                className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                rows={5}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-tertiary rounded text-lg disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t(locale, "contact.sending")
                : t(locale, "contact.sendMessage")}
            </button>
            
            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                {t(locale, "contact.success")}
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                {t(locale, "contact.error")}
              </div>
            )}
            
            {!isEmailjsConfigured && (
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-center">
                Contact form not configured. Please check environment variables.
              </div>
            )}
            
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
