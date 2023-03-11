{
  lists[active].properties.sort(sortCards).map((prop) => {
    <>
      {prop.show === true ? (
        prop.order === 1 ? (
          <div className={styles.tab}>
            <div className={styles.value}>{value[prop.appellation]}</div>
          </div>
        ) : prop.order === 2 ? (
          <div className={styles.tab}>
            <div className={styles.value}>{value[prop.appellation]}</div>
          </div>
        ) : prop.order === 3 ? (
          <div className={styles.tab}>
            <div className={styles.value}>{value[prop.appellation]}</div>
          </div>
        ) : prop.order === 4 ? (
          <div className={styles.tab}>
            <div className={styles.value}>{value[prop.appellation]}</div>
          </div>
        ) : (
          <div className={styles.tab}>
            <div className={styles.value}>{value[prop.appellation]}</div>
          </div>
        )
      ) : (
        '123'
      )}
      ;
    </>;
  });
}
