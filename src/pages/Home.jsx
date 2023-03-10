import React from 'react';
import Content from '../components/Content';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import styles from './home.module.scss';

function Home() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <LeftBar />
        <Content />
      </div>
    </div>
  );
}

export default Home;
