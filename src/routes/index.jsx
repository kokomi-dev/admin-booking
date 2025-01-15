import React from 'react';
import { Routes } from 'react-router-dom';
import { publicRoute } from './publicRoute';
import { privateRoute } from './privateRoute';

const RootRoute = () => {
  return (
    <Routes>
      {publicRoute}
      {privateRoute}
    </Routes>
  );
};

export default RootRoute;
