import { describe, expect, test, vi } from "vitest";
import {
  render,
  within,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Home from "../page";
import React from "react";
import axios from "axios";

vi.mock("axios");

(axios.get as vi.MockedFunction<typeof axios.get>).mockResolvedValue({
  data: {
    events: [
      {
        id: "1",
        name: "Event 1",
        dates: {
          start: {
            localDate: "2023-11-30",
            localTime: "09:17:00",
          },
        },
        _embedded: {
          venues: [
            {
              name: "Venue 1",
            },
          ],
        },
      },
    ],
  },
});

describe("Home page should", () => {
  test("renders home page", () => {
    render(<Home />);
    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("heading", { level: 1, name: /Event List/i })
    ).toBeDefined();
    expect(main.getByRole("textbox", { name: /Start date/i })).toBeDefined();
    expect(main.getByRole("textbox", { name: /End date/i })).toBeDefined();
    expect(main.getByRole("button", { name: /Search events/i })).toBeDefined();
  });

  test("renders home page and enter inputs", async () => {
    render(<Home />);
    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("heading", { level: 1, name: /Event List/i })
    ).toBeDefined();

    const cityInput = main.getByRole("textbox", { name: "" });
    fireEvent.change(cityInput, { target: { value: "Atlanta" } });

    const startDateInput = main.getByRole("textbox", { name: /Start date/i });
    fireEvent.change(startDateInput, {
      target: { value: "11/30/2023 12:00 AM" },
    });

    const endDateInput = main.getByRole("textbox", { name: /End date/i });
    fireEvent.change(endDateInput, {
      target: { value: "12/01/2023 12:00 AM" },
    });

    const searchButton = main.getByRole("button", { name: /Search events/i });
    fireEvent.click(searchButton);

    await screen.findByText(/Event 1/i);
    await screen.findByText(/Venue 1/i);
    await screen.findByText(/2023-11-30/i);
    await screen.findByText(/09:17:00/i);
  });
});
