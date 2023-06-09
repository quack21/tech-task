import React from 'react';
import styles from './header.module.scss';

type HeaderProps = {
  lists: {
    new?: boolean;
    id: number;
    listData: null | { birthday: string; id: string; sex: string; job: string; name: string }[];
    properties: {
      id: number;
      order: number;
      show: boolean;
      appellation: string;
    }[];
  }[];
  setLists: any;
  active: number;
  setActive: any;
  changes: boolean;
  setChanges: any;
  isLoading: boolean;
};

const Header: React.FC<HeaderProps> = ({
  lists,
  setLists,
  active,
  setActive,
  changes,
  setChanges,
  isLoading,
}) => {
  function closeTab(i: number) {
    lists.splice(i, 1);
    setLists([...lists]);
    setActive(0);
    setChanges(!changes);
  }

  function settingActive(i: number) {
    if (!isLoading) {
      setActive(i);
    }
  }

  React.useEffect(() => {
    for (let i in lists) {
      if (lists[i].hasOwnProperty('new') === true) {
        delete lists[i].new;
      }
    }
    setChanges(!changes);
  }, [active, setActive]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>Tablets</div>
        <div className={styles.lists}>
          {lists.map((value, i) => (
            <div
              className={
                active === i
                  ? styles.activeTabContainer
                  : value.hasOwnProperty('new') === true
                  ? styles.animatedShow
                  : styles.tabContainer
              }
              key={value.id + 'abc'}>
              <div
                key={value.id + 'ab'}
                className={active === i ? styles.activeList : styles.list}
                onClick={() => settingActive(i)}>
                Список сотрудников {value.id}
              </div>
              <svg
                key={value.id + 'ba'}
                className={active === i ? styles.closeActiveSVG : styles.closeSVG}
                onClick={() => closeTab(i)}
                width="16"
                height="16"
                viewBox="9 18 46 28"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
