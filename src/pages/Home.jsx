import React from 'react';
import Content from '../components/Content';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import styles from './home.module.scss';
import axios from 'axios';
import qs from 'qs';
import { useParams, useNavigate } from 'react-router-dom';

export default React.memo(function Home() {
  const [isLoading, setIsLoading] = React.useState(true);

  const { orderList } = useParams();

  const navigate = useNavigate();

  const [stringifyOrderList, setStringifyOrderList] = React.useState('');

  const [changes, setChanges] = React.useState(false);

  const [data, setData] = React.useState(null);

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

  async function getData() {
    await axios.get('https://62f503b3535c0c50e767cf0c.mockapi.io/api/v1/tasks').then((response) => {
      lists[0].listData = response.data;
      setData(response.data);
    });
  }

  function saveForURL() {
    let toSend = { a: [] };
    for (let i = 0; i < lists.length; i++) {
      let localList = [];
      for (let j = 0; j < lists[i].properties.length; j++) {
        if (lists[i].properties[j].show) {
          localList.push(lists[i].properties[j].id);
        }
      }
      toSend.a.push(localList);
    }
    setStringifyOrderList(qs.stringify(toSend));
    toSend.a.length = 0;
  }

  function byURL() {
    const bb = qs.parse(orderList);
    if (bb.a.length > lists.length) {
      while (bb.a.length !== lists.length) {
        let newId = lists.length + 1;
        lists.push({
          id: newId,
          listData: lists[0].listData,
          properties: [
            { id: 1, order: 1, show: true, appellation: 'id' },
            { id: 2, order: 2, show: true, appellation: 'name' },
            { id: 3, order: 3, show: true, appellation: 'sex' },
            { id: 4, order: 4, show: true, appellation: 'job' },
            { id: 5, order: 5, show: true, appellation: 'birthday' },
          ],
        });
      }
    }

    for (let i = 0; i < lists.length; i++) {
      let lastOrder = bb.a[i].length + 1;
      for (let j = 0; j < lists[i].properties.length; j++) {
        lists[i].properties[j].show = bb.a[i].includes(String(j + 1));
        if (bb.a[i].includes(String(j + 1))) {
          lists[i].properties[j].order = bb.a[i].indexOf(String(j + 1));
        } else {
          lists[i].properties[j].order = lastOrder;
          lastOrder += 1;
        }
      }
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    saveForURL();
    navigate(`/${stringifyOrderList}`);
  }, [changes, stringifyOrderList]);

  React.useEffect(() => {
    if (
      orderList === undefined ||
      orderList === 'a[0][0]=1&a[0][1]=2&a[0][2]=3&a[0][3]=4&a[0][4]=5'
    ) {
      getData().then(() => setIsLoading(false));
    } else {
      getData().then(() => byURL());
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header
        lists={lists}
        setLists={setLists}
        active={active}
        setActive={setActive}
        changes={changes}
        setChanges={setChanges}
        isLoading={isLoading}
      />
      <div className={styles.content}>
        <LeftBar
          lists={lists}
          setLists={setLists}
          data={data}
          changes={changes}
          setChanges={setChanges}
          isLoading={isLoading}
        />
        <Content
          lists={lists}
          active={active}
          setLists={setLists}
          isLoading={isLoading}
          changes={changes}
          setChanges={setChanges}
        />
      </div>
    </div>
  );
});
