import React from 'react';
import { AutoComplete, Input, Button, Space } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

interface SearchState {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchFocused: boolean;
  setSearchFocused: (focused: boolean) => void;
}

interface AdvocateSearchBarProps {
  searchState: SearchState;
  popularSearches: Array<{ value: string; label: string }>;
  onSearch: () => void;
}

export default function AdvocateSearchBar({
  searchState,
  popularSearches,
  onSearch
}: AdvocateSearchBarProps) {
  const {
    searchTerm,
    setSearchTerm,
    searchFocused,
    setSearchFocused
  } = searchState;

  return (
    <div className="search-container">
      <Space.Compact
        style={{
          display: 'flex',
          width: '100%',
          position: 'relative',
          zIndex: searchFocused ? 1000 : 1
        }}
      >
        {/* Search - Name / Speciality Field */}
        <AutoComplete
          allowClear={{ clearIcon: <CloseOutlined /> }}
          options={searchFocused ? popularSearches : []}
          value={searchTerm}
          onChange={setSearchTerm}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          style={{
            flex: 1,
            height: '48px',
            display: 'flex',
            alignItems: 'stretch',
            boxShadow: 'rgba(0, 0, 0, 0.22) 0px 2px 18px 0px',
          }}
          classNames={{
            popup: {
              root: 'yelp-autocomplete-dropdown'
            }
          }}
          className="yelp-autocomplete-dropdown"
        >
          <Input
            placeholder="search by name, specialty, or location..."
            prefix={<SearchOutlined style={{ color: '#666' }} />}
            className={`search-container-input ${searchFocused ? 'focused' : ''}`}
            style={{
              background: '#fff !important',
              borderRadius: '8px 0 0 8px',
              height: '48px',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              borderTop: '1px solid rgba(240, 240, 240, 1)',
              borderBottom: '1px solid rgba(240, 240, 240, 1)',
              borderLeft: '1px solid rgba(240, 240, 240, 1)',
              borderRight: 'none',
              zIndex: searchFocused ? 1001 : 1
            }}
          />
        </AutoComplete>

        {/* Search button */}
        <Button
          className="custom-btn advocate-search-btn"
          icon={<SearchOutlined />}
          onClick={onSearch}
          style={{
            borderRadius: '0 8px 8px 0',
            paddingLeft: '20px',
            paddingRight: '20px',
            zIndex: 1,
            borderTop: 'none',
          }}
        >
          Search
        </Button>
      </Space.Compact>
    </div>
  );
}