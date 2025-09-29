"use client";

import { useState } from "react";

// Components
import AppHeader from "@/components/ui/header/AppHeader";
import AdvocateSearchHero from "@/components/ui/hero/AdvocateSearchHero";
import LoadingIcon from "@/components/ui/loader/LoadingIcon";
import AdvocateSearchInput from "@/components/ui/searchbar/AdvocateSearchInput";
import DesktopSidebar from "@/components/layout/sidebar/DesktopSidebar";
import CheckboxDropdownSelect from "@/components/ui/customdropdowns/CheckboxDropdownSelect";
import ToggleViewButton from "@/components/ui/buttons/ToggleViewButton";
import AdvocateCard from "@/components/ui/cards/AdvocateCard";
import SkeletonCards from "@/components/ui/loader/SkeletonCards";
import SkeletonTable from "@/components/ui/loader/SkeletonTable";

// Ant Design Components
import { Table, Tag, Input, Select, Button, Pagination } from "antd";
import { UndoOutlined } from "@ant-design/icons";

// Hooks
import { useGetAdvocates } from "@/hooks/useGetAdvocates";
import { useAdvocateFilters } from "@/hooks/useAdvocateFilters";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Constants
import { CREDENTIALS_OPTIONS, EXPERIENCE_OPTIONS, SPECIALTIES_OPTIONS } from '@/constants/filterOptions';

export default function Home() {
  const {
    searchTerm, setSearchTerm,
    selectedCredentials, setSelectedCredentials,
    selectedSpecialties, setSelectedSpecialties,
    selectedExperience, setSelectedExperience,
    resetAllFilters,
    activeFiltersText
  } = useAdvocateFilters();

  // Pagination State
  const [currentPage, setCurrentPage] = useLocalStorage<number>('advocateCurrentPage', 1);
  const [itemsPerPage] = useState(15);

  // View mode saved in localStorage
  const [viewMode, setViewMode] = useLocalStorage<'table' | 'cards'>('advocateViewMode', 'table');

  // Initial data grabbed from API handled by getAdvocates hook
  const { advocates, loading, error } = useGetAdvocates({
    searchTerm,
    selectedCredentials,
    selectedSpecialties,
    selectedExperience: selectedExperience || undefined
  });

  // Computed pagination values
  const cardViewStartIndex = (currentPage - 1) * itemsPerPage;
  const cardViewEndIndex = cardViewStartIndex + itemsPerPage;
  const cardViewPageRange = advocates.slice(cardViewStartIndex, cardViewEndIndex);

  // Loading and error states
  if (loading) return <LoadingIcon />;
  if (error) return <div>Error: {error.message}</div>;

  // Build table columns
  const tableColumns = [
    { title: 'Name', dataIndex: 'firstName', key: 'name' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Degree', dataIndex: 'degree', key: 'degree', width: 70, render: (degree: string) => <Tag color="orange" style={{ color: '#1d4339', fontSize: '13px' }}>{degree}</Tag> },
    { title: 'Experience', dataIndex: 'yearsOfExperience', key: 'yearsOfExperience', width: 90, render: (years: number) => `${years} years` },
    {
      title: 'Specialties',
      dataIndex: 'specialties',
      key: 'specialties',
      render: (specialties: string[]) => (
        <div>
          {specialties.slice(0, 3).map((specialty, index) => (
            <Tag key={index} style={{ marginBottom: '4px', fontSize: '14px', backgroundColor: '#3478661a', color: '#1d4339' }}>
              {specialty}
            </Tag>
          ))}
          {specialties.length > 3 && (
            <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
              +{specialties.length - 3} more
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 0,
      render: (phone: string) => {
        if (!phone) return '-';
        const cleanedNumber = phone.replace(/\D/g, '');
        if (cleanedNumber.length === 10) {
          return `(${cleanedNumber.slice(0, 3)}) ${cleanedNumber.slice(3, 6)}-${cleanedNumber.slice(6)}`;
        }
        return phone;
      },
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', backgroundImage: 'linear-gradient(#fff 33%, #e9f0ee)' }}>
      {/* App Header */}
      <AppHeader />

      {/* Hero */}
      <AdvocateSearchHero />

      {/* Search Bar*/}
      <AdvocateSearchInput
        searchState={{
          searchTerm,
          setSearchTerm,
          searchFocused: false, // Don't need focus state yet
          setSearchFocused: () => {} // Empty function
        }}
        popularSearches={[]} // Empty for now
        onSearch={() => {}} // Empty - search happens automatically
      />

      {/* Main Content - Search Results */}
      <div className="main-content-container">
        {/* Desktop Filters Sidebar */}
        <DesktopSidebar
          // Filter options data
          experienceInYears={EXPERIENCE_OPTIONS}
          credentials={CREDENTIALS_OPTIONS}
          specialities={SPECIALTIES_OPTIONS}
          // Filter state
          selectedCredentials={selectedCredentials}
          selectedSpecialties={selectedSpecialties}
          selectedExperience={selectedExperience}
          // Filter callbacks
          onCredentialsChange={setSelectedCredentials}
          onSpecialtiesChange={setSelectedSpecialties}
          onExperienceChange={setSelectedExperience}
        />

        {/* Main Content - Search Results */}
        <main className="search-results-container">
          {/* Dynamic active filters summary */}
          <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 16px 0' }}>Advocates ({advocates.length} results)</h1>
          {/* Dynamic active filters summary */}
          {activeFiltersText && (
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              margin: '0 0 20px 0',
              fontStyle: 'italic'
            }}>
              {activeFiltersText}
            </p>
          )}

          {/* Mobile Filters */}
          <div className="search-filters-wrapper" style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div className="mobile-search-filters-container">
              <CheckboxDropdownSelect
                options={CREDENTIALS_OPTIONS}
                value={selectedCredentials}
                placeholder="Credentials"
                onChange={setSelectedCredentials}
              />
              <Select
                className="custom-multi-element-selector"
                placeholder="Experience in years"
                value={selectedExperience || undefined}
                onChange={setSelectedExperience}
                allowClear
                style={{ height: '40px' }}
              >
                {EXPERIENCE_OPTIONS.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <Button
              className="custom-btn reset-search-btn"
              icon={<UndoOutlined />}
              onClick={resetAllFilters}
            >
              Reset Search
            </Button>
            <ToggleViewButton viewMode={viewMode} onViewChange={setViewMode} />
          </div>

            {/* Results Table -- Multiple Views? */}
            <div className="result-table-container">
              { loading ? (
              // Loading states for either table or card view
              viewMode === 'table' ? (
                <SkeletonTable
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              ) : (
                <SkeletonCards
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              )) : (
                // Show data associated with view mode
                viewMode === 'table' ? (
                  <Table
                    dataSource={advocates || []}
                    columns={tableColumns}
                    rowKey="id"
                    pagination={{
                      current: currentPage,
                      pageSize: itemsPerPage,
                      total: advocates.length,
                      onChange: setCurrentPage
                    }}
                  />
                ) : (
                  <>
                    <div className="advocates-grid">
                      {cardViewPageRange.map((advocate, index) => (
                        <AdvocateCard key={`${index}-${advocate?.firstName}-${advocate?.lastName}`} advocate={advocate} />
                      ))}
                    </div>

                    {/* Advocate Cards also need pagination */}
                    <Pagination
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={advocates.length}
                      onChange={setCurrentPage}
                      showSizeChanger={false}
                      style={{ textAlign: 'center', marginTop: '24px' }}
                    />
                  </>
                )
              )}
          </div>
        </main>
      </div>
    </div>
  );
}
