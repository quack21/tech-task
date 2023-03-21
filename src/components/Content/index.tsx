import React from 'react';
import styles from './content.module.scss';

type IProperties = {
  id: number;
  order: number;
  show: boolean;
  appellation: string;
};

type ContentProps = {
  lists: {
    new?: boolean;
    id: number;
    listData: { birthday: string; id: string; sex: string; job: string; name: string }[];
    properties: { id: number; order: number; show: boolean; appellation: string }[];
  }[];
  active: number;
  isLoading: boolean;
  changes: boolean;
  setChanges: any;
  setLists: any;
};

const Content: React.FC<ContentProps> = ({
  lists,
  active,
  isLoading,
  changes,
  setChanges,
  setLists,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const [currentCard, setCurrentCard] = React.useState<IProperties>({
    id: 0,
    order: 0,
    show: false,
    appellation: '',
  });

  function chooseIcon(i: number) {
    lists[active].properties[i].show = !lists[active].properties[i].show;
    setChanges(!changes);
  }

  function dragStartHandler(card: IProperties) {
    if (card.show) {
      setCurrentCard(card);
    }
  }

  function dragEndHandler(e: any) {
    e.target.style.background = 'white';
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
    e.target.style.background = '#cfcfcf';
  }

  function dropHandler(e: any, card: IProperties) {
    e.target.style.background = 'white';
    e.preventDefault();
    if (card.show) {
      // @ts-ignore properties can't be undefined
      lists[active].properties = lists[active].properties.map((c) => {
        if (currentCard !== null) {
          if (c.id === card.id) {
            return { ...c, order: currentCard.order };
          }
          if (c.id === currentCard.id) {
            return { ...c, order: card.order };
          }
          return c;
        }
      });
    }
    setChanges(!changes);
  }

  const sortCards = (a: IProperties, b: IProperties) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className={styles.container}>
      {lists.length !== 0 ? (
        isLoading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : (
          <>
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
                <circle cx="256.5" cy="255.5" r="102.5" stroke="#333333" strokeWidth="24" />
              </svg>
              {open ? (
                <div className={styles.modalSettings}>
                  {lists[active].properties.sort(sortCards).map((value, i) => (
                    <div
                      className={styles.chooseContainer}
                      draggable={value.show ? true : false}
                      onDragStart={(e) => dragStartHandler(value)}
                      onDragLeave={(e) => dragEndHandler(e)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDragOver={(e) => dragOverHandler(e)}
                      onDrop={(e) => dropHandler(e, value)}>
                      <div className={styles.choose}>
                        {value.show === true ? (
                          <svg
                            className={styles.selectSVG}
                            onClick={() => chooseIcon(i)}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#1d80d1">
                            <path d="M18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 L18.25,3 Z M18.25,4.5 L5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 Z M10,14.4393398 L16.4696699,7.96966991 C16.7625631,7.6767767 17.2374369,7.6767767 17.5303301,7.96966991 C17.7965966,8.23593648 17.8208027,8.65260016 17.6029482,8.94621165 L17.5303301,9.03033009 L10.5303301,16.0303301 C10.2640635,16.2965966 9.84739984,16.3208027 9.55378835,16.1029482 L9.46966991,16.0303301 L6.46966991,13.0303301 C6.1767767,12.7374369 6.1767767,12.2625631 6.46966991,11.9696699 C6.73593648,11.7034034 7.15260016,11.6791973 7.44621165,11.8970518 L7.53033009,11.9696699 L10,14.4393398 L16.4696699,7.96966991 L10,14.4393398 Z"></path>
                          </svg>
                        ) : (
                          <svg
                            className={styles.selectSVG}
                            onClick={() => chooseIcon(i)}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#1d80d1">
                            <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path>
                          </svg>
                        )}

                        {value.appellation}
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
                {lists[active].properties.sort(sortCards).map((value) =>
                  value.show === true ? (
                    <div className={styles.tab}>
                      <div className={styles.value}>{value.appellation}</div>
                      <div className={styles.filter}>
                        <svg
                          className={styles.sortBtn}
                          width="20"
                          height="20"
                          viewBox="20 6 26 42"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 21C14 19.8954 14.8954 19 16 19H49C50.1046 19 51 19.8954 51 21V22C51 23.1046 50.1046 24 49 24H16C14.8954 24 14 23.1046 14 22V21ZM49 21H16V22H49V21ZM27 25.557L31.7209 30.4683C32.1037 30.8665 32.0912 31.4995 31.693 31.8822C31.2948 32.265 30.6618 32.2525 30.2791 31.8543L28 29.4833V45C28 45.5523 27.5523 46 27 46C26.4477 46 26 45.5523 26 45V29.4833L23.7209 31.8543C23.3382 32.2525 22.7052 32.265 22.307 31.8822C21.9088 31.4995 21.8963 30.8665 22.2791 30.4683L27 25.557ZM19 26C19.5523 26 20 26.4477 20 27V42.5167L22.2791 40.1457C22.6618 39.7475 23.2948 39.735 23.693 40.1178C24.0912 40.5005 24.1037 41.1335 23.7209 41.5317L19 46.443L14.2791 41.5317C13.8963 41.1335 13.9088 40.5005 14.307 40.1178C14.7052 39.735 15.3382 39.7475 15.7209 40.1457L18 42.5167V27C18 26.4477 18.4477 26 19 26ZM33 28C33 26.8954 33.8954 26 35 26H49C50.1046 26 51 26.8954 51 28V29C51 30.1046 50.1046 31 49 31H35C33.8954 31 33 30.1046 33 29V28ZM49 28H35V29H49V28ZM33 35C33 33.8954 33.8954 33 35 33H49C50.1046 33 51 33.8954 51 35V36C51 37.1046 50.1046 38 49 38H35C33.8954 38 33 37.1046 33 36V35ZM49 35H35V36H49V35ZM33 42C33 40.8954 33.8954 40 35 40H49C50.1046 40 51 40.8954 51 42V43C51 44.1046 50.1046 45 49 45H35C33.8954 45 33 44.1046 33 43V42ZM49 42H35V43H49V42Z" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    ''
                  ),
                )}
                <div className={styles.tabEdit}>
                  <div className={styles.valueEdit}>edit</div>
                </div>
              </div>
              {lists[active].listData.map((value) => (
                <>
                  <div className={styles.row}>
                    {lists[active].properties.sort(sortCards).map((prop) => (
                      <>
                        {prop.show === true ? (
                          <div className={styles.tab}>
                            <div className={styles.value}>
                              {value[prop.appellation as keyof typeof value]}
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                      </>
                    ))}
                    <div className={styles.tabEdit}>
                      <div className={styles.valueEdit}>
                        <svg
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
          </>
        )
      ) : (
        <div className={styles.createNewList}>Создайте новый список сотрудников</div>
      )}
    </div>
  );
};

export default Content;
