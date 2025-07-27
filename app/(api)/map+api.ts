export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  const zoom = url.searchParams.get("zoom") ?? "14";

  const apiKey = process.env.GEOAPIFY_API_KEY;
  console.log("Geoapify API Key:", apiKey);
  if (!apiKey || !lat || !lon) {
    return new Response("Missing parameters", { status: 400 });
  }

  const geoapifyUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${lon},${lat}&zoom=${zoom}&apiKey=${apiKey}`;

  return Response.redirect(geoapifyUrl);
}
