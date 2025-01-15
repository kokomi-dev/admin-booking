import React from 'react';
import { Routes } from 'react-router-dom';
import { publicRoute } from './publicRoute';
import { privateRoute } from './privateRoute';
import AuthMiddleware from '../middleware/authMiddleware';

const RootRoute = () => {
  return (
    <AuthMiddleware>
      <Routes>
        {publicRoute}
        {privateRoute}
      </Routes>
    </AuthMiddleware>
  );
};

export default RootRoute;
