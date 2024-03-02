
interface Props {
    name: string,
    links: string,
}

export default function LinkNavigator ({links, name}: Props): JSX.Element {

    return <a rel="stylesheet" href={links}>{name}</a>
}