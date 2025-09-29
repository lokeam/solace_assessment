

import { Button } from 'antd';
import { IdcardOutlined, TableOutlined } from '@ant-design/icons';

interface ToggleViewButtonProps {
  viewMode: 'table' | 'cards';
  onViewChange: (mode: 'table' | 'cards') => void;
}

export default function ToggleViewButton({ viewMode, onViewChange }: ToggleViewButtonProps) {
  const handleViewToggle = () => {
    onViewChange(viewMode === 'table' ? 'cards' : 'table');
  };

  return (
    <Button
      className="custom-btn switch-view-btn"
      icon={viewMode === 'table' ? <IdcardOutlined /> : <TableOutlined />}
      onClick={handleViewToggle}
    >
    Switch to {viewMode === 'table' ? 'Card' : 'Table'} View
  </Button>
  )
}