"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Papa from "papaparse";
import { Search, LoaderCircle, AlertTriangle } from "lucide-react";
import TimelineEvent from "./timeline-event";

// CSV source (provided)
const CSV_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/academic_timeline_500-KiSHVEgqeZyg3eTW4FxlGZcVW0aEAZ.csv";

const eventTypes = [
  "All Events",
  "admission",
  "scholarship",
  "exam",
  "application",
  "internship",
];
const timeFilters = [
  "All Time",
  "This Week",
  "This Month",
  "Next 3 Months",
  "Next 6 Months",
];

const fetchCSV = async (url) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch CSV. Status: ${res.status}`);
  }
  return res.text();
};

function parseCsvToEvents(csvText) {
  const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return data.map((row, idx) => {
    const type = (row["Category"] ?? "").toString().trim().toLowerCase() || "other";
    const title = (row["Event Title"] ?? "").toString().trim() || "Untitled Event";
    const description = (row["Description"] ?? "").toString().trim();
    const dateStr = (row["Date"] ?? "").toString().trim();
    const organization = (row["Organization"] ?? "").toString().trim();

    // --- Parse CSV date directly ---
    let eventDate = dateStr ? new Date(dateStr) : new Date("2026-01-01");
    eventDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round((eventDate - today) / (1000 * 60 * 60 * 24));

    return {
      id: `${title}-${dateStr}-${organization}-${idx}`,
      type,
      title,
      description,
      date: dateStr || "Unknown Date",
      organization,
      daysLeft: isNaN(diffDays) ? -9999 : diffDays,
      time: null,
      link: null,
    };
  });
}


export default function AcademicTimeline() {
  // Filters and derived lists
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Events");
  const [selectedTime, setSelectedTime] = useState("All Time");
  const [reminderEvents, setReminderEvents] = useState(new Set());

  // SWR fetch (no fetching in useEffect)
  const {
    data: csvText,
    error,
    isLoading,
  } = useSWR(CSV_URL, fetchCSV, {
    revalidateOnFocus: false,
  });

  // Normalize + sort events when CSV loads
  const allEvents = useMemo(() => {
    if (!csvText) return [];
    const parsed = parseCsvToEvents(csvText);
    return parsed.sort((a, b) => a.daysLeft - b.daysLeft);
  }, [csvText]);

  // Apply filters
  const filteredEvents = useMemo(() => {
    let filtered = [...allEvents];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.organization.toLowerCase().includes(q)
      );
    }

    if (selectedType !== "All Events") {
      filtered = filtered.filter((e) => e.type === selectedType);
    }

    if (selectedTime !== "All Time") {
      filtered = filtered.filter((e) => {
        if (e.daysLeft < 0) return false;
        switch (selectedTime) {
          case "This Week":
            return e.daysLeft <= 7;
          case "This Month":
            return e.daysLeft <= 30;
          case "Next 3 Months":
            return e.daysLeft <= 90;
          case "Next 6 Months":
            return e.daysLeft <= 180;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [allEvents, searchTerm, selectedType, selectedTime]);

  const handleSetReminder = (event) => {
    const newReminders = new Set(reminderEvents);
    if (newReminders.has(event.id)) newReminders.delete(event.id);
    else newReminders.add(event.id);
    setReminderEvents(newReminders);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("All Events");
    setSelectedTime("All Time");
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-muted-foreground">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl">Loading academic timeline</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-600 bg-red-50 p-4">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-center">
          Could not load CSV data. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Academic Timeline
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Stay on top of important dates and deadlines pulled directly from
            your CSV. Track admission dates, scholarship deadlines, exam
            schedules, and never miss an opportunity.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              placeholder="Search events, organizations, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg bg-input border border-border rounded-md w-full"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="min-w-[200px] h-10 rounded-md border border-input bg-input px-3 py-2 text-sm"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All Events"
                    ? type
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="min-w-[200px] h-10 rounded-md border border-input bg-input px-3 py-2 text-sm"
            >
              {timeFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing {filteredEvents.length} event
            {filteredEvents.length !== 1 ? "s" : ""}
          </p>
          {(searchTerm ||
            selectedType !== "All Events" ||
            selectedTime !== "All Time") && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-9 px-3"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <TimelineEvent
              key={event.id}
              event={event}
              onSetReminder={handleSetReminder}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No events found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
