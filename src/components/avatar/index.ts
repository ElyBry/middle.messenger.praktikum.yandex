import Block from "../../core/Block.ts";

interface AvatarProps {
    img: string,
    alt?: string,
}

export default class Avatar extends Block {
    constructor(props: AvatarProps) {
        super({
            ...props,
            alt: props.alt || "Аватар",
        });
    }

    componentDidMount() {
        const imgElement = this.getContent() as HTMLImageElement;
        if (imgElement) {
            imgElement.addEventListener('error', () => {
                imgElement.src = 'public/img/icons/iconApp.webp';
            });
        }
    }

    render() {
        const imgSrc = this.props.img ? `https://ya-praktikum.tech/api/v2/resources${this.props.img}` : 'public/img/icons/iconApp.webp';
        return `<img id="avatar" src="${imgSrc}" alt="{{ alt }}" "/>`
    }
}
