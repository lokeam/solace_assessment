// Ant Design Components
import {
  Button,
  Form,
  Space,
  Flex,
  Checkbox,
  Radio,
} from 'antd';

// Ant Design Icons
import {
  ControlOutlined,
} from '@ant-design/icons';

import React from 'react';
import { Card, Typography } from 'antd';
import FilterControls from '@/components/ui/filtercontrols/FilterControls';

const { Title } = Typography;

interface DesktopSidebarProps {
  experienceInYears: Array<{ label: string; value: string }>;
  credentials: Array<{ label: string; value: string }>;
  specialities: Array<{ label: string; value: string }>;
  selectedCredentials: string[];
  selectedSpecialties: string[];
  selectedExperience: string;
  onCredentialsChange: (values: string[]) => void;
  onSpecialtiesChange: (values: string[]) => void;
  onExperienceChange: (value: string) => void;
}

const FILTER_OPTIONS = {
  credentials: [
    { label: 'MD', value: 'MD' },
    { label: 'MSW', value: 'MSW' },
    { label: 'PhD', value: 'PhD' }
  ],
  experienceInYears: [
    { label: '1 - 3', value: '1-3-years' },
    { label: '4 - 8', value: '4-8-years' },
    { label: '8+', value: '8-plus-years' }
  ],
  specialities: [
    { label: "Personal Growth", value: "Personal growth" },
    { label: "Substance Use/Abuse", value: "Substance use/abuse" },
    { label: "Pediatrics", value: "Pediatrics" },
    { label: "Women's Issues", value: "Women's issues (post-partum, infertility, family planning)" },
    { label: "Coaching & Wellness", value: "Coaching (leadership, career, academic and wellness)" },
    { label: "Life Coaching", value: "Life coaching" },
    { label: "OCD", value: "Obsessive-compulsive disorders" },
    { label: "ADHD Testing", value: "Neuropsychological evaluations & testing (ADHD testing)" },
    { label: "ADHD", value: "Attention and Hyperactivity (ADHD)" },
    { label: "Personality Disorders", value: "Personality disorders" },
    { label: "Chronic Pain", value: "Chronic pain" },
    { label: "Weight Loss & Nutrition", value: "Weight loss & nutrition" },
    { label: "Eating Disorders", value: "Eating disorders" },
    { label: "Diabetic Diet", value: "Diabetic Diet and nutrition" },
    { label: "Sleep Issues", value: "Sleep issues" },
    { label: "Schizophrenia", value: "Schizophrenia and psychotic disorders" },
    { label: "Medication/Prescribing", value: "Medication/Prescribing" },
    { label: "Suicide History", value: "Suicide History/Attempts" },
    { label: "General Mental Health", value: "General Mental Health (anxiety, depression, stress, grief, life transitions)" },
    { label: "Men's Issues", value: "Men's issues" },
    { label: "Relationship Issues", value: "Relationship Issues (family, friends, couple, etc)" },
    { label: "Trauma & PTSD", value: "Trauma & PTSD" },
  ]
};

export default function DesktopSidebar({
  experienceInYears,
  credentials,
  specialities,
  selectedCredentials,
  selectedSpecialties,
  selectedExperience,
  onCredentialsChange,
  onSpecialtiesChange,
  onExperienceChange
}: DesktopSidebarProps) {
  return (
    <aside className="desktop-search-filters-container">
      <Card
        title={<Title level={4} style={{ margin: 0 }}>Filters</Title>}
        style={{
          width: '300px',
          height: 'fit-content',
          position: 'sticky',
          top: '220px',
          border: '1px solid #d4e2dd',
        }}
      >
        <FilterControls
          experienceInYears={experienceInYears}
          credentials={credentials}
          specialities={specialities}
          layout="vertical"
          selectedCredentials={selectedCredentials}
          selectedSpecialties={selectedSpecialties}
          selectedExperience={selectedExperience}
          onCredentialsChange={onCredentialsChange}
          onSpecialtiesChange={onSpecialtiesChange}
          onExperienceChange={onExperienceChange}
        />
      </Card>
    </aside>

  );
}