export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health" && request.method === "GET") {
      const configured = Boolean(env.SUPABASE_URL && env.SUPABASE_SECRET_KEY);
      if (!configured) return json({ ok: false, supabase: false, message: "Supabase environment is not configured." }, 503);
      const response = await fetch(`${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/quotes?select=id&limit=1`, {
        headers: { apikey: env.SUPABASE_SECRET_KEY, Accept: "application/json" },
      });
      return json({ ok: response.ok, supabase: response.ok, status: response.status }, response.ok ? 200 : 502);
    }
    if (url.pathname === "/api/contact" && request.method === "POST") return handleContact(request, env);
    if (url.pathname === "/api/quote" && request.method === "POST") return handleQuote(request, env);
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120), phone = clean(body.phone, 40), email = clean(body.email, 160), message = clean(body.message, 4000);
    if (!name || !phone) return json({ ok:false, message:"Name and phone are required." }, 400);
    if (body.website) return json({ ok:true, message:"Received." });
    await supabaseInsert(env, "contacts", { name, phone, email, message, source:"website" });
    return json({ ok:true, message:"Your enquiry has been routed to 7Theory." });
  } catch (e) { return json({ ok:false, message:e instanceof Error ? e.message : "Unable to save contact." }, 502); }
}

async function handleQuote(request, env) {
  try {
    const body = await request.json();
    const name = clean(body.name,120), phone = clean(body.phone,40), vehicle = clean(body.vehicle,160), year = clean(body.year,8), finish = clean(body.finish,80), notes = clean(body.notes,4000);
    const services = Array.isArray(body.services) ? body.services.map(x=>clean(x,40)).filter(Boolean) : [];
    if (!name || !phone) return json({ ok:false, message:"Name and phone are required." }, 400);
    if (body.website) return json({ ok:true, message:"Received." });
    const allowed = { PPF:65000, Ceramic:25000, Performance:35000, Aesthetics:18000 };
    const safeServices = services.filter(s=>Object.prototype.hasOwnProperty.call(allowed,s));
    const indicative = safeServices.reduce((n,s)=>n+allowed[s],0);
    await supabaseInsert(env, "quotes", { name, phone, vehicle, year: year || null, services: safeServices, finish, notes, indicative_total: indicative, status:"new", source:"website" });
    return json({ ok:true, indicative, message:"Your structured brief is now in the studio queue." });
  } catch (e) { return json({ ok:false, message:e instanceof Error ? e.message : "Unable to save quotation." }, 502); }
}

async function supabaseInsert(env, table, data) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) throw new Error("Supabase environment is not configured.");
  const r = await fetch(`${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${table}`, {
    method:"POST",
    headers:{ apikey: env.SUPABASE_SECRET_KEY, "Content-Type":"application/json", Prefer:"return=minimal" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(`Supabase ${table} request failed (${r.status}).`);
}
function clean(value, max){ return typeof value === "string" ? value.trim().slice(0,max) : ""; }
function json(data, status=200){ return new Response(JSON.stringify(data), { status, headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"} }); }
