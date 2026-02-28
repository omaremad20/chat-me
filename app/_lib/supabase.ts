import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dwqthdwtdxvujqynxnyk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3cXRoZHd0ZHh2dWpxeW54bnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2ODMxMjMsImV4cCI6MjA4NzI1OTEyM30.xqzhEnXaCeN_ZYnTHs-Z04xWafJ8uB_w5ftcDT8kaBA",
);
