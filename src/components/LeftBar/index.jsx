import React from 'react';
import styles from './leftBar.module.scss';

export default React.memo(function LeftBar({
  lists,
  setLists,
  data,
  changes,
  setChanges,
  isLoading,
}) {
  function addNewList() {
    if (lists.length === 0) {
      if (!isLoading) {
        setLists([
          {
            new: true,
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
        setChanges(!changes);
      }
    } else if (lists.length < 20) {
      if (!isLoading) {
        setLists([
          ...lists,
          {
            new: true,
            id: lists[lists.length - 1].id + 1,
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
        setChanges(!changes);
      }
    } else {
      alert('Достигнуто максимально возможное количество списков!');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.new}>
          <svg
            className={styles.svgBar}
            width="24"
            height="24"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 33C38.6274 33 44 27.6274 44 21C44 14.3726 38.6274 9 32 9C25.3726 9 20 14.3726 20 21C20 27.6274 25.3726 33 32 33ZM32 35C39.732 35 46 28.732 46 21C46 13.268 39.732 7 32 7C24.268 7 18 13.268 18 21C18 28.732 24.268 35 32 35Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M53.7809 40.6247L49.8416 45.5488C48.9923 46.6104 47.354 46.5335 46.6079 45.3969L44.164 41.6738L45.836 40.5762L48.2799 44.2994L52.2191 39.3753L53.7809 40.6247Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M57 42C57 46.4183 53.4183 50 49 50C44.5817 50 41 46.4183 41 42C41 37.5817 44.5817 34 49 34C53.4183 34 57 37.5817 57 42ZM51.6252 51.6519C50.7886 51.8789 49.9084 52 49 52C43.4772 52 39 47.5228 39 42C39 41.3699 39.0583 40.7534 39.1697 40.1556C38.4617 40.0531 37.7373 40 37 40H27C18.7157 40 12 46.7157 12 55H10C10 45.6112 17.6112 38 27 38H37C37.9319 38 38.847 38.0751 39.7392 38.2197C41.2302 34.571 44.8149 32 49 32C54.5228 32 59 36.4772 59 42C59 45.9006 56.7667 49.2797 53.509 50.9282C53.4504 50.6899 53.3868 50.4535 53.3183 50.2192L51.3987 50.7808C51.4826 51.0676 51.5582 51.3581 51.6252 51.6519C52.2825 51.4735 52.9129 51.2298 53.509 50.9282C53.83 52.2336 54 53.5976 54 55H52C52 53.8481 51.8703 52.7276 51.6252 51.6519Z"
            />
            <path d="M53.3183 50.2192L51.3987 50.7808C51.4826 51.0676 51.5582 51.3581 51.6252 51.6519C52.2825 51.4735 52.9129 51.2298 53.509 50.9282C53.4504 50.6899 53.3868 50.4535 53.3183 50.2192Z" />
          </svg>
          Новый сотрудник
        </div>
        <div className={styles.new} onClick={() => addNewList()}>
          <svg
            className={styles.svgBar}
            width="24"
            height="24"
            viewBox="0 0 58 58"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13C10 12.4477 10.4477 12 11 12H53C53.5523 12 54 12.4477 54 13C54 13.5523 53.5523 14 53 14H11C10.4477 14 10 13.5523 10 13Z" />
            <path d="M10 20C10 19.4477 10.4477 19 11 19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H11C10.4477 21 10 20.5523 10 20Z" />
            <path d="M48 21H20V19H48V21Z" />
            <path d="M10 28C10 27.4477 10.4477 27 11 27H15C15.5523 27 16 27.4477 16 28C16 28.5523 15.5523 29 15 29H11C10.4477 29 10 28.5523 10 28Z" />
            <path d="M48 29H20V27H48V29Z" />
            <path d="M10 35C10 34.4477 10.4477 34 11 34H15C15.5523 34 16 34.4477 16 35C16 35.5523 15.5523 36 15 36H11C10.4477 36 10 35.5523 10 35Z" />
            <path d="M48 36H20V34H48V36Z" />
            <path d="M10 43C10 42.4477 10.4477 42 11 42H15C15.5523 42 16 42.4477 16 43C16 43.5523 15.5523 44 15 44H11C10.4477 44 10 43.5523 10 43Z" />
            <path d="M48 44H20V42H48V44Z" />
            <path d="M10 50.5C10 49.9477 10.4477 49.5 11 49.5H53C53.5523 49.5 54 49.9477 54 50.5C54 51.0523 53.5523 51.5 53 51.5H11C10.4477 51.5 10 51.0523 10 50.5Z" />
          </svg>
          Новый список
        </div>
      </div>
    </div>
  );
});
