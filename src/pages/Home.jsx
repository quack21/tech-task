import React from 'react';
import Content from '../components/Content';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import styles from './home.module.scss';
import data from '../assets/data.json';

function Home() {
  const [active, setActive] = React.useState(0);
  const [lists, setLists] = React.useState([
    {
      id: 1,
      listData: data,
      properties: [
        { id: 1, order: 1, show: true, appellation: 'id' },
        { id: 2, order: 2, show: true, appellation: 'name' },
        { id: 3, order: 3, show: true, appellation: 'sex' },
        { id: 4, order: 4, show: true, appellation: 'job' },
        { id: 5, order: 5, show: true, appellation: 'birthday' },
      ],
    },
  ]);

  return (
    <div className={styles.wrapper}>
      <Header lists={lists} setLists={setLists} active={active} setActive={setActive} />
      <div className={styles.content}>
        <LeftBar lists={lists} setLists={setLists} />
        <Content lists={lists} active={active} setLists={setLists} />
      </div>
    </div>
  );
}

export default Home;
