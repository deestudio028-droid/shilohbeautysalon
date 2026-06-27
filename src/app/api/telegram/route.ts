import { NextResponse } from "next/server";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(dateInput: string): string {
  if (!dateInput) return "";
  
  let dateObj: Date;
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const parts = dateInput.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    dateObj = new Date(year, month, day);
  } else {
    try {
      dateObj = new Date(dateInput);
      if (isNaN(dateObj.getTime())) return dateInput;
    } catch {
      return dateInput;
    }
  }
  
  const day = dateObj.getDate();
  const month = MONTHS[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  
  return `${day} ${month} ${year}`;
}

function escapeHtml(text: string = ""): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

function getWhatsAppNumber(phone: string): string {
  const digits = cleanPhoneNumber(phone);
  if (digits.length === 10) {
    return "91" + digits;
  }
  return digits;
}

function getCallNumber(phone: string): string {
  const digits = cleanPhoneNumber(phone);
  if (digits.length === 10) {
    return "+91" + digits;
  }
  return "+" + digits;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const {
      type = "booking",
      name,
      phone,
      service,
      preferred_date,
      preferred_time,
      booking_type,
      appointment_reference,
      rating,
      message,
      date
    } = payload;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Log the payload details for debugging
    console.log(`Telegram ${type} notification payload received:`, payload);

    if (!botToken || !chatId) {
      console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in env variables.");
      return NextResponse.json({ success: false, error: "Telegram config missing" }, { status: 500 });
    }

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeService = escapeHtml(service);
    const whatsappNum = getWhatsAppNumber(phone || "");

    let messageText = "";

    if (type === "feedback") {
      const safeMessage = escapeHtml(message);
      const formattedDate = formatDate(date || new Date().toISOString());
      
      const ratingVal = typeof rating === "number" ? rating : 5;
      const stars = "★".repeat(ratingVal) + "☆".repeat(5 - ratingVal);

      messageText = `⭐ <b>NEW CUSTOMER FEEDBACK</b>

━━━━━━━━━━━━━━━━━━

👤 Customer
${safeName}

📞 Phone
${safePhone}

💬 WhatsApp
https://wa.me/${whatsappNum}

⭐ Rating
${stars}

💇 Service
${safeService}

📝 Feedback
${safeMessage}

📅 Submitted
${formattedDate}

━━━━━━━━━━━━━━━━━━

🟡 Status
Pending Review

🖥 Admin Dashboard
https://www.shilohbeautysalon.com/admin/dashboard`;

    } else {
      // Default to "booking"
      const safeTime = escapeHtml(preferred_time);
      const safeBookingType = escapeHtml(booking_type);
      const safeRef = escapeHtml(appointment_reference);
      const formattedDate = formatDate(preferred_date);
      const callNum = getCallNumber(phone || "");

      messageText = `🌸 <b>NEW APPOINTMENT RECEIVED</b>

━━━━━━━━━━━━━━━━━━

👤 <b>Customer</b>
${safeName}

📞 <b>Phone</b>
${safePhone}

💬 <b>WhatsApp</b>
https://wa.me/${whatsappNum}

☎️ <b>Call</b>
tel:${callNum}

💇 <b>Service</b>
${safeService}

📅 <b>Date</b>
${formattedDate}

🕒 <b>Time</b>
${safeTime}

📌 <b>Booking Type</b>
${safeBookingType}

🔖 <b>Reference</b>
${safeRef}

━━━━━━━━━━━━━━━━━━

🟠 Status
Pending Confirmation

🖥 Admin Dashboard
https://www.shilohbeautysalon.com/admin/dashboard`;
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "HTML",
        disable_web_page_preview: true
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Telegram API responded with error status ${res.status}: ${errorText}`);
      return NextResponse.json({ success: false, error: "Telegram API failed" }, { status: 502 });
    }

    const resData = await res.json();
    console.log(`Telegram ${type} notification sent successfully:`, resData);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in Telegram API route:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
