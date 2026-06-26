import { createClient } from "@supabase/supabase-js";
import { 
  DEFAULT_SERVICES, 
  DEFAULT_PRODUCTS, 
  DEFAULT_GALLERY, 
  DEFAULT_TESTIMONIALS,
  Service,
  Product,
  GalleryItem,
  Testimonial
} from "./data-defaults";
export type { Service, Product, GalleryItem, Testimonial };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage Fallback database layer
const LOCAL_STORAGE_KEYS = {
  SERVICES: "shiloh_services",
  PRODUCTS: "shiloh_products",
  GALLERY: "shiloh_gallery",
  TESTIMONIALS: "shiloh_testimonials",
  APPOINTMENTS: "shiloh_appointments",
  FEEDBACKS: "shiloh_feedbacks",
  SESSION: "shiloh_admin_session"
};

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  appointment_type: "Salon Visit" | "Home Service";
  address?: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: "Pending Confirmation" | "Confirmed" | "Completed" | "Cancelled";
  booking_type: "Standard" | "Special Request";
  appointment_reference: string;
  created_at: string;
}

export interface BusinessSettings {
  id: number;
  opening_time: string;
  closing_time: string;
  slot_capacity: number;
  closed_days: string[];
  whatsapp_number: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  customer_name: string;
  phone_number: string;
  service_name: string;
  rating: number;
  message: string;
  photo_url?: string;
  status: "Pending" | "Approved" | "Rejected";
  created_at: string;
}

export const mapGalleryItem = (item: Record<string, unknown>): GalleryItem => ({
  id: item.id as string,
  category: (item.category as string) || "",
  imageUrl: (item.image_url as string) || "",
  title: (item.title as string) || "",
});

export const mapFeedback = (item: Record<string, unknown>): Feedback => ({
  id: item.id as string,
  customer_name: item.customer_name as string,
  phone_number: (item.phone_number as string) || "",
  service_name: item.service_name as string,
  rating: item.rating as number,
  message: item.message as string,
  photo_url: (item.photo_url as string) || undefined,
  status: item.status as Feedback["status"],
  created_at: item.created_at as string,
});



// Helpers for LocalStorage
const getLocal = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return defaultValue;
  }
};

const setLocal = <T>(key: string, value: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const db = {
  // SERVICES
  async getServices(): Promise<Service[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((item: any) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description || "",
          duration: item.duration || "",
          benefits: item.benefits || [],
          imageUrl: item.image_url || ""
        }));
      }
    }
    return getLocal<Service[]>(LOCAL_STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
  },

  async addService(service: Omit<Service, "id">): Promise<Service> {
    const newService = { ...service, id: `s_${Date.now()}` };
    if (isSupabaseConfigured && supabase) {
      const dbPayload = {
        name: service.name,
        category: service.category,
        description: service.description,
        duration: service.duration,
        benefits: service.benefits,
        image_url: service.imageUrl
      };
      const { data, error } = await supabase.from("services").insert([dbPayload]).select().single();
      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          category: data.category,
          description: data.description || "",
          duration: data.duration || "",
          benefits: data.benefits || [],
          imageUrl: data.image_url || ""
        };
      }
    }
    const services = await this.getServices();
    services.unshift(newService);
    setLocal(LOCAL_STORAGE_KEYS.SERVICES, services);
    return newService;
  },

  async updateService(id: string, updates: Partial<Service>): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const dbUpdates: any = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.duration !== undefined) dbUpdates.duration = updates.duration;
      if (updates.benefits !== undefined) dbUpdates.benefits = updates.benefits;
      if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;

      const { error } = await supabase.from("services").update(dbUpdates).eq("id", id);
      if (!error) return true;
    }
    const services = await this.getServices();
    const idx = services.findIndex(s => s.id === id);
    if (idx !== -1) {
      services[idx] = { ...services[idx], ...updates };
      setLocal(LOCAL_STORAGE_KEYS.SERVICES, services);
      return true;
    }
    return false;
  },

  async deleteService(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (!error) return true;
    }
    const services = await this.getServices();
    const filtered = services.filter(s => s.id !== id);
    setLocal(LOCAL_STORAGE_KEYS.SERVICES, filtered);
    return true;
  },

  // PRODUCTS
  async getProducts(): Promise<Product[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          benefits: item.benefits || [],
          imageUrl: item.image_url || ""
        }));
      }
    }
    return getLocal<Product[]>(LOCAL_STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
  },

  async addProduct(product: Omit<Product, "id">): Promise<Product> {
    const newProduct = { ...product, id: `p_${Date.now()}` };
    if (isSupabaseConfigured && supabase) {
      const dbPayload = {
        name: product.name,
        description: product.description,
        benefits: product.benefits,
        image_url: product.imageUrl
      };
      const { data, error } = await supabase.from("products").insert([dbPayload]).select().single();
      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          description: data.description || "",
          benefits: data.benefits || [],
          imageUrl: data.image_url || ""
        };
      }
    }
    const products = await this.getProducts();
    products.unshift(newProduct);
    setLocal(LOCAL_STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const dbUpdates: any = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.benefits !== undefined) dbUpdates.benefits = updates.benefits;
      if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;

      const { error } = await supabase.from("products").update(dbUpdates).eq("id", id);
      if (!error) return true;
    }
    const products = await this.getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...updates };
      setLocal(LOCAL_STORAGE_KEYS.PRODUCTS, products);
      return true;
    }
    return false;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) return true;
    }
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    setLocal(LOCAL_STORAGE_KEYS.PRODUCTS, filtered);
    return true;
  },

  // GALLERY / TRANSFORMATIONS
  async getGallery(): Promise<GalleryItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Supabase getGallery error:", error);
        throw new Error(`Database SELECT failed: ${error.message} (Code: ${error.code})`);
      }
      return (data || []).map((item) => mapGalleryItem(item as Record<string, unknown>));
    }
    return getLocal<GalleryItem[]>(LOCAL_STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
  },

  async addGalleryItem(item: Omit<GalleryItem, "id">): Promise<GalleryItem> {
    const newItem = { ...item, id: `g_${Date.now()}` };
    if (isSupabaseConfigured && supabase) {
      const dbPayload = {
        category: item.category,
        image_url: item.imageUrl,
        title: item.title
      };
      const { data, error } = await supabase.from("gallery").insert([dbPayload]).select().single();
      if (!error && data) {
        return mapGalleryItem(data as Record<string, unknown>);
      }
    }
    const gallery = await this.getGallery();
    gallery.unshift(newItem);
    setLocal(LOCAL_STORAGE_KEYS.GALLERY, gallery);
    return newItem;
  },

  async updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const dbUpdates: any = {};
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;
      if (updates.title !== undefined) dbUpdates.title = updates.title;

      const { error } = await supabase.from("gallery").update(dbUpdates).eq("id", id);
      if (!error) return true;
    }
    const gallery = await this.getGallery();
    const idx = gallery.findIndex(g => g.id === id);
    if (idx !== -1) {
      gallery[idx] = { ...gallery[idx], ...updates };
      setLocal(LOCAL_STORAGE_KEYS.GALLERY, gallery);
      return true;
    }
    return false;
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (!error) return true;
    }
    const gallery = await this.getGallery();
    const filtered = gallery.filter(g => g.id !== id);
    setLocal(LOCAL_STORAGE_KEYS.GALLERY, filtered);
    return true;
  },

  // TESTIMONIALS
  async getTestimonials(): Promise<Testimonial[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<Testimonial[]>(LOCAL_STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
  },

  async addTestimonial(testimonial: Omit<Testimonial, "id">): Promise<Testimonial> {
    const newTestimonial = { ...testimonial, id: `t_${Date.now()}` };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("testimonials").insert([testimonial]).select().single();
      if (!error && data) return data;
    }
    const testimonials = await this.getTestimonials();
    testimonials.unshift(newTestimonial);
    setLocal(LOCAL_STORAGE_KEYS.TESTIMONIALS, testimonials);
    return newTestimonial;
  },

  async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("testimonials").update(updates).eq("id", id);
      if (!error) return true;
    }
    const testimonials = await this.getTestimonials();
    const idx = testimonials.findIndex(t => t.id === id);
    if (idx !== -1) {
      testimonials[idx] = { ...testimonials[idx], ...updates };
      setLocal(LOCAL_STORAGE_KEYS.TESTIMONIALS, testimonials);
      return true;
    }
    return false;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (!error) return true;
    }
    const testimonials = await this.getTestimonials();
    const filtered = testimonials.filter(t => t.id !== id);
    setLocal(LOCAL_STORAGE_KEYS.TESTIMONIALS, filtered);
    return true;
  },

  // APPOINTMENTS (BOOKINGS)
  async getAppointments(): Promise<Appointment[]> {
    if (isSupabaseConfigured && supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      const selectQuery = user 
        ? "*" 
        : "id, preferred_date, preferred_time, status, booking_type, appointment_reference";
      
      const { data, error } = await supabase
        .from("appointments")
        .select(selectQuery)
        .order("preferred_date", { ascending: true });
      if (error) {
        console.error("Supabase getAppointments error:", error);
        throw new Error(`Database SELECT failed: ${error.message} (Code: ${error.code})`);
      }
      return (data as any) || [];
    }
    return getLocal<Appointment[]>(LOCAL_STORAGE_KEYS.APPOINTMENTS, []);
  },

  async createAppointment(appointment: Omit<Appointment, "id" | "status" | "appointment_reference" | "created_at" | "booking_type"> & { booking_type?: "Standard" | "Special Request" }): Promise<Appointment> {
    let digits = appointment.phone.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    const cleanPhone = digits.slice(0, 10);
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      throw new Error("Please enter a valid 10-digit Indian mobile number.");
    }
    appointment.phone = cleanPhone;

    const getLocalDateStr = () => {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };
    const today = getLocalDateStr();
    if (appointment.preferred_date < today) {
      throw new Error("Appointments can only be booked for today or future dates.");
    }

    const dateStr = appointment.preferred_date.replace(/-/g, "");
    const prefix = `SHL-${dateStr}`;
    const appointments = await this.getAppointments();
    
    // Count existing bookings for this exact preferred_date (standard and special request)
    const countForDate = appointments.filter(a => a.preferred_date === appointment.preferred_date).length;
    const nextNum = String(countForDate + 1).padStart(3, '0');
    const reference = `${prefix}-${nextNum}`;
    const bookingType = appointment.booking_type || "Standard";

    const newAppointment: Appointment = {

      ...appointment,
      booking_type: bookingType,
      appointment_reference: reference,
      id: `a_${Date.now()}`,
      status: "Pending Confirmation",
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      console.log("Supabase is configured. Attempting to insert booking payload:", {
        name: appointment.name,
        phone: appointment.phone,
        service: appointment.service,
        appointment_type: appointment.appointment_type,
        address: appointment.address,
        preferred_date: appointment.preferred_date,
        preferred_time: appointment.preferred_time,
        booking_type: bookingType,
        appointment_reference: reference
      });
      const dbPayload = {
        name: appointment.name,
        phone: appointment.phone,
        service: appointment.service,
        appointment_type: appointment.appointment_type,
        address: appointment.address,
        preferred_date: appointment.preferred_date,
        preferred_time: appointment.preferred_time,
        notes: appointment.notes,
        status: "Pending Confirmation",
        booking_type: bookingType,
        appointment_reference: reference
      };
      const { data, error } = await supabase
        .from("appointments")
        .insert([dbPayload])
        .select("id, preferred_date, preferred_time, status, booking_type, appointment_reference")
        .single();
      if (error) {
        console.error("Supabase createAppointment error response:", error);
        throw new Error(`Supabase INSERT failed: ${error.message} (Code: ${error.code})`);
      }
      console.log("Supabase insert succeeded. Inserted data:", data);
      if (data) {
        return {
          ...appointment,
          id: data.id,
          status: data.status,
          booking_type: data.booking_type,
          appointment_reference: data.appointment_reference
        } as Appointment;
      }
    }

    console.log("Supabase not configured. Using local storage fallback.");
    const allAppts = await this.getAppointments();
    allAppts.unshift(newAppointment);
    setLocal(LOCAL_STORAGE_KEYS.APPOINTMENTS, allAppts);
    return newAppointment;
  },


  async updateAppointmentStatus(id: string, status: "Pending Confirmation" | "Confirmed" | "Completed" | "Cancelled"): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
      if (error) {
        console.error("Supabase updateAppointmentStatus error:", error);
        throw new Error(`Database UPDATE failed: ${error.message} (Code: ${error.code})`);
      }
      return true;
    }
    const appointments = await this.getAppointments();
    const idx = appointments.findIndex(a => a.id === id);
    if (idx !== -1) {
      appointments[idx].status = status;
      setLocal(LOCAL_STORAGE_KEYS.APPOINTMENTS, appointments);
      return true;
    }
    return false;
  },

  async deleteAppointment(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) {
        console.error("Supabase deleteAppointment error:", error);
        throw new Error(`Database DELETE failed: ${error.message} (Code: ${error.code})`);
      }
      return true;
    }
    const appointments = await this.getAppointments();
    const filtered = appointments.filter(a => a.id !== id);
    setLocal(LOCAL_STORAGE_KEYS.APPOINTMENTS, filtered);
    return true;
  },

  // FEEDBACKS
  async getFeedbacks(options?: { approvedOnly?: boolean }): Promise<Feedback[]> {
    if (isSupabaseConfigured && supabase) {
      const { data: { user } } = await supabase.auth.getUser();

      const baseQuery = user
        ? supabase.from("feedbacks").select("*")
        : supabase
            .from("feedbacks")
            .select("id, customer_name, service_name, rating, message, photo_url, status, created_at");

      const { data, error } = await (options?.approvedOnly
        ? baseQuery.eq("status", "Approved")
        : baseQuery
      ).order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase getFeedbacks error:", error);
        throw new Error(`Database SELECT failed: ${error.message} (Code: ${error.code})`);
      }
      return (data || []).map((item) => mapFeedback(item as Record<string, unknown>));
    }
    const feedbacks = getLocal<Feedback[]>(LOCAL_STORAGE_KEYS.FEEDBACKS, []);
    return options?.approvedOnly
      ? feedbacks.filter((f) => f.status === "Approved")
      : feedbacks;
  },

  async addFeedback(feedback: Omit<Feedback, "id" | "status" | "created_at">): Promise<Feedback> {
    let digits = feedback.phone_number.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    const cleanPhone = digits.slice(0, 10);
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      throw new Error("Please enter a valid 10-digit Indian mobile number.");
    }
    feedback.phone_number = cleanPhone;

    const newFeedback: Feedback = {
      ...feedback,
      id: `f_${Date.now()}`,
      status: "Pending",
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      console.log("Supabase is configured. Attempting to insert feedback payload:", {
        customer_name: feedback.customer_name,
        phone_number: feedback.phone_number,
        service_name: feedback.service_name,
        rating: feedback.rating
      });
      const dbPayload = {
        customer_name: feedback.customer_name,
        phone_number: feedback.phone_number,
        service_name: feedback.service_name,
        rating: feedback.rating,
        message: feedback.message,
        photo_url: feedback.photo_url || null,
        status: "Pending"
      };
      const { data, error } = await supabase
        .from("feedbacks")
        .insert([dbPayload])
        .select("id, customer_name, service_name, rating, message, photo_url, status, created_at")
        .single();
      if (error) {
        console.error("Supabase addFeedback error response:", error);
        throw new Error(`Supabase INSERT failed: ${error.message} (Code: ${error.code})`);
      }
      console.log("Supabase feedback insert succeeded. Inserted data:", data);
      if (data) {
        return {
          ...feedback,
          id: data.id,
          status: data.status,
          created_at: data.created_at
        } as Feedback;
      }
    }

    console.log("Supabase not configured. Using local storage fallback.");
    const feedbacks = await this.getFeedbacks();
    feedbacks.unshift(newFeedback);
    setLocal(LOCAL_STORAGE_KEYS.FEEDBACKS, feedbacks);
    return newFeedback;
  },

  async updateFeedbackStatus(id: string, status: "Pending" | "Approved" | "Rejected"): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("feedbacks").update({ status }).eq("id", id);
      if (error) {
        console.error("Supabase updateFeedbackStatus error:", error);
        throw new Error(`Database UPDATE failed: ${error.message} (Code: ${error.code})`);
      }
      return true;
    }
    const feedbacks = await this.getFeedbacks();
    const idx = feedbacks.findIndex(f => f.id === id);
    if (idx !== -1) {
      feedbacks[idx].status = status;
      setLocal(LOCAL_STORAGE_KEYS.FEEDBACKS, feedbacks);
      return true;
    }
    return false;
  },

  async deleteFeedback(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("feedbacks").delete().eq("id", id);
      if (error) {
        console.error("Supabase deleteFeedback error:", error);
        throw new Error(`Database DELETE failed: ${error.message} (Code: ${error.code})`);
      }
      return true;
    }
    const feedbacks = await this.getFeedbacks();
    const filtered = feedbacks.filter(f => f.id !== id);
    setLocal(LOCAL_STORAGE_KEYS.FEEDBACKS, filtered);
    return true;
  },

  // ADMIN AUTHENTICATION
  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      return { success: !!data.user };
    }
    
    // Fallback: Check static credentials for testing when Supabase is not linked
    if (email === "admin@shiloh.com" && password === "shilohadmin123") {
      setLocal(LOCAL_STORAGE_KEYS.SESSION, "active_session_token");
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  },

  async signOut(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SESSION);
    }
  },

  async getUser(): Promise<{ email: string } | null> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.auth.getUser();
      if (data?.user) return { email: data.user.email || "Admin" };
      return null;
    }
    const session = getLocal<string | null>(LOCAL_STORAGE_KEYS.SESSION, null);
    return session ? { email: "admin@shiloh.com" } : null;
  },

  // IMAGE UPLOAD — Supabase Storage
  async uploadImage(file: File, folder: "services" | "products" | "gallery"): Promise<string | null> {
    if (!isSupabaseConfigured || !supabase) {
      // Fallback: create an object URL for local testing (won't persist)
      return URL.createObjectURL(file);
    }
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage
      .from("shiloh-media")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (error || !data) return null;
    const { data: urlData } = supabase.storage
      .from("shiloh-media")
      .getPublicUrl(data.path);
    return urlData?.publicUrl || null;
  }
};
