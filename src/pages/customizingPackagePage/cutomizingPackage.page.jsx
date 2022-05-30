import React from 'react';
import { Typography, Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import AdvancedSearchForm from '../../components/customizePackageForm/customizePackageForm.component';
import { useHistory } from 'react-router-dom';

const CustomizingPackage = () => {
  const location = useLocation();
  const { pack } = location.state;
  const history = useHistory();
  return (
    <div style={{ paddingTop: '6rem' }}>
      <Breadcrumb style={{ margin: '16px 0' }} separator={'>'}>
        <Breadcrumb.Item
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/packages')}
        >
          Ocassions
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          {pack.title}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={3} style={{ fontWeight: 'bold' }}>
        {' '}
        {pack.title}{' '}
      </Typography.Title>
      <div>
        <AdvancedSearchForm />
      </div>
    </div>
  );
};

export default CustomizingPackage;
