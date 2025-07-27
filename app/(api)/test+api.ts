// app/api/test+api.ts
export async function GET() {
  console.log("Test route hit!");
  return new Response("API route is working!");
}
