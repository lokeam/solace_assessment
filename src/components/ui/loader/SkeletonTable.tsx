import { Table, Skeleton } from "antd";

interface SkeletonTableProps {
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function SkeletonTable({
  itemsPerPage,
  currentPage,
  onPageChange
}: SkeletonTableProps) {
  const skeletonData = Array.from({ length: itemsPerPage }, (_, index) => ({
    key: `skeleton-${index}`,
    firstName: '',
    lastName: '',
    city: '',
    degree: ''
  }));

  const skeletonColumns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: () => <Skeleton.Input active size="small" style={{ width: 80 }} />
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: () => <Skeleton.Input active size="small" style={{ width: 100 }} />
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      render: () => <Skeleton.Input active size="small" style={{ width: 90 }} />
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
      render: () => <Skeleton.Input active size="small" style={{ width: 60 }} />
    },
  ];

  return (
    <Table
      dataSource={skeletonData}
      columns={skeletonColumns}
      rowKey="key"
      loading={false}
      pagination={{
        current: currentPage,
        pageSize: itemsPerPage,
        total: 0,
        onChange: onPageChange,
        disabled: true
      }}
    />
  );
}