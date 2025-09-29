'use client';

import React from 'react';
import { Button, Result } from 'antd';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleSearch = () => {
    window.location.href = '/?search=true';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <Result
        status="404"
        title="404 - Page Not Found"
        subTitle="Our apologies! The page you're looking for appears to have vanished."
        extra={[
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={handleGoHome}
            key="home"
          >
            Return Home
          </Button>
        ]}
      />
    </div>
  );
}