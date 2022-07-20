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
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        cursor: pointer;
        background-color: transparent;
        margin-left: 10px;
        border: none;
        border-radius: 20px;
        height: 25px;
        width: 25px;
        text-align: center;
        padding: auto;
        transition: box-shadow 0.35s ease-in-out;
        &:hover,
        &:focus {
            box-shadow: inset ${(props) => props.theme.boxShadow};
        }
    }
`;

interface InterfaceAreaProps {
    isDraggingOver: boolean; // 현재 잡힌 Draggable이 위치한 영역
    isDraggingFromThis: boolean; // Draggable이 떠난 소스 영역
}

const Area = styled.div<InterfaceAreaProps>`
    background-color: ${(props) =>
        props.isDraggingOver
            ? props.theme.accentColor
            : props.isDraggingFromThis
            ? "#828e9496"
            : "transparent"};
    flex-grow: 1;
    transition: background-color 0.25s ease-in-out;
    padding: 10px;
`;

const Form = styled.form`
    width: 260px;
    margin: 0 auto;
`;

const Input = styled.input`
    width: 50%;
    border: none;
    border-radius: 20px;
    padding: 10px 10px;
    transition: all 0.35s ease-in-out;
    &:focus,
    &:hover {
        width: 100%;
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

const TitleInput = styled.input`
    width: 50%;
    border: none;
    border-radius: 20px;
    padding: 10px 10px;
    transition: all 0.35s ease-in-out;
    margin: 0 auto;
    margin-bottom: 10px;
    &:focus,
    &:hover {
        width: 90%;
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
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<InterfaceForm>();
    const onValid = ({ toDo }: InterfaceForm) => {
        const newCard: InterfaceToDo = {
            id: Date.now(),
            payload: toDo,
        };

        setValue("toDo", "");
        setToDos((current) => {
            return { ...current, [boardId]: [...current[boardId], newCard] };
        });
    };
    const inputRef = useRef<HTMLInputElement>(null);
    const _onClick = () => {
        // inputRef.current!.style.width = "100%";
        if (inputRef.current!.type === "text")
            inputRef.current!.type = "hidden";
        else inputRef.current!.type = "text";
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
    };

    return (
        <Wrapper>
            <Title>
                <span>{boardId}</span>
                <button onClick={_onClick}>+</button>
            </Title>
            <Form onSubmit={_onSubmit}>
                <TitleInput
                    ref={inputRef}
                    type="hidden"
                    placeholder="Input change name."
                    onChange={_onChange}
                />
            </Form>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                    {...register("toDo", { required: true })}
                    type="text"
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
                                payload={toDo.payload}
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
