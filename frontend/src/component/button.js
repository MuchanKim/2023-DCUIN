import "./button.css"

export default function Button(props) {
    const { text, onClick } = props;

    return (
        <button className="Button" onClick={onClick}>{text}</button>
    );
}