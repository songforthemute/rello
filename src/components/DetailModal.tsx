import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalState, toDoState } from "./atoms";

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
    background: linear-gradient(
        150deg,
        rgba(218, 223, 233, 1) 0%,
        rgba(220, 218, 233, 1) 100%
    );
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
    width: 40vw;
    min-height: 35vh;
    height: auto;
`;

const Btn = styled.button<{ r: string }>`
    position: absolute;
    top: 10px;
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

const Area = styled.div`
    margin: 20px;
    margin-top: 50px;
`;

const Title = styled.div`
    padding: 10px 20px;
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
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 6px;
    padding-left: 10px;
    font-style: italic;
`;

const Label = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    padding-left: 10px;
    font-style: italic;
`;

const Detail = styled.div`
    padding: 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

const TitleInput = styled.input`
    padding: 20px;
    width: 100%;
    border: 0;
    outline: 0;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardColor};
    margin-bottom: 20px;
    transition: all 0.25s ease-in-out;
    &:hover {
        box-shadow: inset ${(props) => props.theme.boxShadow};
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
    &:focus,
    &:active {
        border-bottom: 2px solid ${(props) => props.theme.bgColor};
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

const DetailsInput = styled.textarea`
    padding: 20px;
    width: 100%;
    border: 0;
    outline: 0;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardColor};
    margin-bottom: 20px;
    transition: all 0.25s ease-in-out;
    line-height: 1.65;
    font-weight: 400;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 13px;
    color: #252525;
    resize: vertical;
    &:hover {
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
    &:focus,
    &:active {
        border-bottom: 2px solid ${(props) => props.theme.bgColor};
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

interface InterfaceForm {
    title: string;
    details: string;
}

const DetailModal = () => {
    const [detailModal, setDetailModal] = useRecoilState(modalState);
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit } = useForm<InterfaceForm>();
    const [modifyMode, setModifyMode] = useState(false);

    const onValid = ({ title, details }: InterfaceForm) => {
        const updatedToDos = { id: Date.now(), payload: { title, details } };

        setToDos((current) => {
            const targetBoard = [...current[detailModal.boardId!]];
            const targetIndex = targetBoard.findIndex(
                (todo) => todo.id === detailModal.modal!.id
            );

            targetBoard.splice(targetIndex, 1, updatedToDos);

            return { ...current, [detailModal.boardId!]: targetBoard };
        });

        setDetailModal((current) => {
            return { ...current, modal: updatedToDos };
        });

        setModifyMode(false);
    };

    const _onClickModify = () => {
        setModifyMode(true);
    };

    const _onClickClose = () => {
        setDetailModal(() => {
            return { modal: undefined, boardId: undefined, isShow: false };
        });
    };

    const dateConverter = (date: number) => {
        const d = new Date(date);
        return d.toLocaleString("ko-KR");
    };

    return (
        <BackGround>
            <Modal>
                <Btn r={"10px"} onClick={_onClickClose} type="button">
                    <span className="material-symbols-outlined">close</span>
                </Btn>
                {!modifyMode && (
                    <Btn r={"50px"} onClick={_onClickModify} type="button">
                        <span className="material-symbols-outlined">
                            edit_note
                        </span>
                    </Btn>
                )}
                {modifyMode && (
                    <form onSubmit={handleSubmit(onValid)}>
                        <Btn r={"50px"} type="submit">
                            <span className="material-symbols-outlined">
                                check
                            </span>
                        </Btn>

                        <Area>
                            <Label htmlFor="title">Title</Label>
                            <TitleInput
                                id="title"
                                type="text"
                                placeholder="Title"
                                {...register("title", {
                                    value: detailModal.modal?.payload.title,
                                    required: "You should set the title.",
                                })}
                            />
                            <Label htmlFor="details">Details</Label>
                            <DetailsInput
                                id="details"
                                rows={10}
                                placeholder="Details"
                                {...register("details", {
                                    value: detailModal.modal?.payload.details,
                                })}
                            />
                        </Area>
                    </form>
                )}
                {!modifyMode && (
                    <Area>
                        <Subject>Title</Subject>
                        <Title>{detailModal.modal?.payload.title}</Title>

                        <Subject>Details</Subject>
                        <Detail>
                            {detailModal.modal?.payload.details || "empty"}
                        </Detail>
                        <Dated>
                            Last updated:{" "}
                            {dateConverter(detailModal.modal?.id!)}
                        </Dated>
                    </Area>
                )}
            </Modal>
        </BackGround>
    );
};

export default DetailModal;
