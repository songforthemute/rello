import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { InterfaceToDo, InterfaceToDoState, toDoState } from "./atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
    position: relative;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    width: 20rem;
    min-height: 20rem;
    box-shadow: ${(props) => props.theme.boxShadow};
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1024px) {
        width: 18rem;
        min-height: 18rem;
    }
    @media screen and (max-width: 768px) {
        width: 15rem;
        min-height: 15rem;
    }
    @media screen and (max-width: 425px) {
        width: 12rem;
        min-height: 14rem;
    }
    @media screen and (max-width: 375px) {
        width: 10rem;
        min-height: 14rem;
    }
`;

const Title = styled.h2`
    /* text-align: center; */
    margin-left: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 20px;
    @media screen and (max-width: 768px) {
        font-size: 18px;
    }
    @media screen and (max-width: 425px) {
        font-size: 16px;
    }
`;

const ToggleBtn = styled.button<{ b?: string; l: string; r: string }>`
    position: absolute;
    bottom: ${(props) => props.b};
    left: ${(props) => props.l};
    right: ${(props) => props.r};
    width: 28px;
    height: 28px;
    cursor: pointer;
    background-color: ${(props) => `${props.theme.boardColor}90`};
    margin-left: 2px;
    margin-right: 2px;
    border: none;
    border-radius: 6px;
    text-align: center;
    padding: 5px;
    transition: all 0.25s ease-in-out;
    div {
        font-size: 20px;
        padding: auto;
    }
    &:hover {
        color: ${(props) => props.theme.bgColor};
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

const SubmitBtn = styled.button`
    top: 4px;
    right: 4px;
    position: absolute;
    border: none;
    border-radius: 25px;
    text-align: center;
    background-color: ${(props) => props.theme.boardColor};
    width: 28px;
    height: 28px;
    cursor: pointer;
    padding: 5px;
    transition: all 0.25s ease-in-out;
    div {
        font-size: 20px;
        padding: auto;
    }
    &:hover {
        background-color: ${(props) => props.theme.bgColor};
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

interface InterfaceAreaProps {
    isDraggingOver: boolean; // 현재 잡힌 Draggable이 위치한 영역
    isDraggingFromThis: boolean; // Draggable이 떠난 소스 영역
}

const Area = styled.div<InterfaceAreaProps>`
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#74b9ff"
            : props.isDraggingFromThis
            ? "#828e9496"
            : "transparent"};
    flex-grow: 1;
    transition: background-color 0.25s ease-in-out;
    padding: 10px;
    padding-bottom: 55px;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${(props) => `${props.theme.bgColor}95`};
        background-clip: padding-box;
        border: 2px solid transparent;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 10px;
    }

    @media screen and (max-width: 768px) {
        max-height: 20rem;
    }
    @media screen and (max-width: 425px) {
        max-height: 15rem;
    }
`;

const BoardTitleForm = styled.form<{ toggle: boolean }>`
    display: ${(props) => (props.toggle ? "initial" : "none")};
    width: 70%;
    margin: 0 auto;
    position: absolute;
    top: 10px;
    left: 10px;
    @media screen and (max-width: 768px) {
        width: 65%;
    }
    @media screen and (max-width: 425px) {
        width: 57%;
    }
    @media screen and (max-width: 375px) {
        width: 48%;
    }
`;

const ToDoForm = styled.form<{ toggle: boolean }>`
    display: ${(props) => (props.toggle ? "initial" : "none")};
    width: 80%;
    margin: 0 auto;
    position: absolute;
    bottom: 5px;
    right: 10px;
    @media screen and (max-width: 768px) {
        width: 75%;
    }
    @media screen and (max-width: 425px) {
        width: 70%;
    }
    @media screen and (max-width: 375px) {
        width: 65%;
    }
`;

const Input = styled.input`
    width: 100%;
    position: relative;
    border: none;
    outline: none;
    border-radius: 20px;
    padding: 10px;
    transition: all 0.35s ease-in-out;
    margin: 0 auto;
    margin-bottom: 10px;
    &:focus,
    &:hover,
    &:active {
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

interface InterfaceBoardProps {
    toDos: InterfaceToDo[];
    boardId: string;
}

interface InterfaceForm {
    toDo: string;
}

const Board = ({ toDos, boardId }: InterfaceBoardProps) => {
    const [newTitle, setNewTitle] = useState("");
    const [toggleTitleInput, setToggleTitleInput] = useState(false);
    const [toggleAddToDoInput, setToggleToDoInput] = useState(false);

    const { register, setValue, handleSubmit } = useForm<InterfaceForm>();
    const { ref: toDoRef, ...rest } = register("toDo", {
        required: "Enter to Do List.",
    });
    const setToDos = useSetRecoilState(toDoState);

    const titleInputRef = useRef<HTMLInputElement>(null);
    const toDoInputRef = useRef<HTMLInputElement | null>(null);

    const onValid = ({ toDo }: InterfaceForm) => {
        const newCard: InterfaceToDo = {
            id: Date.now(),
            payload: {
                title: toDo,
                details: "",
            },
        };

        setValue("toDo", "");
        setToDos((current) => {
            return { ...current, [boardId]: [...current[boardId], newCard] };
        });

        setToggleToDoInput(false);
    };

    const _onClickTitleInput = () => {
        setToggleTitleInput((prev) => !prev);
        if (!toggleTitleInput) {
            titleInputRef.current!.focus();
        }
    };

    const _onClickToDoInput = () => {
        setToggleToDoInput((prev) => !prev);
        if (toDoInputRef.current!.type === "text") {
            toDoInputRef.current!.focus();
        }
    };

    const _onClickRemoveBoard = () => {
        const ok = window.confirm(
            "Are you sure you want to remove this board?\nThe removed board cannot be reversed."
        );
        ok &&
            setToDos((current) => {
                const source = { ...current };
                delete source[boardId];

                return { ...source };
            });
    };

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setNewTitle(value);
    };

    const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setToDos((current) => {
            const copiedState = { ...current };
            const result: InterfaceToDoState = {};

            for (const b in copiedState) {
                if (b === boardId) {
                    result[newTitle] = copiedState[b];
                } else {
                    result[b] = copiedState[b];
                }
            }

            return result;
        });

        setToggleTitleInput(false);
    };

    return (
        <Wrapper>
            <Title>
                <span>{boardId}</span>
                <ToggleBtn
                    b="20px"
                    l="10px"
                    r="initial"
                    onClick={_onClickToDoInput}
                >
                    <div className="material-symbols-outlined">add</div>
                </ToggleBtn>
                <ToggleBtn l="initial" r="40px" onClick={_onClickTitleInput}>
                    <div className="material-symbols-outlined">edit</div>
                </ToggleBtn>
                <ToggleBtn l="initial" r="10px" onClick={_onClickRemoveBoard}>
                    <div className="material-symbols-outlined">close</div>
                </ToggleBtn>
            </Title>
            <BoardTitleForm onSubmit={_onSubmit} toggle={toggleTitleInput}>
                <Input
                    required
                    ref={titleInputRef}
                    type="text"
                    placeholder={boardId}
                    onChange={_onChange}
                />
                <SubmitBtn>
                    <div className="material-symbols-outlined">check</div>
                </SubmitBtn>
            </BoardTitleForm>
            <ToDoForm
                onSubmit={handleSubmit(onValid)}
                toggle={toggleAddToDoInput}
            >
                <Input
                    {...rest}
                    ref={(e) => {
                        toDoRef(e);
                        toDoInputRef.current = e;
                    }}
                    type="text"
                    placeholder={`Add task on ${boardId}`}
                />
                <SubmitBtn>
                    <div className="material-symbols-outlined">check</div>
                </SubmitBtn>
            </ToDoForm>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(
                            snapshot.draggingFromThisWith
                        )}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard
                                key={toDo.id}
                                title={toDo.payload.title}
                                cardId={toDo.id}
                                boardId={boardId}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
};

export default Board;
