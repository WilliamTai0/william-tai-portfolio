"use server";

import { cookies } from "next/headers";

export interface FormState {
  success: boolean;
  error?: string;
  errors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    general?: string;
  };
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  // Simulate network delay to demonstrate loading states
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 1. Bot Honeypot Check
  const botField = formData.get("website_trap");
  if (botField && typeof botField === "string" && botField.length > 0) {
    // Silently succeed to fool simple bot scripts, preventing them from trying other ways
    return { success: true };
  }

  // 2. Rate Limiting Check (Cookie-based for simple portfolio, expires in 5 mins)
  const cookieStore = cookies();
  const contactLimit = cookieStore.get("contact_submit_limit");
  const now = Date.now();

  if (contactLimit) {
    try {
      const { count, firstSubmit } = JSON.parse(contactLimit.value);
      // Limit to 3 submissions every 5 minutes
      if (now - firstSubmit < 5 * 60 * 1000) {
        if (count >= 3) {
          return {
            success: false,
            error: "Too many requests. Please wait a few minutes before trying again.",
          };
        }
        // Update count
        cookieStore.set("contact_submit_limit", JSON.stringify({ count: count + 1, firstSubmit }), {
          maxAge: 300, // 5 minutes
          httpOnly: true,
          path: "/",
        });
      } else {
        // Reset limit window
        cookieStore.set("contact_submit_limit", JSON.stringify({ count: 1, firstSubmit: now }), {
          maxAge: 300,
          httpOnly: true,
          path: "/",
        });
      }
    } catch (e) {
      // If parsing fails, reset cookie
      cookieStore.set("contact_submit_limit", JSON.stringify({ count: 1, firstSubmit: now }), {
        maxAge: 300,
        httpOnly: true,
        path: "/",
      });
    }
  } else {
    // Initial cookie set
    cookieStore.set("contact_submit_limit", JSON.stringify({ count: 1, firstSubmit: now }), {
      maxAge: 300,
      httpOnly: true,
      path: "/",
    });
  }

  // 3. Extract Fields
  const name = (formData.get("name") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();
  const subject = (formData.get("subject") as string || "").trim();
  const message = (formData.get("message") as string || "").trim();

  // 4. Server-side Validation
  const errors: NonNullable<FormState["errors"]> = {};

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must not exceed 100 characters.";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 100) {
    errors.email = "Email must not exceed 100 characters.";
  }

  if (!subject) {
    errors.subject = "Subject is required.";
  } else if (subject.length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  } else if (subject.length > 150) {
    errors.subject = "Subject must not exceed 150 characters.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 1000) {
    errors.message = "Message must not exceed 1000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // 5. Simulate Server-Side Error Scenario
  // We can trigger this by typing "fail-server" in any of the fields for manual verification
  if (name.includes("fail-server") || message.includes("fail-server")) {
    return {
      success: false,
      error: "We encountered an unexpected server error. Please try again later.",
    };
  }

  // 6. Processing / Success
  // In a real application, you would send this to Resend, SendGrid, etc.
  console.log("Contact submission received:", { name, email, subject, message });

  return { success: true };
}
