export default async function handler(req, res) {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;

    const response = await fetch(
      `${url}/rest/v1/orders?select=*&limit=1`,
      {
        method: "GET",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`
        }
      }
    );

    const text = await response.text();

    return res.status(200).json({
      success: true,
      supabase_status: response.status,
      supabase_ok: response.ok,
      response: text.slice(0, 1000)
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error_name: error.name,
      error_message: error.message,
      error_stack: error.stack
    });

  }
}git add .