'use client';

import React from 'react';
import { Button, Result } from 'antd';
import { ReloadOutlined, HomeOutlined } from '@ant-design/icons';
import { ErrorFallbackProps } from '@/components/error/ErrorBoundary';

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const handleGoHome = () => {
    window.location.href = '/';
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
        status="500"
        title="Something went wrong"
        subTitle="An unexpected error occurred. Please try refreshing the page or go back to the homepage."
        extra={[
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={resetErrorBoundary}
            key="retry"
          >
            Try Again
          </Button>,
          <Button
            icon={<HomeOutlined />}
            onClick={handleGoHome}
            key="home"
          >
            Go Home
          </Button>
        ]}
      >
        {process.env.NODE_ENV === 'development' && (
          <div style={{
            textAlign: 'left',
            backgroundColor: '#fff2f0',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '24px',
            border: '1px solid #ffccc7'
          }}>
            <h4 style={{ color: '#cf1322', marginBottom: '8px' }}>
              Development Error Details:
            </h4>
            <pre style={{
              fontSize: '12px',
              color: '#cf1322',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </div>
        )}
      </Result>
    </div>
  );
};