import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
    padding: 20px 10px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    width: 300px;
    min-height: 300px;
    box-shadow: ${(props) => props.theme.boxShadow};
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

interface InterfaceBoardProps {
    toDos: string[];
    boardId: string;
}

const Board = ({ toDos, boardId }: InterfaceBoardProps) => {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {toDos.map((toDo, index) => (
                            <DraggableCard
                                key={toDo}
                                toDo={toDo}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    );
};

export default Board;
