"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  ExternalLink,
  Clock,
  BookmarkPlus,
  LoaderCircle,
  AlertTriangle,
  Search,
} from "lucide-react";
import Papa from "papaparse";

// This is the individual card component, now included in the same file.
const ScholarshipCard = ({ scholarship }) => {
  const getUrgencyColor = (daysLeft) => {
    if (daysLeft <= 7) return "bg-red-100 text-red-800 border-red-200";
    if (daysLeft <= 30)
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getTypeColor = (type) => {
    const colors = {
      "Merit-based": "bg-blue-100 text-blue-800 border-blue-200",
      "Need-based": "bg-purple-100 text-purple-800 border-purple-200",
      Sports: "bg-orange-100 text-orange-800 border-orange-200",
      Minority: "bg-teal-100 text-teal-800 border-teal-200",
      Research: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="bg-card border border-border rounded-lg hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full border ${getTypeColor(
              scholarship.type
            )}`}
          >
            {scholarship.type}
          </span>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full border flex items-center ${getUrgencyColor(
              scholarship.daysLeft
            )}`}
          >
            <Clock className="h-3 w-3 mr-1" />
            {scholarship.daysLeft >= 0
              ? `${scholarship.daysLeft} days left`
              : "Ended"}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground text-balance">
          {scholarship.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          by {scholarship.provider}
        </p>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-semibold text-card-foreground">
              {scholarship.amount}
            </span>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Eligibility
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 pl-1">
              {scholarship.eligibility.map((criteria, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {criteria}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-muted-foreground text-pretty pt-2">
            {scholarship.description}
          </p>
        </div>

        <div className="flex space-x-2 pt-4 mt-auto">
          <a
            href={scholarship.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <button className="w-full h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </button>
          </a>
          <button className="h-10 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-input bg-transparent hover:bg-accent">
            <BookmarkPlus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// This is the main page component.
export default function ScholarshipDirectory() {
  const [scholarships, setScholarships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const CSV_URL =
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scholarships_500-TzmttsPGNyD2eKJmHgPmnDzrZMGakP.csv";
        const res = await fetch(CSV_URL);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const csvText = await res.text();
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        const processedData = (parsed.data || []).map((row, idx) => {
          const name = (row["Scholarship Name"] || "").trim();
          const provider = (row["Organization"] || "").trim();
          const type = (row["Type"] || "").trim();
          const amountRaw = (row["Amount per Year"] || "").trim();
          const amount =
            amountRaw.length > 1 ? amountRaw.substring(1) : amountRaw;
          const eligibilityStr = (row["Eligibility"] || "").trim();

          // Remove ? or ₹ or $ symbols globally before splitting
          const cleanedEligibilityStr = eligibilityStr.replace(/[?]/g, "");

          const eligibility = cleanedEligibilityStr
            ? cleanedEligibilityStr
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [];

          const daysLeftVal = Number.parseInt(
            String(row["Days Left"] ?? "").trim(),
            10
          );
          const daysLeft = Number.isFinite(daysLeftVal) ? daysLeftVal : -1;

          return {
            id: `${idx}-${name}-${provider}`,
            name: name || `Scholarship ${idx + 1}`,
            provider: provider || "Unknown",
            type: type || "Other",
            amount: amount || "",
            eligibility,
            description: eligibilityStr,
            link: "#",
            daysLeft,
          };
        });

        setScholarships(processedData);
      } catch (err) {
        console.error("Failed to fetch scholarships:", err);
        setError(
          "Could not load scholarships at this time. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const filteredScholarships = scholarships.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-muted-foreground">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl">Searching for the latest scholarships...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-600 bg-red-50 p-4">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Scholarship Directory
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover and apply for scholarships to fund your education. Powered
            by AI to bring you the latest opportunities.
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, provider, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 h-12 text-lg bg-input border border-border rounded-md"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>

        {filteredScholarships.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No scholarships found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
