import { Card, Avatar, Tag } from 'antd';

export default function advocateCard({ advocate }: { advocate: any }) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: '12px',
        border: '1px solid #e8e8e8',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
      bodyStyle={{ padding: '20px' }}
    >
      {/* Header with Avatar and Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <Avatar
          size={80}
          src={`https://ui-avatars.com/api/?name=${advocate.firstName}+${advocate.lastName}&background=6B7280&color=fff&size=80`}
          style={{ border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          <Tag
            color="orange"
            style={{
              borderRadius: '18px',
              padding: '8px 14px',
              fontSize: '15px',
              fontWeight: '500',
              border: 'none'
            }}
          >
            {advocate.degree}
          </Tag>
          <Tag
            style={{
              borderRadius: '18px',
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: '500',
              backgroundColor: '#f0f9ff',
              color: '#0369a1',
              border: '1px solid #e0f2fe'
            }}
          >
            {(() => {
              if (!advocate.phoneNumber) return 'No phone';
              const cleanedNumber = advocate.phoneNumber.toString().replace(/\D/g, '');
              if (cleanedNumber.length === 10) {
                return `(${cleanedNumber.slice(0, 3)}) ${cleanedNumber.slice(3, 6)}-${cleanedNumber.slice(6)}`;
              }
              return advocate.phoneNumber;
            })()}
          </Tag>
        </div>
      </div>

      {/* Name */}
      <h3 style={{
        fontSize: '24px',
        fontWeight: '400',
        margin: '0 0 16px 0',
        color: '#1a1a1a',
        fontFamily: 'serif'
      }}>
        {advocate.firstName} {advocate.lastName.charAt(0)}.
      </h3>

      {/* Specialties */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '800',
          margin: '0 0 8px 0',
          color: '#374151',
        }}>
          Specialties:
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {advocate.specialties.slice(0, 2).map((specialty: string, index: number) => (
            <Tag
              key={index}
              style={{
                backgroundColor: '#3478661a',
                color: '#6b7280',
                border: 'none',
                borderRadius: '18px',
                fontSize: '15px',
                padding: '6px 12px'
              }}
            >
              {specialty}
            </Tag>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '800',
          margin: '0 0 8px 0',
          color: '#374151'
        }}>
          Experience:
        </h4>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: 0,
          lineHeight: '1.5'
        }}>
          {advocate.yearsOfExperience} years of experience
        </p>
      </div>
    </Card>
  );
}