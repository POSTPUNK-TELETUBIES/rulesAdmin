import { Button } from '@mui/material';
import styles from './notfound.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <LazyLoadImage
        src={'error404.webp'}
        className={styles.img}
        alt={'Fondo degradado'}
        effect='blur'
        width='100%'
        height='100%'
      />
      <div className={styles.box}>
        <h1 className={styles.title}>¡Ups! Esta página no existe</h1>
        <Link to='/'>
          <Button variant='contained' size='large'>
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
