import React from 'react';
import styles from './header.module.scss';

// const list = [
//   '1',
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
//   '8',
//   '9',
//   '10',
//   '11',
//   '12',
//   '13',
//   '14',
//   '15',
//   '16',
//   '17',
//   '18',
//   '19',
//   '20',
// ];

const list = ['1', '2', '32'];

function Header() {
  const [active, setActive] = React.useState('');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.lists}>
          {list.map((value, i) => (
            <div
              className={active == i ? styles.activeList : styles.list}
              onClick={() => setActive(i)}>
              Список сотрудников {value}
              {active == i ? (
                <svg
                  className={styles.closeSVG}
                  onClick={() => {
                    /* удаляем значение массива */
                  }}
                  width="16"
                  height="16"
                  viewBox="9 18 46 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z"
                    fill="black"
                  />
                </svg>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
