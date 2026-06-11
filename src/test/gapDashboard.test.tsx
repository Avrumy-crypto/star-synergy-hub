import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import GapDashboard from "@/pages/GapDashboard";
import { meta, regions, stateRegions, vendorPoints, nearestVendorMiles } from "@/lib/gapData";

describe("gap dashboard data", () => {
  it("has a sane dataset", () => {
    expect(meta.totalQuotedUsd).toBeGreaterThan(100_000_000);
    expect(regions.length).toBeGreaterThan(20);
    expect(stateRegions[0].gap_score).toBeGreaterThan(stateRegions[1].gap_score);
    expect(vendorPoints.length).toBeGreaterThan(100);
  });

  it("computes vendor distances", () => {
    // Manhattan should be within 50 mi of the NY/NJ vendor cluster
    expect(nearestVendorMiles(40.75, -73.99)).toBeLessThan(50);
    // Denver should have no vendor within 300 mi
    expect(nearestVendorMiles(39.74, -104.99)).toBeGreaterThan(300);
  });
});

describe("GapDashboard page", () => {
  it("gates behind the admin password and renders the overview", () => {
    window.localStorage.removeItem("admin-authenticated");
    render(
      <I18nProvider>
        <MemoryRouter>
          <GapDashboard />
        </MemoryRouter>
      </I18nProvider>
    );
    expect(screen.getByText(/enter the admin password/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "fivestar-admin" },
    });
    fireEvent.click(screen.getByRole("button", { name: /enter/i }));

    expect(screen.getByText(/Regional Demand & Vendor Coverage/i)).toBeInTheDocument();
    expect(screen.getByText(/Gap score by state/i)).toBeInTheDocument();
    window.localStorage.removeItem("admin-authenticated");
  });
});
