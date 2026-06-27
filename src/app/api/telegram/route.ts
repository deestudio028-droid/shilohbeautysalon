import { NextResponse } from "next/server";

function escapeHtml(text: string = ""): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const {
      name,
      phone,
      service,
      preferred_date,
      preferred_time,
      booking_type,
      appointment_reference
    } = payload;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Log the payload details for debugging
    console.log("Telegram notification payload received:", payload);

    if (!botToken || !chatId) {
      console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in env variables.");
      return NextResponse.json({ success: false, error: "Telegram config missing" }, { status: 500 });
    }

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeService = escapeHtml(service);
    const safeDate = escapeHtml(preferred_date);
    const safeTime = escapeHtml(preferred_time);
    const safeBookingType = escapeHtml(booking_type);
    const safeRef = escapeHtml(appointment_reference);

    const messageText = `🌸 <b>New Appointment Booking</b>

━━━━━━━━━━━━━━

👤 <b>Customer</b>
${safeName}

📞 <b>Phone</b>
${safePhone}

💇 <b>Service</b>
${safeService}

📅 <b>Date</b>
${safeDate}

🕒 <b>Time</b>
${safeTime}

📌 <b>Booking Type</b>
${safeBookingType}

🔖 <b>Reference</b>
${safeRef}

━━━━━━━━━━━━━━

Status:
🟠 Pending Confirmation

Open Admin Dashboard to manage this booking.`;

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

    const data = await res.json();
    console.log("Telegram notification sent successfully:", data);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in Telegram API route:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
