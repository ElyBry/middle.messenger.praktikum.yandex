import sussa from '../../public/img/gifs/errors/sussa.gif';
import styles from '../scss/errors.module.scss';

const Page500 =
    `
        <div class=${styles.errors}>
            <div class=${styles.left}>
                <h1>Ошибка 500</h1>
                <h3>Уже фиксим...</h3>
                <h2><a href="/signIn">Перейти на главную</a></h2>
            </div>
            <div class=${styles.right}>
                <img src=${sussa} alt="sussa"/>
            </div>
        </div>
    `


export default Page500;
