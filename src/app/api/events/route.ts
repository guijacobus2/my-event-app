"use server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const EventRequestSchema = z.object({
  locale: z.string(),
  startDateTime: z.string(),
  endDateTime: z.string(),
  city: z.string(),
});

const TICKETMASTER_API_KEY = "2mFzAGUhyuqo23n1HvkdHOTgXJqgLOQu";

export async function GET(request: NextRequest) {
  try {
    const locale = request.nextUrl.searchParams.get("locale");
    const startDateTime = request.nextUrl.searchParams.get("startDateTime");
    const endDateTime = request.nextUrl.searchParams.get("endDateTime");
    const city = request.nextUrl.searchParams.get("city");
    EventRequestSchema.parse({
      locale,
      startDateTime,
      endDateTime,
      city,
    });

    // Make a request to Ticketmaster API
    const response = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/events",
      {
        params: {
          apikey: TICKETMASTER_API_KEY,
          locale,
          startDateTime,
          endDateTime,
          city,
        },
      }
    );

    const events = response.data._embedded.events;

    return NextResponse.json({ events }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
