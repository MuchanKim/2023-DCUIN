import "./header.css";

export default function Header(props) {
    const { leftChild, title } = props;
    return (
        <div className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_title">{title}</div>
        </div>
    );
}
