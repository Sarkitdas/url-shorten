import Url from "@/models/Url";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ShortCodePage({ params }) {
  const { shortCode } = await params;

  const urlDoc = await Url.incrementClicks(shortCode);

  if (!urlDoc) {
    notFound();
  }

  redirect(urlDoc.longUrl);
}
