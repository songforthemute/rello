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
    padding: 10px 10px;
    background-color: ${(props) =>
        props.isDragging ? props.theme.accentColor : props.theme.cardColor};
    box-shadow: ${(props) =>
        props.isDragging ? props.theme.boxShadow : "none"};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RemoveButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 8px;
    text-align: center;
    padding: 0px;
    width: 25px;
    height: auto;
    background-color: transparent;
    font-size: 24px;
    color: red;
    transition: all 0.25s ease-in-out;
    &:hover,
    &:focus {
        color: black;
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

const DetailButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 8px;
    text-align: center;
    padding: 0px;
    width: 25px;
    height: auto;
    background-color: transparent;
    font-size: 24px;
    color: black;
    transition: all 0.25s ease-in-out;
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
            return { isShow: true, modal: data };
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
                        <DetailButton onClick={_onClickDetail}>
                            &equiv;
                        </DetailButton>
                        <RemoveButton onClick={_onClickRemove}>
                            &times;
                        </RemoveButton>
                    </span>
                </Card>
            )}
        </Draggable>
    );
};

export default React.memo(DraggableCard);
