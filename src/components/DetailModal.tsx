import { useRecoilState } from "recoil";
import styled from "styled-components";
import { modalState } from "./atoms";

const BackGround = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background-color: #60606096;
    width: 100%;
    height: 100%;
`;

const Modal = styled.div`
    position: relative;
    /* display: flex; */
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
    width: 60vw;
    height: auto;
`;

const Btn = styled.button<{ t: string; r: string }>`
    position: absolute;
    top: ${(props) => props.t};
    right: ${(props) => props.r};
    outline: none;
    border: 0;
    border-radius: 10px;
    width: 36px;
    height: 36px;
    padding: 5px;
    cursor: pointer;
    background-color: transparent;
    transition: all 0.35s ease-in-out;
    span {
        font-size: 26px;
        padding: auto;
    }
    &:hover,
    &:focus {
        color: ${(props) => props.theme.bgColor};
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

const Context = styled.div`
    margin: 20px;
    margin-top: 50px;
`;

const Title = styled.div`
    padding: 10px 40px 10px 20px;
    font-size: 24px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardColor};
    margin-bottom: 20px;
`;

const Dated = styled.div`
    padding: 20px 10px 10px 10px;
    font-style: italic;
`;

const Subject = styled.h2`
    position: relative;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 6px;
    padding-left: 10px;
    font-style: italic;
`;

const Detail = styled.div`
    padding: 20px;
    padding-right: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

const DetailModal = () => {
    const [detailModal, setDetailModal] = useRecoilState(modalState);

    const _onClickModify = () => {
        // turn to input field
    };

    const _onClickClose = () => {
        setDetailModal(() => {
            return { modal: undefined, isShow: false };
        });
    };

    const dateConverter = (date: number) => {
        const d = new Date(date);
        return d.toLocaleString("ko-KR");
    };

    return (
        <BackGround>
            <Modal>
                <Btn t={"10px"} r={"10px"} onClick={_onClickClose}>
                    <span className="material-symbols-outlined">close</span>
                </Btn>
                <Btn t={"10px"} r={"50px"} onClick={_onClickModify}>
                    <span className="material-symbols-outlined">edit_note</span>
                </Btn>
                <Context>
                    <Subject>Title</Subject>
                    <Title>{detailModal.modal?.payload.title}</Title>
                    {/* <Description>{detailModal.modal?.payload.description}</Description> */}
                    <Subject>Details</Subject>
                    <Detail>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quas accusamus modi, provident ducimus debitis, iure
                        aliquid autem magni laboriosam explicabo nesciunt!
                        Obcaecati dicta minus pariatur impedit repellendus nemo
                        deleniti. Delectus.
                    </Detail>
                    <Dated>{dateConverter(detailModal.modal?.id!)}</Dated>
                </Context>
            </Modal>
        </BackGround>
    );
};

export default DetailModal;
