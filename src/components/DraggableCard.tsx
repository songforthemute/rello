import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface InterfaceCardProps {
    isDragging: boolean;
}

const Card = styled.div<InterfaceCardProps>`
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) =>
        props.isDragging ? "#74b9ff" : props.theme.cardColor};
    box-shadow: ${(props) =>
        props.isDragging ? props.theme.boxShadow : "none"};
`;

interface InterfaceDraggableCardProps {
    cardId: number;
    payload: string;
    index: number;
}

/*
    ReactJS에서 컴포넌트의 상태가 변할 때,
    해당 컴포넌트의 모든 자식이 re-rendering 되는 현상 발생
    - 부모 상태가 변경되면, 자식 상태도 변경되는 ReactJS의 기본 원리
    - React.memo / useMemo로 해결 가능
    - React.memo는 ReactJS에 props가 바뀌지 않는다면 컴포넌트의 re-rendering 하지 않게함.
*/

const DraggableCard = ({
    payload,
    cardId,
    index,
}: InterfaceDraggableCardProps) => {
    return (
        <Draggable draggableId={cardId.toString()} index={index}>
            {(provided, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {payload}
                </Card>
            )}
        </Draggable>
    );
};

export default React.memo(DraggableCard);
