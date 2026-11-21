import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
  // Hanya menerima POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method tidak diizinkan"
    });
  }

  try {
    const order = req.body;

    // Cek apakah data dikirim
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Data order tidak ditemukan"
      });
    }

    // Simpan data ke Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: order.customerName || "",
        recipient_name: order.recipientName || "",
        password: order.password || "",
        template: order.template || "",
        date: order.date || "",

        page1_title: order.page1Title || "",
        page1_subtitle: order.page1Subtitle || "",
        page1_hint: order.page1Hint || "",

        page2_title: order.page2Title || "",
        page2_button: order.page2Button || "",

        page3_title: order.page3Title || "",
        page3_button_yes: order.page3ButtonYes || "",
        page3_button_no: order.page3ButtonNo || "",
        page3_tease: order.page3Tease || "",

        page4_title: order.page4Title || "",
        page4_text: order.page4Text || "",
        page4_button: order.page4Button || "",

        page5_title: order.page5Title || "",
        page5_text: order.page5Text || "",
        page5_button: order.page5Button || "",

        page6_title: order.page6Title || "",
        page6_music_text: order.page6MusicText || "",
        message: order.message || "",
        page6_button: order.page6Button || "",

        page7_title: order.page7Title || "",
        page7_text1: order.page7Text1 || "",
        page7_text2: order.page7Text2 || "",
        page7_button: order.page7Button || "",

        page8_title: order.page8Title || "",
        page8_text1: order.page8Text1 || "",
        page8_text2: order.page8Text2 || "",
        page8_button: order.page8Button || "",

        music_url: order.musicUrl || "",
        photos: order.photos || []
      })
      .select()
      .single();

    // Kalau Supabase mengembalikan error
    if (error) {
      console.error("Supabase error:", error);

      return res.status(500).json({
        success: false,
        message: "Gagal menyimpan order",
        error: error.message
      });
    }

    // Berhasil
    return res.status(200).json({
      success: true,
      message: "Order berhasil dibuat",
      order: data
    });

  } catch (error) {

    console.error("Server error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
      error: error.message
    });
  }
}