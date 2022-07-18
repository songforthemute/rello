import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

interface InterfaceDraggableCardProps {
    toDo: string;
    index: number;
}

/*
    ReactJS에서 컴포넌트의 상태가 변할 때,
    해당 컴포넌트의 모든 자식이 re-rendering 되는 현상 발생
    - 부모 상태가 변경되면, 자식 상태도 변경되는 ReactJS의 기본 원리
    - React.memo / useMemo로 해결 가능
    - React.memo는 ReactJS에 props가 바뀌지 않는다면 컴포넌트의 re-rendering 하지 않게함.
*/

const DraggableCard = ({ toDo, index }: InterfaceDraggableCardProps) => {
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(provided) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {toDo}
                </Card>
            )}
        </Draggable>
    );
};

export default React.memo(DraggableCard);
