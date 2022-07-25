import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalState, toDoState } from "./atoms";

interface InterfaceCardProps {
    isDragging: boolean;
}

const Card = styled.div<InterfaceCardProps>`
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 10px;
    background-color: ${(props) =>
        props.isDragging ? props.theme.accentColor : props.theme.cardColor};
    box-shadow: ${(props) =>
        props.isDragging ? props.theme.boxShadow : "none"};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Btn = styled.button`
    width: 28px;
    height: 28px;
    padding: 4px;
    cursor: pointer;
    border: 0;
    border-radius: 6px;
    text-align: center;
    background-color: transparent;
    color: black;
    transition: all 0.25s ease-in-out;
    div {
        font-size: 20px;
        padding: auto;
    }
    &:hover,
    &:focus {
        color: ${(props) => props.theme.bgColor};
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

interface InterfaceDraggableCardProps {
    cardId: number;
    title: string;
    index: number;
    boardId: string;
}

/*
    ReactJS에서 컴포넌트의 상태가 변할 때,
    해당 컴포넌트의 모든 자식이 re-rendering 되는 현상 발생
    - 부모 상태가 변경되면, 자식 상태도 변경되는 ReactJS의 기본 원리
    - React.memo / useMemo로 해결 가능
    - React.memo는 ReactJS에 props가 바뀌지 않는다면 컴포넌트의 re-rendering 하지 않게함.
*/

const DraggableCard = ({
    title,
    cardId,
    index,
    boardId,
}: InterfaceDraggableCardProps) => {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const setDetailModal = useSetRecoilState(modalState);
    const _onClickRemove = () => {
        const ok = window.confirm(
            "Are you sure you want to remove this card?\nYou cannot reverse this card."
        );
        ok &&
            setToDos((current) => {
                const removed = current[boardId].filter(
                    (toDo) => toDo.id !== cardId
                );

                return { ...current, [boardId]: removed };
            });
    };

    const _onClickDetail = () => {
        setDetailModal(() => {
            const data = toDos[boardId].find((toDo) => toDo.id === cardId);
            return { isShow: true, boardId, modal: data };
        });
    };

    return (
        <Draggable draggableId={cardId.toString()} index={index}>
            {(provided, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <span>{title}</span>
                    <span>
                        <Btn onClick={_onClickDetail}>
                            <div className="material-symbols-outlined">
                                more_horiz
                            </div>
                        </Btn>
                        <Btn onClick={_onClickRemove}>
                            <div className="material-symbols-outlined">
                                close
                            </div>
                        </Btn>
                    </span>
                </Card>
            )}
        </Draggable>
    );
};

export default React.memo(DraggableCard);
