import React from 'react';
import styles from './content.module.scss';
import data from '../../assets/data.json';

function Content() {
  const [open, setOpen] = React.useState(false);

  const [currentCard, setCurrentCard] = React.useState(null);

  const [categories, setCategories] = React.useState([
    { appellation: 'id', property: true, order: 1, id: 1 },
    { appellation: 'name', property: true, order: 2, id: 2 },
    { appellation: 'sex', property: true, order: 3, id: 3 },
    { appellation: 'job', property: true, order: 4, id: 4 },
    { appellation: 'birthday', property: true, order: 5, id: 5 },
  ]);


  function chooseTabs(i) {
    categories[i].property = !categories[i].property;
    setOpen(false);
  }

  function dragStartHandler(e, card) {
    if (card.property) {
      setCurrentCard(card);
    }
  }

  function dragEndHandler(e) {
    e.target.style.background = 'white';
  }

  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background = 'lightgrey';
  }

  function dropHandler(e, card) {
    e.target.style.background = 'white';
    if (card.property) {
      e.preventDefault();
      setCategories(
        categories.map((c) => {
          if (c.id === card.id) {
            return { ...c, order: currentCard.order };
          }
          if (c.id === currentCard.id) {
            return { ...c, order: card.order };
          }
          return c;
        }),
      );
    }
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.settings}>
        <svg
          className={styles.settingsBtn}
          onClick={() => setOpen(!open)}
          width="32"
          height="32"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M294 66H218C211.373 66 206 71.3726 206 78V106.319C206 117.01 193.074 122.364 185.515 114.804L165.49 94.7797C160.804 90.0934 153.206 90.0934 148.52 94.7797L94.7797 148.52C90.0934 153.206 90.0934 160.804 94.7797 165.49L114.804 185.515C122.364 193.074 117.01 206 106.319 206H78C71.3726 206 66 211.373 66 218V294C66 300.627 71.3726 306 78 306H106.319C117.01 306 122.364 318.926 114.804 326.485L94.7797 346.51C90.0934 351.196 90.0934 358.794 94.7797 363.48L148.52 417.22C153.206 421.907 160.804 421.907 165.49 417.22L185.515 397.196C193.074 389.636 206 394.99 206 405.681V434C206 440.627 211.373 446 218 446H294C300.627 446 306 440.627 306 434V405.681C306 394.99 318.926 389.636 326.485 397.196L346.51 417.22C351.196 421.907 358.794 421.907 363.48 417.22L417.22 363.48C421.907 358.794 421.907 351.196 417.22 346.51L397.196 326.485C389.636 318.926 394.99 306 405.681 306H434C440.627 306 446 300.627 446 294V218C446 211.373 440.627 206 434 206H405.681C394.99 206 389.636 193.074 397.196 185.515L417.22 165.49C421.907 160.804 421.907 153.206 417.22 148.52L363.48 94.7797C358.794 90.0934 351.196 90.0934 346.51 94.7797L326.485 114.804C318.926 122.364 306 117.01 306 106.319V78C306 71.3726 300.627 66 294 66Z" />
          <circle cx="256.5" cy="255.5" r="102.5" stroke="black" stroke-width="24" />
        </svg>
        {open ? (
          <div className={styles.modalSettings}>
            {categories.sort(sortCards).map((value, i) => (
              <div
                className={styles.chooseContainer}
                key={value.appellation + 'o'}
                draggable={value.property ? true : false}
                onDragStart={(e) => dragStartHandler(e, value)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, value)}>
                <div key={value.appellation + 'p'} className={styles.choose}>
                  <svg
                    onClick={() => chooseTabs(i)}
                    key={value.appellation + 'q'}
                    className={styles.selectSVG}
                    width="20"
                    height="20"
                    viewBox="0 -6 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M31.4517 11.3659C31.8429 10.7366 32.7589 10.7366 33.1501 11.3659L40.2946 22.8568C40.4323 23.0782 40.651 23.2371 40.9041 23.2996L54.0403 26.5435C54.7598 26.7212 55.0428 27.5923 54.5652 28.1589L45.8445 38.5045C45.6764 38.7039 45.5929 38.961 45.6117 39.221L46.5858 52.7168C46.6392 53.4559 45.8982 53.9942 45.2117 53.7151L32.6776 48.6182C32.4361 48.52 32.1657 48.52 31.9242 48.6182L19.39 53.7151C18.7036 53.9942 17.9626 53.4559 18.016 52.7168L18.9901 39.221C19.0089 38.961 18.9253 38.7039 18.7573 38.5045L10.0366 28.1589C9.559 27.5923 9.84204 26.7212 10.5615 26.5435L23.6977 23.2996C23.9508 23.2371 24.1695 23.0782 24.3072 22.8568L31.4517 11.3659Z"
                      fill={categories[i].property === true ? 'yellow' : 'white'}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M30.6024 10.8379C31.385 9.57926 33.2168 9.57926 33.9994 10.8379L41.1438 22.3288L54.2801 25.5727C55.7189 25.928 56.285 27.6702 55.3298 28.8034L46.6091 39.149L47.5832 52.6448C47.6899 54.123 46.208 55.1997 44.8351 54.6414L32.3009 49.5445L19.7667 54.6414C18.3938 55.1997 16.9118 54.123 17.0185 52.6448L17.9927 39.149L9.272 28.8034C8.3168 27.6702 8.88287 25.928 10.3217 25.5727L23.4579 22.3288L30.6024 10.8379ZM39.4454 23.3848L32.3009 11.8939L25.1564 23.3848C24.8811 23.8276 24.4437 24.1454 23.9374 24.2704L10.8012 27.5144L19.5219 37.86C19.858 38.2587 20.0251 38.7729 19.9875 39.293L19.0134 52.7888L31.5475 47.6919C32.0306 47.4954 32.5712 47.4954 33.0543 47.6919L45.5884 52.7888L44.6143 39.293C44.5767 38.7729 44.7438 38.2587 45.0799 37.86L53.8006 27.5144L40.6643 24.2704C40.1581 24.1454 39.7207 23.8276 39.4454 23.3848Z"
                      fill="black"
                    />
                  </svg>
                  {categories[i].appellation}
                </div>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          {categories.sort(sortCards).map((value, i) =>
            categories[i].property === true ? (
              <div className={styles.tab} key={value.appellation + 'n'}>
                <div className={styles.value} key={value.appellation + 'm'}>
                  {value.appellation}
                </div>
                <div className={styles.filter} key={value.appellation + 'l'}>
                  <svg
                    key={value.appellation + 'r'}
                    className={styles.sortBtn}
                    width="20"
                    height="20"
                    viewBox="20 6 26 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14 21C14 19.8954 14.8954 19 16 19H49C50.1046 19 51 19.8954 51 21V22C51 23.1046 50.1046 24 49 24H16C14.8954 24 14 23.1046 14 22V21ZM49 21H16V22H49V21ZM27 25.557L31.7209 30.4683C32.1037 30.8665 32.0912 31.4995 31.693 31.8822C31.2948 32.265 30.6618 32.2525 30.2791 31.8543L28 29.4833V45C28 45.5523 27.5523 46 27 46C26.4477 46 26 45.5523 26 45V29.4833L23.7209 31.8543C23.3382 32.2525 22.7052 32.265 22.307 31.8822C21.9088 31.4995 21.8963 30.8665 22.2791 30.4683L27 25.557ZM19 26C19.5523 26 20 26.4477 20 27V42.5167L22.2791 40.1457C22.6618 39.7475 23.2948 39.735 23.693 40.1178C24.0912 40.5005 24.1037 41.1335 23.7209 41.5317L19 46.443L14.2791 41.5317C13.8963 41.1335 13.9088 40.5005 14.307 40.1178C14.7052 39.735 15.3382 39.7475 15.7209 40.1457L18 42.5167V27C18 26.4477 18.4477 26 19 26ZM33 28C33 26.8954 33.8954 26 35 26H49C50.1046 26 51 26.8954 51 28V29C51 30.1046 50.1046 31 49 31H35C33.8954 31 33 30.1046 33 29V28ZM49 28H35V29H49V28ZM33 35C33 33.8954 33.8954 33 35 33H49C50.1046 33 51 33.8954 51 35V36C51 37.1046 50.1046 38 49 38H35C33.8954 38 33 37.1046 33 36V35ZM49 35H35V36H49V35ZM33 42C33 40.8954 33.8954 40 35 40H49C50.1046 40 51 40.8954 51 42V43C51 44.1046 50.1046 45 49 45H35C33.8954 45 33 44.1046 33 43V42ZM49 42H35V43H49V42Z"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              ''
            ),
          )}
          <div className={styles.tab}>
            <div className={styles.value}>edit</div>
            <div className={styles.filter}></div>
          </div>
        </div>
        {Array.from(data)
          .reverse()
          .map((value) => (
            <>
              <div className={styles.row} key={value.appellation + 'a'}>
                {categories[0].property === true ? (
                  <div className={styles.tab} key={value.appellation + 'b'}>
                    <div className={styles.value} key={value.appellation + 'c'}>
                      {value[categories[0].appellation]}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {categories[1].property === true ? (
                  <div className={styles.tab} key={value.appellation + 'd'}>
                    <div className={styles.value} key={value.appellation + 'e'}>
                      {value[categories[1].appellation]}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {categories[2].property === true ? (
                  <div className={styles.tab} key={value.appellation + 'f'}>
                    <div className={styles.value} key={value.appellation + 'g'}>
                      {value[categories[2].appellation]}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {categories[3].property === true ? (
                  <div className={styles.tab} key={value.appellation + 'h'}>
                    <div className={styles.value} key={value.appellation + 'i'}>
                      {value[categories[3].appellation]}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {categories[4].property === true ? (
                  <div className={styles.tab} key={value.appellation + 'j'}>
                    <div className={styles.value} key={value.appellation + 'k'}>
                      {value[categories[4].appellation]}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                <div className={styles.tab} key={value.appellation + 's'}>
                  <div className={styles.value} key={value.appellation + 't'}>
                    <svg
                      key={value.appellation + 'u'}
                      className={styles.editBtn}
                      width="24"
                      height="24"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M42.2531 16.1759L17.5043 40.9246M42.2531 16.1759L46.4957 11.9332C47.2767 11.1522 48.5431 11.1522 49.3241 11.9332L53.5668 16.1759C54.3478 16.9569 54.3478 18.2233 53.5668 19.0043L49.3241 23.2469M42.2531 16.1759L44.0208 17.9436M49.3241 23.2469L24.5754 47.9957M49.3241 23.2469L47.5564 21.4792M24.5754 47.9957L18.565 50.4706M24.5754 47.9957L22.8076 46.2279M17.5043 40.9246L15.0294 46.935M17.5043 40.9246L19.2721 42.6924M18.565 50.4706L12.5546 52.9454L15.0294 46.935M18.565 50.4706V50.4706C18.3583 48.6103 16.8897 47.1417 15.0294 46.935V46.935M44.0208 17.9436L45.7886 19.7114L47.5564 21.4792M44.0208 17.9436L19.2721 42.6924M47.5564 21.4792L22.8076 46.2279M22.8076 46.2279L19.2721 42.6924" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
      <div className={styles.pagination}>
        <button>Left</button>
        <div className={styles.count}>Page 0 of 10</div>
        <button>Right</button>
      </div>
    </div>
  );
}

export default Content;
