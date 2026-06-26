"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Calendar, Sparkles, ShoppingBag, Image as ImageIcon, MessageSquare,
  LogOut, Trash2, Check, X, Plus, Edit3, RefreshCw, Clock, MapPin,
  Star, Home, Search, Filter, Upload, Loader2, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db, Appointment, isSupabaseConfigured, Feedback, supabase } from "@/lib/supabase";
import type { Service, Product, GalleryItem, Testimonial } from "@/lib/data-defaults";
import { ToastProvider, useToast } from "@/components/ui/toast";

/* ─────────── Types ─────────── */
type TabId = "appointments" | "services" | "products" | "gallery" | "testimonials" | "feedback";
type ModalType = "service" | "product" | "gallery" | "testimonial";

/* ─────────── Inner component (needs toast context) ─────────── */
function DashboardInner() {
  const router = useRouter();
  const { toast } = useToast();

  /* Auth & loading */
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  /* Active tab */
  const [activeTab, setActiveTab] = useState<TabId>("appointments");

  /* Data lists */
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  /* Search / filter */
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  /* Modal */
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  /* Delete confirm */
  const [confirmDelete, setConfirmDelete] = useState<{ type: string; id: string } | null>(null);

  /* ── Auth check ── */
  useEffect(() => {
    (async () => {
      const activeUser = await db.getUser();
      if (!activeUser) { router.push("/admin/login"); return; }
      setUser(activeUser);
      await loadAllData();
    })();
  }, [router]);

  /* ── Supabase Realtime live updates ── */
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const mapService = (item: any): Service => ({
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description || "",
      duration: item.duration || "",
      benefits: item.benefits || [],
      imageUrl: item.image_url || ""
    });

    const mapProduct = (item: any): Product => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      benefits: item.benefits || [],
      imageUrl: item.image_url || ""
    });

    const mapGalleryItem = (item: any): GalleryItem => ({
      id: item.id,
      category: item.category,
      imageUrl: item.image_url || "",
      title: item.title || ""
    });

    const channel = supabase.channel("admin-dashboard-realtime");

    channel
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem = payload.new as Appointment;
            setAppointments((prev) => {
              if (prev.some((a) => a.id === newItem.id)) return prev;
              return [newItem, ...prev];
            });
            toast(
              `🌸 New Appointment Received\n\nCustomer: ${newItem.name}\nService: ${newItem.service}\nRef: ${newItem.appointment_reference}`
            );
          } else if (payload.eventType === "UPDATE") {
            const updatedItem = payload.new as Appointment;
            setAppointments((prev) =>
              prev.map((a) => (a.id === updatedItem.id ? updatedItem : a))
            );
          } else if (payload.eventType === "DELETE") {
            setAppointments((prev) => prev.filter((a) => a.id !== payload.old.id));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feedbacks" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem = payload.new as Feedback;
            setFeedbacks((prev) => {
              if (prev.some((f) => f.id === newItem.id)) return prev;
              return [newItem, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            const updatedItem = payload.new as Feedback;
            setFeedbacks((prev) =>
              prev.map((f) => (f.id === updatedItem.id ? updatedItem : f))
            );
          } else if (payload.eventType === "DELETE") {
            setFeedbacks((prev) => prev.filter((f) => f.id !== payload.old.id));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "services" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem = mapService(payload.new);
            setServices((prev) => {
              if (prev.some((s) => s.id === newItem.id)) return prev;
              return [newItem, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            const updatedItem = mapService(payload.new);
            setServices((prev) =>
              prev.map((s) => (s.id === updatedItem.id ? updatedItem : s))
            );
          } else if (payload.eventType === "DELETE") {
            setServices((prev) => prev.filter((s) => s.id !== payload.old.id));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem = mapProduct(payload.new);
            setProducts((prev) => {
              if (prev.some((p) => p.id === newItem.id)) return prev;
              return [newItem, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            const updatedItem = mapProduct(payload.new);
            setProducts((prev) =>
              prev.map((p) => (p.id === updatedItem.id ? updatedItem : p))
            );
          } else if (payload.eventType === "DELETE") {
            setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "gallery" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem = mapGalleryItem(payload.new);
            setGallery((prev) => {
              if (prev.some((g) => g.id === newItem.id)) return prev;
              return [newItem, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            const updatedItem = mapGalleryItem(payload.new);
            setGallery((prev) =>
              prev.map((g) => (g.id === updatedItem.id ? updatedItem : g))
            );
          } else if (payload.eventType === "DELETE") {
            setGallery((prev) => prev.filter((g) => g.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, [toast]);

  /* ── Load all data ── */
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [appts, svcs, prods, gal, testi, feed] = await Promise.all([
        db.getAppointments(),
        db.getServices(),
        db.getProducts(),
        db.getGallery(),
        db.getTestimonials(),
        db.getFeedbacks(),
      ]);
      setAppointments(appts);
      setServices(svcs);
      setProducts(prods);
      setGallery(gal);
      setTestimonials(testi);
      setFeedbacks(feed);
    } catch (err) {
      toast("Failed to load data. Please refresh.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ── Sign out ── */
  const handleSignOut = async () => {
    await db.signOut();
    router.push("/admin/login");
  };

  /* ─────────── Booking actions ─────────── */
  const handleBookingStatus = async (id: string, status: "Pending Confirmation" | "Confirmed" | "Completed" | "Cancelled") => {
    const ok = await db.updateAppointmentStatus(id, status);
    if (ok) {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      toast(`Appointment updated to ${status} successfully.`);
    } else { toast("Failed to update status.", "error"); }
  };

  /* ─────────── Feedback actions ─────────── */
  const handleFeedbackStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
    const ok = await db.updateFeedbackStatus(id, status);
    if (ok) {
      setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, status } : f));
      toast(`Feedback updated to ${status} successfully.`);
    } else { toast("Failed to update feedback status.", "error"); }
  };


  /* ─────────── Delete flow ─────────── */
  const requestDelete = (type: string, id: string) => setConfirmDelete({ type, id });

  const confirmDeleteAction = async () => {
    if (!confirmDelete) return;
    const { type, id } = confirmDelete;
    setConfirmDelete(null);
    let ok = false;
    if (type === "appointment") ok = await db.deleteAppointment(id);
    else if (type === "service") ok = await db.deleteService(id);
    else if (type === "product") ok = await db.deleteProduct(id);
    else if (type === "gallery") ok = await db.deleteGalleryItem(id);
    else if (type === "testimonial") ok = await db.deleteTestimonial(id);
    else if (type === "feedback") ok = await db.deleteFeedback(id);

    if (ok) {
      if (type === "appointment") setAppointments(p => p.filter(a => a.id !== id));
      else if (type === "service") setServices(p => p.filter(s => s.id !== id));
      else if (type === "product") setProducts(p => p.filter(p2 => p2.id !== id));
      else if (type === "gallery") setGallery(p => p.filter(g => g.id !== id));
      else if (type === "testimonial") setTestimonials(p => p.filter(t => t.id !== id));
      else if (type === "feedback") setFeedbacks(p => p.filter(f => f.id !== id));
      toast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted.`);
    } else {
      toast("Delete failed. Please try again.", "error");
    }
  };

  const [benefitInput, setBenefitInput] = useState("");

  const addBenefit = () => {
    if (!benefitInput.trim()) return;
    const currentBenefits = formValues.benefits || [];
    if (!currentBenefits.includes(benefitInput.trim())) {
      setFormValues({ ...formValues, benefits: [...currentBenefits, benefitInput.trim()] });
    }
    setBenefitInput("");
  };

  const removeBenefit = (index: number) => {
    const currentBenefits = formValues.benefits || [];
    setFormValues({ ...formValues, benefits: currentBenefits.filter((_: any, i: number) => i !== index) });
  };

  /* ─────────── Open modal ─────────── */
  const openModal = (type: ModalType, item?: any) => {
    setModalType(type);
    setImagePreview("");
    setBenefitInput("");
    if (item) {
      setEditingId(item.id);
      if (type === "service") {
        setFormValues({
          name: item.name,
          category: item.category,
          description: item.description,
          duration: item.duration || "",
          benefits: item.benefits || [],
          imageUrl: item.imageUrl || ""
        });
        setImagePreview(item.imageUrl || "");
      } else if (type === "product") {
        setFormValues({
          name: item.name,
          description: item.description,
          benefits: item.benefits || [],
          imageUrl: item.imageUrl || ""
        });
        setImagePreview(item.imageUrl || "");
      } else if (type === "gallery") {
        setFormValues({ title: item.title, category: item.category, imageUrl: item.imageUrl });
        setImagePreview(item.imageUrl || "");
      } else if (type === "testimonial") {
        setFormValues({ name: item.name, rating: item.rating, comment: item.comment, role: item.role });
      }
    } else {
      setEditingId(null);
      if (type === "service") setFormValues({ name: "", category: "Threading", description: "", duration: "", benefits: [], imageUrl: "" });
      else if (type === "product") setFormValues({ name: "", description: "", benefits: [], imageUrl: "" });
      else if (type === "gallery") setFormValues({ title: "", category: "Bridal Looks", imageUrl: "" });
      else if (type === "testimonial") setFormValues({ name: "", rating: 5, comment: "", role: "Customer" });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setEditingId(null);
    setFormValues({});
    setImagePreview("");
    setBenefitInput("");
  };

  /* ─────────── Image upload ─────────── */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, folder: "services" | "products" | "gallery") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      // Local preview immediately
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
      // Upload to storage
      const url = await db.uploadImage(file, folder);
      if (url) {
        setFormValues((prev: any) => ({ ...prev, imageUrl: url }));
        setImagePreview(url);
        toast("Image uploaded successfully.");
      } else {
        // Logically fall back to local URL preview so CRUD still succeeds in sandbox
        setFormValues((prev: any) => ({ ...prev, imageUrl: localUrl }));
        toast("Image saved locally (mock mode).", "info");
      }
    } catch (err) {
      toast("Image upload failed.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  /* ─────────── Form submit ─────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalType === "service") {
        if (!(formValues.name || "").trim()) { toast("Service Name is required.", "error"); return; }
        if (!(formValues.description || "").trim()) { toast("Description is required.", "error"); return; }
        const payload = {
          name: (formValues.name || "").trim(),
          category: formValues.category || "Threading",
          description: (formValues.description || "").trim(),
          duration: formValues.duration ? (formValues.duration || "").trim() : undefined,
          benefits: formValues.benefits || [],
          imageUrl: formValues.imageUrl || undefined
        };
        if (editingId) {
          await db.updateService(editingId, payload);
          setServices(p => p.map(s => s.id === editingId ? { ...s, ...payload } : s));
          toast("Service updated successfully.");
        } else {
          const created = await db.addService(payload);
          setServices(p => [created, ...p]);
          toast("Service added successfully.");
        }
      } else if (modalType === "product") {
        if (!(formValues.name || "").trim()) { toast("Product Name is required.", "error"); return; }
        if (!(formValues.description || "").trim()) { toast("Description is required.", "error"); return; }
        const payload = {
          name: (formValues.name || "").trim(),
          description: (formValues.description || "").trim(),
          benefits: formValues.benefits || [],
          imageUrl: formValues.imageUrl || "/images/placeholder.webp"
        };
        if (editingId) {
          await db.updateProduct(editingId, payload);
          setProducts(p => p.map(pr => pr.id === editingId ? { ...pr, ...payload } : pr));
          toast("Product updated successfully.");
        } else {
          const created = await db.addProduct(payload);
          setProducts(p => [created, ...p]);
          toast("Product added successfully.");
        }
      } else if (modalType === "gallery") {
        if (!(formValues.title || "").trim()) { toast("Title is required.", "error"); return; }
        if (!formValues.imageUrl) { toast("Please upload an image first.", "error"); return; }
        const payload = {
          title: (formValues.title || "").trim(),
          category: formValues.category || "Bridal Looks",
          imageUrl: formValues.imageUrl
        };
        if (editingId) {
          await db.updateGalleryItem(editingId, payload);
          setGallery(p => p.map(g => g.id === editingId ? { ...g, ...payload } : g));
          toast("Gallery item updated.");
        } else {
          const created = await db.addGalleryItem(payload);
          setGallery(p => [created, ...p]);
          toast("Photo added to gallery.");
        }
      } else if (modalType === "testimonial") {
        if (!(formValues.name || "").trim()) { toast("Client Name is required.", "error"); return; }
        if (!(formValues.comment || "").trim()) { toast("Testimonial comment is required.", "error"); return; }
        const payload = {
          name: (formValues.name || "").trim(),
          rating: Number(formValues.rating || 5),
          comment: (formValues.comment || "").trim(),
          role: (formValues.role || "").trim() || "Customer"
        };
        if (editingId) {
          await db.updateTestimonial(editingId, payload);
          setTestimonials(p => p.map(t => t.id === editingId ? { ...t, ...payload } : t));
          toast("Testimonial updated.");
        } else {
          const created = await db.addTestimonial(payload);
          setTestimonials(p => [created, ...p]);
          toast("Testimonial added successfully.");
        }
      }
      closeModal();
    } catch (err) {
      console.error(err);
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────── Filtered data ─────────── */
  const filteredAppointments = appointments.filter(b => {
    const q = search.toLowerCase();
    return (
      (b.name || "").toLowerCase().includes(q) ||
      (b.phone || "").toLowerCase().includes(q) ||
      (b.service || "").toLowerCase().includes(q) ||
      (b.appointment_reference || "").toLowerCase().includes(q)
    );
  });

  const getLocalDateStr = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const todayStr = getLocalDateStr();
  const todaysAppointments = appointments.filter(a => a.preferred_date === todayStr);
  const pendingCount = appointments.filter(a => a.status === "Pending Confirmation").length;
  const confirmedCount = appointments.filter(a => a.status === "Confirmed").length;
  const completedCount = appointments.filter(a => a.status === "Completed").length;
  const cancelledCount = appointments.filter(a => a.status === "Cancelled").length;

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGallery = gallery.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || g.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredTestimonials = testimonials.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.comment.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFeedbacks = feedbacks.filter(f =>
    (f.customer_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (f.phone_number || "").toLowerCase().includes(search.toLowerCase()) ||
    (f.service_name || "").toLowerCase().includes(search.toLowerCase())
  );


  /* ─────────── UI helpers ─────────── */
  const grad = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";
  const inputCls = "w-full bg-[#030714] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF2D95] focus:ring-1 focus:ring-[#FF2D95]/20 transition-colors";
  const labelCls = "block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1";

  const serviceCategories = ["All", "Threading", "Bleach", "Waxing", "Haircut", "Hair Colouring", "Facial", "Massage Treatment", "Pedicure", "Manicure", "Spa & Wellness", "Training Courses"];
  const galleryCategories = ["All", "Bridal Looks", "Hair Transformations", "Skin Care Results", "Kids Styling", "Home Service Moments"];

  const tabs = [
    { id: "appointments", label: "Appointments", icon: <Calendar className="w-4 h-4" />, count: appointments.length },
    { id: "services",     label: "Services",     icon: <Sparkles className="w-4 h-4" />, count: services.length },
    { id: "products",     label: "Products",     icon: <ShoppingBag className="w-4 h-4" />, count: products.length },
    { id: "gallery",      label: "Gallery",      icon: <ImageIcon className="w-4 h-4" />, count: gallery.length },
    { id: "feedback",     label: "Feedback",     icon: <MessageSquare className="w-4 h-4" />, count: feedbacks.length },
    { id: "testimonials", label: "Testimonials", icon: <Star className="w-4 h-4" />, count: testimonials.length },
  ] as const;

  /* ─────────── Loading screen ─────────── */
  if (loading && !user) return (
    <div className="bg-[#050B1F] min-h-screen flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <RefreshCw className="w-8 h-8 text-[#FF2D95] animate-spin" />
        <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Loading Dashboard...</span>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════
      RENDER
  ═══════════════════════════════════════════════════════ */
  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans selection:bg-[#FF2D95] selection:text-white flex flex-col lg:flex-row">

      {/* ─── SIDEBAR ─── */}
      <aside className="w-full lg:w-64 bg-[#030714] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between shrink-0 p-6">
        <div className="space-y-8">
          <div className="text-left">
            <span className={`text-xl font-bold tracking-widest uppercase ${grad} font-serif`}>Shiloh Admin</span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#FFD166] font-medium mt-0.5 block">Content Manager</span>
          </div>
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as TabId); setSearch(""); setCategoryFilter("All"); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] text-white shadow-md shadow-[#FF2D95]/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                <span className="hidden lg:inline">{tab.label}</span>
                <span className="ml-auto hidden lg:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{tab.count}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-4 hidden lg:block">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Logged in as</span>
            <span className="text-xs text-gray-300 font-medium truncate block max-w-[200px]">{user?.email}</span>
          </div>
          {!isSupabaseConfigured && (
            <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[9px] text-orange-400">
              ⚡ Local Mock Mode — Set up .env.local to connect Supabase
            </div>
          )}
          <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-500/20 hover:bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-wider transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 p-6 lg:p-10 space-y-6 overflow-y-auto max-h-screen">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-serif capitalize">{activeTab} Manager</h1>
            <p className="text-xs text-gray-500 font-light mt-0.5">Add, edit, or delete — changes sync instantly to the public site.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadAllData} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Refresh">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            {activeTab !== "appointments" && activeTab !== "feedback" && (
              <button
                onClick={() => {
                  if (activeTab === "services") openModal("service");
                  else if (activeTab === "products") openModal("product");
                  else if (activeTab === "gallery") openModal("gallery");
                  else if (activeTab === "testimonials") openModal("testimonial");
                }}
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] text-xs font-semibold uppercase tracking-wider text-white hover:opacity-90 shadow-md shadow-[#FF2D95]/10"
              >
                <Plus className="w-4 h-4" />
                Add {activeTab === "gallery" ? "Photo" : activeTab === "testimonials" ? "Testimonial" : activeTab === "services" ? "Service" : "Product"}
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder={
                activeTab === "appointments"
                  ? "Search appointments by name, phone, service, or reference..."
                  : activeTab === "feedback"
                  ? "Search feedback by customer name, phone number, or service..."
                  : `Search ${activeTab}…`
              }
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF2D95] transition-colors"
            />
          </div>
          {activeTab !== "appointments" && (activeTab === "services" || activeTab === "gallery") && (
            <div className="relative">

                <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-9 pr-8 text-sm text-white focus:outline-none focus:border-[#FF2D95] appearance-none transition-colors"
                >
                  {(activeTab === "services" ? serviceCategories : galleryCategories).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          )}
        </div>


        {/* ── Loading ── */}
        {loading ? (
          <div className="h-64 flex items-center justify-center border border-white/5 bg-white/[0.02] rounded-2xl">
            <Loader2 className="w-6 h-6 text-[#7B2CFF] animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">

            {/* ═══ APPOINTMENTS ═══ */}
            {activeTab === "appointments" && (
              <div className="space-y-6">
                {/* Dashboard Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Today's Bookings</span>
                    <span className="text-2xl font-bold text-[#00D4FF] mt-1 block">{todaysAppointments.length}</span>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Pending</span>
                    <span className="text-2xl font-bold text-[#FF9F1C] mt-1 block">{pendingCount}</span>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Confirmed</span>
                    <span className="text-2xl font-bold text-[#00F5D4] mt-1 block">{confirmedCount}</span>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Completed</span>
                    <span className="text-2xl font-bold text-[#7B2CFF] mt-1 block">{completedCount}</span>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Cancelled</span>
                    <span className="text-2xl font-bold text-[#FF5A5F] mt-1 block">{cancelledCount}</span>
                  </div>
                </div>

                <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
                  {filteredAppointments.length === 0 ? (
                    <div className="p-16 text-center">
                      <Calendar className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 font-light text-sm">No appointment requests found.</p>
                      <p className="text-gray-600 text-xs mt-1">Try a different search term or check back later.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-semibold uppercase tracking-wider">
                            <th className="p-4">Reference</th>
                            <th className="p-4">Client</th>
                            <th className="p-4">Service</th>
                            <th className="p-4">Schedule</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredAppointments.map(b => {
                            const rawPhone = b.phone || "";
                            const digits = rawPhone.replace(/\D/g, "");
                            const cleanPhone = digits.length === 10 ? "91" + digits : digits;
                            const prefilledText = `Hi ${b.name},\n\nYour appointment request has been received.\n\nReference: ${b.appointment_reference}\n\nWe will contact you shortly to confirm your booking.\n\n* Shiloh Ladies & Kids Beauty Salon`;

                            return (
                              <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="p-4 font-mono font-semibold text-[#FFD166]">
                                  {b.appointment_reference}
                                </td>
                                <td className="p-4">
                                  <div className="font-semibold text-white">{b.name}</div>
                                  <div className="text-gray-400 mt-0.5">{b.phone}</div>
                                </td>
                                <td className="p-4 text-gray-300 font-medium">
                                  <div>{b.service}</div>
                                  {b.notes && (
                                    <div className="text-[10px] text-gray-500 max-w-[200px] truncate mt-0.5" title={b.notes}>
                                      Note: {b.notes}
                                    </div>
                                  )}
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-1.5 text-white"><Calendar className="w-3.5 h-3.5 text-[#FF2D95]" />{b.preferred_date}</div>
                                  <div className="flex items-center gap-1.5 text-gray-400 mt-0.5"><Clock className="w-3.5 h-3.5 text-gray-500" />{b.preferred_time}</div>
                                </td>
                                <td className="p-4">
                                  <div className={`flex items-center gap-1 ${b.appointment_type === "Home Service" ? "text-[#00D4FF]" : "text-[#FFD166]"}`}>
                                    {b.appointment_type === "Home Service" ? <MapPin className="w-3 h-3" /> : <Home className="w-3 h-3" />}
                                    {b.appointment_type}
                                  </div>
                                  {b.address && <span className="text-[10px] text-gray-500 block max-w-[140px] truncate">{b.address}</span>}
                                  <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider ${
                                    b.booking_type === "Special Request"
                                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                      : "bg-white/5 text-gray-400 border border-white/5"
                                  }`}>{b.booking_type}</span>
                                </td>
                                <td className="p-4">
                                  <span className={`inline-flex px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider ${
                                    b.status === "Confirmed" ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : b.status === "Completed" ? "bg-[#7B2CFF]/10 text-[#a074ff] border border-[#7B2CFF]/20"
                                    : b.status === "Cancelled" ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                    : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                  }`}>{b.status}</span>
                                </td>
                                <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                  {/* WhatsApp Shortcut */}
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(prefilledText)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition-all inline-flex items-center justify-center align-middle"
                                    title="Send WhatsApp Update"
                                  >
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.419 1.451 5.428 0 9.845-4.415 9.849-9.847a9.785 9.785 0 0 0-2.883-6.963C16.945 1.748 14.593.766 12.007.766 6.58.766 2.162 5.18 2.158 10.61c0 1.947.509 3.848 1.474 5.531l-.993 3.629 3.71-.973zm11.002-6.525c-.277-.139-1.64-.81-1.894-.902-.255-.093-.44-.139-.626.139-.185.277-.717.902-.879 1.087-.162.186-.325.208-.602.069-.277-.14-1.172-.431-2.232-1.378-.825-.736-1.381-1.644-1.543-1.922-.162-.277-.017-.427.121-.565.125-.124.277-.323.416-.485.139-.162.185-.277.277-.462.093-.185.046-.347-.023-.485-.069-.139-.626-1.507-.857-2.061-.225-.54-.45-.466-.626-.475-.162-.008-.347-.01-.532-.01s-.485.069-.74.347c-.255.277-.972.949-.972 2.312s.995 2.68 1.134 2.865c.139.185 1.958 2.99 4.743 4.194.662.287 1.179.458 1.583.587.665.211 1.27.181 1.748.11.532-.079 1.64-.671 1.871-1.319.231-.648.231-1.203.162-1.319-.069-.115-.255-.185-.532-.324z"/>
                                    </svg>
                                  </a>

                                  {/* Approve / Complete / Cancel Controls */}
                                  {b.status === "Pending Confirmation" && (
                                    <>
                                      <button
                                        onClick={() => handleBookingStatus(b.id, "Confirmed")}
                                        className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition-all inline-flex items-center justify-center align-middle"
                                        title="Confirm Booking"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleBookingStatus(b.id, "Cancelled")}
                                        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all inline-flex items-center justify-center align-middle"
                                        title="Cancel Booking"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </>
                                  )}

                                  {b.status === "Confirmed" && (
                                    <>
                                      <button
                                        onClick={() => handleBookingStatus(b.id, "Completed")}
                                        className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all inline-flex items-center justify-center align-middle"
                                        title="Mark as Completed"
                                      >
                                        <Check className="w-3.5 h-3.5 font-bold" />
                                      </button>
                                      <button
                                        onClick={() => handleBookingStatus(b.id, "Cancelled")}
                                        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all inline-flex items-center justify-center align-middle"
                                        title="Cancel Booking"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </>
                                  )}

                                  {b.status === "Completed" && (
                                    <a
                                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                        `Hi ${b.name},\n\nThank you for visiting Shiloh Ladies & Kids Beauty Salon ❤️\n\nWe hope you loved our service.\n\nPlease share your feedback here:\n${
                                          typeof window !== "undefined" ? window.location.origin : "https://shilohbeauty.com"
                                        }/feedback\n\nThank you.\n\n-Team Shiloh`
                                      )}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#FF2D95]/10 border border-[#FF2D95]/20 text-[#FF2D95] hover:bg-[#FF2D95] hover:text-white transition-all text-[10px] font-semibold uppercase tracking-wider align-middle"
                                      title="Send Feedback Request"
                                    >
                                      Send Feedback Request
                                    </a>
                                  )}

                                  {/* Delete booking completely */}
                                  <button
                                    onClick={() => requestDelete("appointment", b.id)}
                                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:border-red-500 hover:text-red-400 transition-all inline-flex items-center justify-center align-middle"
                                    title="Delete Record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}


            {/* ═══ SERVICES ═══ */}
            {activeTab === "services" && (
              filteredServices.length === 0 ? (
                <EmptyState icon={<Sparkles className="w-10 h-10 text-gray-600" />} label="No services found" sub={search ? "Try a different search term." : "Click 'Add Service' to get started."} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredServices.map(s => (
                    <div key={s.id} className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col justify-between group">
                      {s.imageUrl && (
                        <div className="relative h-32 w-full rounded-xl overflow-hidden mb-4 bg-slate-900">
                          <Image src={s.imageUrl} alt={s.name} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover object-center" />
                        </div>
                      )}
                      <div className="space-y-2 text-left flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#00D4FF]">{s.category}</span>
                          {s.duration && <span className="text-[10px] text-gray-500">{s.duration}</span>}
                        </div>
                        <h3 className="text-sm font-bold font-serif text-white">{s.name}</h3>
                        <p className="text-gray-400 text-xs font-light line-clamp-2 leading-relaxed">{s.description}</p>
                        {s.benefits.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {s.benefits.slice(0, 3).map((b, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-gray-400">{b}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 pt-4 border-t border-white/5 mt-4">
                        <button onClick={() => openModal("service", s)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold transition-colors"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                        <button onClick={() => requestDelete("service", s.id)} className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* ═══ PRODUCTS ═══ */}
            {activeTab === "products" && (
              filteredProducts.length === 0 ? (
                <EmptyState icon={<ShoppingBag className="w-10 h-10 text-gray-600" />} label="No products found" sub={search ? "Try a different search term." : "Click 'Add Product' to get started."} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                      {p.imageUrl && (
                        <div className="relative h-36 w-full rounded-xl overflow-hidden mb-4 bg-slate-900">
                          <Image src={p.imageUrl} alt={p.name} fill sizes="(max-width: 768px) 100vw, 20vw" className="object-cover" />
                        </div>
                      )}
                      <div className="space-y-2 text-left flex-1">
                        <h3 className="text-sm font-bold font-serif text-white">{p.name}</h3>
                        <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-3">{p.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {p.benefits.slice(0, 3).map((b, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-gray-400">{b}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4 border-t border-white/5 mt-4">
                        <button onClick={() => openModal("product", p)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold transition-colors"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                        <button onClick={() => requestDelete("product", p.id)} className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* ═══ GALLERY ═══ */}
            {activeTab === "gallery" && (
              filteredGallery.length === 0 ? (
                <EmptyState icon={<ImageIcon className="w-10 h-10 text-gray-600" />} label="No photos found" sub={search ? "Try a different search term." : "Upload your first gallery photo."} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredGallery.map(g => (
                    <div key={g.id} className="glass-card rounded-2xl overflow-hidden border border-white/5 group">
                      <div className="relative h-44 w-full bg-slate-900">
                        <Image src={g.imageUrl} alt={g.title} fill sizes="(max-width: 768px) 100vw, 20vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#050B1F]/80 border border-white/10 rounded-full text-[9px] text-[#00D4FF] uppercase tracking-wider font-semibold">{g.category}</div>
                      </div>
                      <div className="p-4 flex items-center justify-between gap-3">
                        <h4 className="text-xs font-bold text-white font-serif truncate flex-1">{g.title}</h4>
                        <div className="flex gap-1.5 shrink-0">
                          <button onClick={() => openModal("gallery", g)} className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => requestDelete("gallery", g.id)} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* ═══ FEEDBACK ═══ */}
            {activeTab === "feedback" && (
              <div className="space-y-6">
                {/* Feedback Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Total Feedbacks</span>
                    <span className="text-2xl font-bold text-[#00D4FF] mt-1 block">{feedbacks.length}</span>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Pending Reviews</span>
                    <span className="text-2xl font-bold text-[#FF9F1C] mt-1 block">
                      {feedbacks.filter(f => f.status === "Pending").length}
                    </span>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Approved Reviews</span>
                    <span className="text-2xl font-bold text-[#00F5D4] mt-1 block">
                      {feedbacks.filter(f => f.status === "Approved").length}
                    </span>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Rejected Reviews</span>
                    <span className="text-2xl font-bold text-[#FF5A5F] mt-1 block">
                      {feedbacks.filter(f => f.status === "Rejected").length}
                    </span>
                  </div>
                </div>

                {/* Feedback Table Card */}
                <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
                  {filteredFeedbacks.length === 0 ? (
                    <div className="p-16 text-center">
                      <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 font-light text-sm">No feedback or reviews found.</p>
                      <p className="text-gray-600 text-xs mt-1">Try a different search term or check back later.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-semibold uppercase tracking-wider">
                            <th className="p-4">Customer</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Service</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Feedback</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredFeedbacks.map(f => {
                            const feedbackDate = new Date(f.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            });

                            return (
                              <tr key={f.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="p-4 font-semibold text-white">
                                  <div className="flex items-center gap-2 text-left">
                                    {f.photo_url && (
                                      <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-slate-950 shrink-0">
                                        <Image src={f.photo_url} alt={f.customer_name} fill sizes="32px" className="object-cover" />
                                      </div>
                                    )}
                                    <span>{f.customer_name}</span>
                                  </div>
                                </td>
                                <td className="p-4 text-gray-300 font-medium">{f.phone_number}</td>
                                <td className="p-4 text-gray-300 font-medium">{f.service_name}</td>
                                <td className="p-4">
                                  <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                      <Star
                                        key={idx}
                                        className={`w-3.5 h-3.5 ${
                                          idx < f.rating ? "text-[#FFD166] fill-[#FFD166]" : "text-gray-700"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </td>
                                <td className="p-4 text-gray-300 font-light max-w-xs break-words whitespace-pre-wrap text-left">
                                  {f.message}
                                </td>
                                <td className="p-4 text-gray-400 font-medium">{feedbackDate}</td>
                                <td className="p-4">
                                  <span className={`inline-flex px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider ${
                                    f.status === "Approved" ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : f.status === "Rejected" ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                    : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                  }`}>{f.status}</span>
                                </td>
                                <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                  {f.status === "Pending" && (
                                    <>
                                      <button
                                        onClick={() => handleFeedbackStatus(f.id, "Approved")}
                                        className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition-all inline-flex items-center justify-center align-middle cursor-pointer"
                                        title="Approve Review"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleFeedbackStatus(f.id, "Rejected")}
                                        className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-white transition-all inline-flex items-center justify-center align-middle cursor-pointer"
                                        title="Reject Review"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </>
                                  )}

                                  {f.status === "Approved" && (
                                    <button
                                      onClick={() => handleFeedbackStatus(f.id, "Rejected")}
                                      className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-white transition-all inline-flex items-center justify-center align-middle cursor-pointer"
                                      title="Reject Review"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  )}

                                  {f.status === "Rejected" && (
                                    <button
                                      onClick={() => handleFeedbackStatus(f.id, "Approved")}
                                      className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition-all inline-flex items-center justify-center align-middle cursor-pointer"
                                      title="Approve Review"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                  )}

                                  <button
                                    onClick={() => requestDelete("feedback", f.id)}
                                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:border-red-500 hover:text-red-400 transition-all inline-flex items-center justify-center align-middle cursor-pointer"
                                    title="Delete Feedback"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ═══ TESTIMONIALS ═══ */}
            {activeTab === "testimonials" && (
              filteredTestimonials.length === 0 ? (
                <EmptyState icon={<MessageSquare className="w-10 h-10 text-gray-600" />} label="No testimonials found" sub={search ? "Try a different search term." : "Add your first client testimonial."} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredTestimonials.map(t => (
                    <div key={t.id} className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                      <div className="space-y-3 text-left flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => (<Star key={i} className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />))}</div>
                          <span className="text-[10px] text-[#00D4FF] uppercase tracking-wider">{t.role}</span>
                        </div>
                        <p className="text-gray-300 font-light text-xs leading-relaxed italic">"{t.comment}"</p>
                        <h4 className="text-sm font-semibold text-white font-serif">— {t.name}</h4>
                      </div>
                      <div className="flex gap-2 pt-4 border-t border-white/5 mt-4">
                        <button onClick={() => openModal("testimonial", t)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold transition-colors"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                        <button onClick={() => requestDelete("testimonial", t.id)} className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

          </div>
        )}
      </main>

      {/* ══════════════════════════════════
          CRUD MODAL
      ══════════════════════════════════ */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-[#070E24] border border-white/10 p-8 rounded-3xl space-y-6 text-left max-h-[92vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-lg font-bold font-serif">
                  {editingId ? "Edit" : "Add New"} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
                </h3>
                <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* ── SERVICE FORM ── */}
                {modalType === "service" && (<>
                  <div>
                    <label className={labelCls}>Service Name *</label>
                    <input required type="text" value={formValues.name || ""} onChange={e => setFormValues({ ...formValues, name: e.target.value })} placeholder="e.g. Feather Cut" className={inputCls} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Category *</label>
                      <select value={formValues.category || "Threading"} onChange={e => setFormValues({ ...formValues, category: e.target.value })} className={`${inputCls} cursor-pointer bg-[#030714]`}>
                        {["Threading","Bleach","Waxing","Haircut","Hair Colouring","Facial","Massage Treatment","Pedicure","Manicure","Spa & Wellness","Training Courses"].map(c => <option key={c} value={c} className="bg-[#070E24]">{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Duration</label>
                      <input type="text" value={formValues.duration || ""} onChange={e => setFormValues({ ...formValues, duration: e.target.value })} placeholder="e.g. 45 mins" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Description *</label>
                    <textarea required rows={3} value={formValues.description || ""} onChange={e => setFormValues({ ...formValues, description: e.target.value })} placeholder="Describe the service..." className={`${inputCls} resize-none`} />
                  </div>

                  <div>
                    <label className={labelCls}>Benefits (Dynamic Chips)</label>
                    <div className="flex flex-wrap gap-1.5 mb-2 min-h-[36px] p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      {(formValues.benefits || []).length === 0 ? (
                        <span className="text-[10px] text-gray-500 italic p-0.5">No benefits added yet. Press Add to append.</span>
                      ) : (
                        (formValues.benefits || []).map((benefit: string, idx: number) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF2D95]/10 to-[#7B2CFF]/10 border border-[#FF2D95]/20 text-[10px] text-gray-200">
                            {benefit}
                            <button type="button" onClick={() => removeBenefit(idx)} className="hover:text-red-400 text-gray-400 transition-colors ml-1 font-bold">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={benefitInput}
                        onChange={e => setBenefitInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addBenefit();
                          }
                        }}
                        placeholder="Type a benefit & click Add or press Enter"
                        className={inputCls}
                      />
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="py-2.5 px-4 bg-white/5 border border-white/10 hover:bg-[#FF2D95]/10 hover:border-[#FF2D95]/30 text-xs font-semibold rounded-xl uppercase tracking-wider transition-colors shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <ImageUploadField folder="services" preview={imagePreview} uploading={uploadingImage} fileRef={fileRef} onFileChange={e => handleFileChange(e, "services")} />
                </>)}

                {/* ── PRODUCT FORM ── */}
                {modalType === "product" && (<>
                  <div>
                    <label className={labelCls}>Product Name *</label>
                    <input required type="text" value={formValues.name || ""} onChange={e => setFormValues({ ...formValues, name: e.target.value })} placeholder="e.g. Rose Petal Serum" className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>Description *</label>
                    <textarea required rows={3} value={formValues.description || ""} onChange={e => setFormValues({ ...formValues, description: e.target.value })} placeholder="Product details..." className={`${inputCls} resize-none`} />
                  </div>

                  <div>
                    <label className={labelCls}>Benefits (Dynamic Chips)</label>
                    <div className="flex flex-wrap gap-1.5 mb-2 min-h-[36px] p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      {(formValues.benefits || []).length === 0 ? (
                        <span className="text-[10px] text-gray-500 italic p-0.5">No benefits added yet. Press Add to append.</span>
                      ) : (
                        (formValues.benefits || []).map((benefit: string, idx: number) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF2D95]/10 to-[#7B2CFF]/10 border border-[#FF2D95]/20 text-[10px] text-gray-200">
                            {benefit}
                            <button type="button" onClick={() => removeBenefit(idx)} className="hover:text-red-400 text-gray-400 transition-colors ml-1 font-bold">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={benefitInput}
                        onChange={e => setBenefitInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addBenefit();
                          }
                        }}
                        placeholder="Type a benefit & click Add or press Enter"
                        className={inputCls}
                      />
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="py-2.5 px-4 bg-white/5 border border-white/10 hover:bg-[#FF2D95]/10 hover:border-[#FF2D95]/30 text-xs font-semibold rounded-xl uppercase tracking-wider transition-colors shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <ImageUploadField folder="products" preview={imagePreview} uploading={uploadingImage} fileRef={fileRef} onFileChange={e => handleFileChange(e, "products")} />
                </>)}

                {/* ── GALLERY FORM ── */}
                {modalType === "gallery" && (<>
                  <div>
                    <label className={labelCls}>Photo Title *</label>
                    <input required type="text" value={formValues.title || ""} onChange={e => setFormValues({ ...formValues, title: e.target.value })} placeholder="e.g. Bridal Glass Skin Look" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Category *</label>
                    <select value={formValues.category || "Bridal Looks"} onChange={e => setFormValues({ ...formValues, category: e.target.value })} className={`${inputCls} cursor-pointer bg-[#030714]`}>
                      {["Bridal Looks","Hair Transformations","Skin Care Results","Kids Styling","Home Service Moments"].map(c => <option key={c} value={c} className="bg-[#070E24]">{c}</option>)}
                    </select>
                  </div>
                  <ImageUploadField folder="gallery" preview={imagePreview} uploading={uploadingImage} fileRef={fileRef} onFileChange={e => handleFileChange(e, "gallery")} required />
                </>)}

                {/* ── TESTIMONIAL FORM ── */}
                {modalType === "testimonial" && (<>
                  <div>
                    <label className={labelCls}>Client Name *</label>
                    <input required type="text" value={formValues.name || ""} onChange={e => setFormValues({ ...formValues, name: e.target.value })} placeholder="e.g. Priya Sundar" className={inputCls} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Rating (1–5) *</label>
                      <div className="flex gap-1 mt-1 bg-white/[0.02] border border-white/5 rounded-xl p-1.5 w-fit">
                        {[1,2,3,4,5].map(n => (
                          <button key={n} type="button" onClick={() => setFormValues({ ...formValues, rating: n })} className={`p-1 rounded-lg transition-transform hover:scale-110 ${Number(formValues.rating || 5) >= n ? "text-[#FFD166]" : "text-gray-600"}`}>
                            <Star className={`w-4 h-4 ${Number(formValues.rating || 5) >= n ? "fill-[#FFD166] text-[#FFD166]" : "text-gray-600"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Role / Tag</label>
                      <input type="text" value={formValues.role || "Customer"} onChange={e => setFormValues({ ...formValues, role: e.target.value })} placeholder="e.g. Regular Client" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Testimonial *</label>
                    <textarea required rows={4} value={formValues.comment || ""} onChange={e => setFormValues({ ...formValues, comment: e.target.value })} placeholder="What did they love about their experience..." className={`${inputCls} resize-none`} />
                  </div>
                </>)}

                {/* Actions */}
                <div className="pt-2 flex justify-end gap-3 border-t border-white/10">
                  <button type="button" onClick={closeModal} className="py-2.5 px-5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-colors">Cancel</button>
                  <button
                    type="submit"
                    disabled={submitting || uploadingImage}
                    className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {submitting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Saving...</> : <>{editingId ? "Update" : "Save"} {modalType?.charAt(0).toUpperCase()}{modalType?.slice(1)}</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          DELETE CONFIRM DIALOG
      ══════════════════════════════════ */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-[#070E24] border border-red-500/20 p-8 rounded-3xl text-center space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h4 className="text-base font-bold font-serif">Confirm Delete</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                This will permanently delete this <span className="text-white font-semibold">{confirmDelete.type}</span>. This action cannot be undone.
              </p>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-colors">Cancel</button>
                <button onClick={confirmDeleteAction} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ─────────── Sub-components ─────────── */

function EmptyState({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="p-16 text-center border border-white/5 bg-white/[0.01] rounded-2xl">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">{icon}</div>
      <p className="text-gray-400 font-semibold text-sm">{label}</p>
      <p className="text-gray-600 text-xs mt-1">{sub}</p>
    </div>
  );
}

function ImageUploadField({
  folder, preview, uploading, fileRef, onFileChange, required
}: {
  folder: string;
  preview: string;
  uploading: boolean;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Featured Image {required ? "*" : "(Optional)"}
      </label>
      {preview && (
        <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-slate-900 border border-white/10">
          <Image src={preview} alt="Preview" fill unoptimized className="object-cover" />
        </div>
      )}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-white/15 rounded-xl hover:border-[#FF2D95]/50 hover:bg-[#FF2D95]/5 text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
      >
        {uploading ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading...</> : <><Upload className="w-4 h-4" />{preview ? "Replace Image" : "Upload Image"}</>}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}

/* ─────────── Page export with ToastProvider ─────────── */
export default function AdminDashboardPage() {
  return (
    <ToastProvider>
      <DashboardInner />
    </ToastProvider>
  );
}
