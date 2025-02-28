import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';

import Loader from './common/Loader';
import { QueryClientProvider } from '@tanstack/react-query';
import DefaultLayout from './layout/DefaultLayout';
import RootRoute from './routes';
import { queryClient } from './configs/TantackQueryStore';
import { store } from './contexts/Redux/Store';
import { ConfigProvider } from 'antd';
function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const theme = {
    token: {
      fontFamily: "'Satoshi', sans-serif",
    },
  };
  return loading ? (
    <Loader />
  ) : (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <DefaultLayout>
            <RootRoute />
          </DefaultLayout>
        </QueryClientProvider>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
