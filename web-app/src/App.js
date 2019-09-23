import './App.scss';

import React from 'react';
import { Route } from 'react-router';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Home from './components/home';

export default function App() {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
    </Layout>
  );
}
