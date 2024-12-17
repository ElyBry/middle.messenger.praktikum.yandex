import sussa from '../../public/img/gifs/errors/sussa.gif';
import styles from '../scss/errors.module.scss';
import Block from "../core/Block.ts";
import {withRouter} from "../routing/WithRouter.ts";
import {Link} from "../components";
import {CONSTS} from "../CONSTS.ts";

class Page404 extends Block {
    init() {
        const LinkBack = new Link({
            text: "Перейти на главную",
            onClick: () => this.props.router.go(CONSTS.signIn),
        });

        this.children = {
            ...this.children,
            LinkBack,
        }
    }

    render() {
        return `
        <div class=${styles.errors}>
            <div class=${styles.left}>
                <h1>Ошибка 404</h1>
                <h3>Возможно вы ошиблись адресом...</h3>
                <h2>
                    {{{ LinkBack }}}
                </h2>
            </div>
            <div class=${styles.right}>
                <img src=${sussa} alt="sussa"/>
            </div>
        </div>
        `
    }
}

export default withRouter(Page404);
