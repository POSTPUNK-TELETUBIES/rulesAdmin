import { Button } from '@mui/material';
import styles from './notfound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img
        src='error404.webp'
        className={styles.img}
        alt='imagen de un laptop mostrando el numero 404'
        loading='lazy'
      />
      <div className={styles.box}>
        <Button variant='contained'>Volver al inicio</Button>
      </div>
    </div>
  );
};
export default NotFound;
