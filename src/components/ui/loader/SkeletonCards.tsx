import { Card, Pagination } from "antd";

interface SkeletonCardsProps {
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function SkeletonCards({
  itemsPerPage,
  currentPage,
  onPageChange
}: SkeletonCardsProps) {
  const skeletonCardData = Array.from({ length: itemsPerPage }, (_, index) => index);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {skeletonCardData.map((index) => (
          <Card
            key={`skeleton-card-${index}`}
            style={{ width: 300, height: 200 }}
            loading={true}
          />
        ))}
      </div>

      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={0}
        onChange={onPageChange}
        showSizeChanger={false}
        disabled={true}
        style={{ textAlign: 'center', marginTop: '24px' }}
      />
    </>
  );
}