import React from 'react';
import SittersPage from '../components/sitters-page';
import SitterProfile from '../components/sitter-profile';
import SitterForm from '../components/sitter-form';

export default function Home(props) {
  return (
    <>
    <div>
      <SittersPage />
      <SitterForm />
    </div>
    </>
  );
}
