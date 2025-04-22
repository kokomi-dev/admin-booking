import React, { Suspense } from 'react';
import { Routes } from 'react-router-dom';
import { publicRoute } from './publicRoute';
import { privateRoute } from './privateRoute';
import Loader from '@/common/Loader';

const RootRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {publicRoute}
        {privateRoute}
      </Routes>
    </Suspense>
  );
};

export default RootRoute;
