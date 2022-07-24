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
    background-color: azure;
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
    width: 60vw;
    height: 60vh;
`;

const Btn = styled.button<{ space: string }>`
    position: absolute;
    top: 10px;
    right: ${(props) => props.space};
    outline: none;
    border: 0;
    border-radius: 5px;
    padding: 8px;
    cursor: pointer;
    background-color: transparent;
    &:hover {
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

const Context = styled.div`
    margin: 10px;
`;

const Title = styled.div`
    padding: 20px 10px;
    font-size: 20px;
    font-weight: 500;
`;

const Description = styled.div`
    padding: 10px;
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
                <Btn space={"40px"} onClick={_onClickModify}>
                    ✏️
                </Btn>
                <Btn space={"10px"} onClick={_onClickClose}>
                    ❌
                </Btn>
                <Context>
                    <Description>
                        {dateConverter(detailModal.modal?.id!)}
                    </Description>
                    <Title>{detailModal.modal?.payload.title}</Title>
                    {/* <Description>{detailModal.modal?.payload.description}</Description> */}
                    <Description>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quas accusamus modi, provident ducimus debitis, iure
                        aliquid autem magni laboriosam explicabo nesciunt!
                        Obcaecati dicta minus pariatur impedit repellendus nemo
                        deleniti. Delectus.
                    </Description>
                </Context>
            </Modal>
        </BackGround>
    );
};

export default DetailModal;
