"use client";

import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', backgroundImage: 'linear-gradient(#fff 33%, #e9f0ee)' }}>
      {/* App Header */}
      <header className="header-container">Solace</header>

      {/* Hero */}
      <div className="hero-container">
        <h1 className="solace-title">Let&apos;s Find Your Advocate</h1>
      </div>

      {/* Search Bar*/}
      <div className="search-container">
        <input className="search-input" type="text" placeholder="Search" />
      </div>

      {/* Main Content - Search Results */}
      <div className="main-content-container">
        {/* Desktop Filters Sidebar */}
        <aside className="desktop-search-filters-container">
          Lots of radio btns and checkboxes
          <form>
            <button type="submit">Search</button>
          </form>
        </aside>

        {/* Main Content - Search Results */}
        <main className="search-results-container">
          {/* Dynamic active filters summary */}
          <h1>Advocates results</h1>
          <p>Showing results for:</p>

          {/* Mobile Filters */}
          <div className="search-filters-wrapper">
            <div className="mobile-search-filters-container">
              {/* Filter for Credentials*/}
              <select>
                <option value="">Select a filter</option>
              </select>

              {/* Filter for Experience*/}
              <select>
                <option value="">Select a filter</option>
              </select>

              <button>Reset Search</button>
              <button>Change View Mode - Table / Card</button>
            </div>

            {/* Results Table -- Multiple Views? */}
            <div className="result-table-container">
              {/* If loading show skeleton */}

              {/* Table View */}

              {/* Card Grid View */}
                {/* Card Grid Probably Needs Pagination */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
