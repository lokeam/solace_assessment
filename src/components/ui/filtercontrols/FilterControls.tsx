import React from 'react';
import { Form, Flex, Radio, Checkbox } from 'antd';

interface FilterControlsProps {
  experienceInYears: Array<{ label: string; value: string }>;
  credentials: Array<{ label: string; value: string }>;
  specialities: Array<{ label: string; value: string }>;
  layout?: 'vertical' | 'horizontal';

  // Add callbacks
  onCredentialsChange?: (values: string[]) => void;
  onSpecialtiesChange?: (values: string[]) => void;
  onExperienceChange?: (value: string) => void;

  // Current values
  selectedCredentials?: string[];
  selectedSpecialties?: string[];
  selectedExperience?: string;
}

export default function FilterControls({
  experienceInYears,
  credentials,
  specialities,
  layout = 'vertical',
  onCredentialsChange,
  onSpecialtiesChange,
  onExperienceChange,
  selectedCredentials = [],
  selectedSpecialties = [],
  selectedExperience = ''
}: FilterControlsProps) {
  return (
    <Form layout="vertical">
      <Form.Item
        name="experience"
        label="Years of Experience"
        style={{
          borderBottom: layout === 'vertical' ? '1px solid #d7a13b' : 'none',
          paddingBottom: layout === 'vertical' ? '25px' : '0'
        }}
      >
        <Flex vertical gap="middle">
          <Radio.Group
            block
            optionType="button"
            buttonStyle="solid"
            value={selectedExperience}
            onChange={(e) => onExperienceChange?.(e.target.value)}
          >
          <Radio.Button value="1-3">1-3</Radio.Button>
          <Radio.Button value="4-8">4-8</Radio.Button>
          <Radio.Button value="8+">8+</Radio.Button>
        </Radio.Group>
        </Flex>
      </Form.Item>

      <Form.Item
        name="credentials"
        label="Credentials"
        style={{
          borderBottom: layout === 'vertical' ? '1px solid #d7a13b' : 'none',
          paddingBottom: layout === 'vertical' ? '25px' : '0'
        }}
      >
        <Checkbox.Group
          style={{ flexDirection: 'column' }}
          value={selectedCredentials}
          onChange={(values) => onCredentialsChange?.(values)}
        >
          <Checkbox value="MD" style={{ marginBottom: '8px' }}>MD</Checkbox>
          <Checkbox value="MSW" style={{ marginBottom: '8px' }}>MSW</Checkbox>
          <Checkbox value="PhD" style={{ marginBottom: '8px' }}>PhD</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item name="specialities" label="Specialities">
        <Checkbox.Group
          options={specialities}
          style={{ flexDirection: 'column' }}
          value={selectedSpecialties}
          onChange={(values) => onSpecialtiesChange?.(values as string[])}
        />
      </Form.Item>
    </Form>
  );
}