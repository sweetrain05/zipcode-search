import { BsFillCircleFill } from "react-icons/bs";

export default function PageControlBtns({ page, nextPage }) {
    return (
        <div className="pageControl">
            <BsFillCircleFill
                size="13px"
                style={{
                    color: page ? "rgb(78, 78, 78)" : "rgb(131, 131, 131)",
                }}
                onClick={() => {
                    nextPage();
                }}
            />
            <BsFillCircleFill
                size="13px"
                style={{
                    color: page ? "rgb(131, 131, 131)" : "rgb(78, 78, 78)",
                }}
                onClick={() => {
                    nextPage();
                }}
            />
        </div>
    );
}
