import React from 'react';
import SittersPage from '../components/sitters-page';
import Header from '../components/header';

export default function Home(props) {
  return (
    <div>
      <Header />
      <SittersPage />
    </div>
  );
}
