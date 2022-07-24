import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { InterfaceToDo, InterfaceToDoState, toDoState } from "./atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    width: 300px;
    min-height: 300px;
    box-shadow: ${(props) => props.theme.boxShadow};
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 500;
    margin-bottom: 10px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Btn = styled.button<{ l: string; r: string }>`
    position: absolute;
    left: ${(props) => props.l};
    right: ${(props) => props.r};
    width: 28px;
    height: 28px;
    cursor: pointer;
    background-color: transparent;
    margin-left: 2.5px;
    margin-right: 2.5px;
    border: none;
    border-radius: 6px;
    text-align: center;
    padding: 4px;
    transition: box-shadow 0.25s ease-in-out;
    div {
        font-size: 20px;
        padding: auto;
    }
    &:hover {
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
`;

const Form = styled.form`
    width: 90%;
    margin: 0 auto;
`;

const Input = styled.input`
    width: 100%;
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
        width: 100%;
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

    const { register, setValue, handleSubmit } = useForm<InterfaceForm>();
    const { ref, ...rest } = register("toDo", { required: true });
    const setToDos = useSetRecoilState(toDoState);

    const titleInputRef = useRef<HTMLInputElement>(null);
    const toDoInputRef = useRef<HTMLInputElement | null>(null);

    const onValid = ({ toDo }: InterfaceForm) => {
        const newCard: InterfaceToDo = {
            id: Date.now(),
            payload: {
                title: toDo,
                description: "",
            },
        };

        setValue("toDo", "");
        setToDos((current) => {
            return { ...current, [boardId]: [...current[boardId], newCard] };
        });

        toDoInputRef.current!.type = "hidden";
    };

    const _onClickTitleInput = () => {
        if (titleInputRef.current!.type === "text") {
            titleInputRef.current!.type = "hidden";
        } else {
            toDoInputRef.current!.type = "hidden";
            titleInputRef.current!.type = "text";
            titleInputRef.current!.focus();
        }
    };

    const _onClickToDoInput = () => {
        if (toDoInputRef.current!.type === "text") {
            toDoInputRef.current!.type = "hidden";
        } else {
            titleInputRef.current!.type = "hidden";
            toDoInputRef.current!.type = "text";
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

        titleInputRef.current!.type = "hidden";
    };

    return (
        <Wrapper>
            <Title>
                <span>{boardId}</span>
                <Btn l="10px" r="initial" onClick={_onClickToDoInput}>
                    <div className="material-symbols-outlined">add</div>
                </Btn>
                <Btn l="initial" r="40px" onClick={_onClickTitleInput}>
                    <div className="material-symbols-outlined">edit</div>
                </Btn>
                <Btn l="initial" r="10px" onClick={_onClickRemoveBoard}>
                    <div className="material-symbols-outlined">close</div>
                </Btn>
            </Title>
            <Form onSubmit={_onSubmit}>
                <Input
                    ref={titleInputRef}
                    type="hidden"
                    placeholder="Enter a board title to replace."
                    onChange={_onChange}
                />
            </Form>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                    {...rest}
                    ref={(e) => {
                        ref(e);
                        toDoInputRef.current = e;
                    }}
                    type="hidden"
                    placeholder={`Add task on ${boardId}`}
                />
            </Form>
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
