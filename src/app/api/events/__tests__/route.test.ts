import { describe, expect, test, vi } from "vitest";
import { createMocks } from "node-mocks-http";
import axios from "axios";
import { GET } from "../route";

vi.mock("axios");

describe("GET function", () => {
  test("returns events on successful API call", async () => {
    const mockedAxios = axios as vi.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        _embedded: {
          events: [
            { id: 1, name: "Event 1" },
            { id: 2, name: "Event 2" },
          ],
        },
      },
    });

    const { req } = createMocks({
      method: "GET",
      url: "/",
    });
    req.nextUrl = new URL(
      "https://app.ticketmaster.com/discovery/v2/events/?locale=en&startDateTime=2023-11-30T09:17:00Z&endDateTime=2023-11-30T09:17:00Z&city=Atlanta"
    );

    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      events: [
        { id: 1, name: "Event 1" },
        { id: 2, name: "Event 2" },
      ],
    });
  });
});
