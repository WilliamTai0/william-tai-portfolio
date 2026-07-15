"use client";

import React, { useState, useEffect, useTransition } from "react";
import { submitContactForm, FormState } from "./actions";

export default function ContactForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website_trap: "", // Honeypot field
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [submitResult, setSubmitResult] = useState<FormState | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  // Check online/offline status
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Validate form fields on the client
  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required.";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters.";
      } else if (value.length > 100) {
        error = "Name must not exceed 100 characters.";
      }
    }

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!emailRegex.test(value.trim())) {
        error = "Please enter a valid email address.";
      } else if (value.length > 100) {
        error = "Email must not exceed 100 characters.";
      }
    }

    if (name === "subject") {
      if (!value.trim()) {
        error = "Subject is required.";
      } else if (value.trim().length < 3) {
        error = "Subject must be at least 3 characters.";
      } else if (value.length > 150) {
        error = "Subject must not exceed 150 characters.";
      }
    }

    if (name === "message") {
      if (!value.trim()) {
        error = "Message is required.";
      } else if (value.trim().length < 10) {
        error = "Message must be at least 10 characters.";
      } else if (value.length > 1000) {
        error = "Message must not exceed 1000 characters.";
      }
    }

    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formValues).forEach((key) => {
      if (key !== "website_trap") {
        const error = validateField(key, formValues[key as keyof typeof formValues]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus on the first invalid field for accessibility
      const firstInvalidField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstInvalidField);
      if (element) element.focus();
      return;
    }

    if (isOffline) {
      setSubmitResult({
        success: false,
        error: "You are currently offline. Please check your internet connection and try again.",
      });
      return;
    }

    // Call Server Action
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, val]) => {
          formData.append(key, val);
        });

        const result = await submitContactForm({ success: false }, formData);
        setSubmitResult(result);

        if (result.success) {
          // Reset form fields
          setFormValues({
            name: "",
            email: "",
            subject: "",
            message: "",
            website_trap: "",
          });
          setTouched({
            name: false,
            email: false,
            subject: false,
            message: false,
          });
          setErrors({});
        } else if (result.errors) {
          setErrors(result.errors);
        }
      } catch (err) {
        setSubmitResult({
          success: false,
          error: "An unexpected error occurred while sending the message. Please try again.",
        });
      }
    });
  };

  const handleReset = () => {
    setSubmitResult(null);
  };

  const isFormValid =
    formValues.name &&
    formValues.email &&
    formValues.subject &&
    formValues.message &&
    Object.values(errors).every((err) => !err);

  // Colors for message character limit
  const messageLength = formValues.message.length;
  const getCounterColor = () => {
    if (messageLength > 1000) return "text-red-400";
    if (messageLength > 900) return "text-yellow-500";
    return "text-text-faint";
  };

  if (submitResult?.success) {
    return (
      <div
        className="p-8 rounded-sm bg-obsidian-raised border border-mint-patina/30 text-center flex flex-col items-center gap-6"
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 rounded-full border-2 border-mint-patina flex items-center justify-center text-mint-patina">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-light text-text-primary mb-2">Message Sent</h3>
          <p className="text-text-secondary text-sm max-w-md font-light leading-relaxed">
            Thank you for reaching out. William has received your message and will get back to you as soon as possible.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-6 h-11 bg-steel-silver text-obsidian-black font-semibold text-sm rounded-xs transition-colors hover:bg-text-primary focus:outline-none"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Bot Honey-pot Field (Hidden from real users, visible to simple bots) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          id="website_trap"
          name="website_trap"
          tabIndex={-1}
          autoComplete="off"
          value={formValues.website_trap}
          onChange={handleInputChange}
        />
      </div>

      {/* General Error Banner */}
      {(submitResult?.error || isOffline) && (
        <div
          className="p-4 rounded-xs bg-red-950/20 border border-red-500/30 text-red-400 text-sm font-light flex gap-3 items-start"
          role="alert"
        >
          <svg
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <p className="font-semibold mb-1">Submission Failed</p>
            <p className="text-xs leading-relaxed">
              {isOffline
                ? "You are currently offline. Please check your network connection and try again."
                : submitResult?.error}
            </p>
          </div>
        </div>
      )}

      {/* Name Input */}
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="text-xs font-semibold text-mint-patina tracking-widest uppercase font-mono mb-2"
        >
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={100}
          aria-invalid={!!(touched.name && errors.name)}
          aria-describedby={touched.name && errors.name ? "name-error" : undefined}
          value={formValues.name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isPending}
          className={`bg-obsidian-deep border text-text-primary px-4 py-3 rounded-xs text-sm w-full transition-all focus:border-mint-patina focus:outline-none ${
            touched.name && errors.name ? "border-red-500/50" : "border-border-subtle"
          }`}
          placeholder="Your full name"
        />
        {touched.name && errors.name && (
          <span id="name-error" className="text-xs text-red-400 mt-1.5 font-mono flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-400"></span>
            {errors.name}
          </span>
        )}
      </div>

      {/* Email Input */}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="text-xs font-semibold text-mint-patina tracking-widest uppercase font-mono mb-2"
        >
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          maxLength={100}
          aria-invalid={!!(touched.email && errors.email)}
          aria-describedby={touched.email && errors.email ? "email-error" : undefined}
          value={formValues.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isPending}
          className={`bg-obsidian-deep border text-text-primary px-4 py-3 rounded-xs text-sm w-full transition-all focus:border-mint-patina focus:outline-none ${
            touched.email && errors.email ? "border-red-500/50" : "border-border-subtle"
          }`}
          placeholder="you@example.com"
        />
        {touched.email && errors.email && (
          <span id="email-error" className="text-xs text-red-400 mt-1.5 font-mono flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-400"></span>
            {errors.email}
          </span>
        )}
      </div>

      {/* Subject Input */}
      <div className="flex flex-col">
        <label
          htmlFor="subject"
          className="text-xs font-semibold text-mint-patina tracking-widest uppercase font-mono mb-2"
        >
          Subject <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          maxLength={150}
          aria-invalid={!!(touched.subject && errors.subject)}
          aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
          value={formValues.subject}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isPending}
          className={`bg-obsidian-deep border text-text-primary px-4 py-3 rounded-xs text-sm w-full transition-all focus:border-mint-patina focus:outline-none ${
            touched.subject && errors.subject ? "border-red-500/50" : "border-border-subtle"
          }`}
          placeholder="What is this regarding?"
        />
        {touched.subject && errors.subject && (
          <span id="subject-error" className="text-xs text-red-400 mt-1.5 font-mono flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-400"></span>
            {errors.subject}
          </span>
        )}
      </div>

      {/* Message Textarea */}
      <div className="flex flex-col">
        <div className="flex justify-between items-baseline mb-2">
          <label
            htmlFor="message"
            className="text-xs font-semibold text-mint-patina tracking-widest uppercase font-mono"
          >
            Message <span className="text-red-400">*</span>
          </label>
          <span className={`text-[10px] font-mono ${getCounterColor()}`} aria-live="polite">
            {messageLength} / 1000
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          required
          maxLength={1050} // Slightly more to handle pasting before truncation
          rows={5}
          aria-invalid={!!(touched.message && errors.message)}
          aria-describedby={
            touched.message && errors.message ? "message-error" : "message-hint"
          }
          value={formValues.message}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isPending}
          className={`bg-obsidian-deep border text-text-primary px-4 py-3 rounded-xs text-sm w-full transition-all focus:border-mint-patina focus:outline-none resize-none ${
            touched.message && errors.message ? "border-red-500/50" : "border-border-subtle"
          }`}
          placeholder="Please write your message here..."
        />
        {touched.message && errors.message ? (
          <span id="message-error" className="text-xs text-red-400 mt-1.5 font-mono flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-400"></span>
            {errors.message}
          </span>
        ) : (
          <span id="message-hint" className="text-[10px] text-text-faint mt-1.5 font-mono">
            Minimum 10 characters required.
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending || !isFormValid}
        className={`w-full h-11 font-semibold text-sm rounded-xs transition-all flex items-center justify-center gap-2 ${
          isPending || !isFormValid
            ? "bg-border-subtle text-text-faint cursor-not-allowed border border-transparent"
            : "bg-steel-silver text-obsidian-black hover:bg-text-primary active:scale-[0.98]"
        }`}
      >
        {isPending ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-obsidian-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
