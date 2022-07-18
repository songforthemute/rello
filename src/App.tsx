import GlobalStyle from "./GlobalStyle";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

const toDos = ["Apple", "Banana", "Chocolate", "Django", "Eclair"];

function App() {
    const _onDragEnd = () => {};

    return (
        <>
            <GlobalStyle />
            <DragDropContext onDragEnd={_onDragEnd}>
                <Wrapper>
                    <Boards>
                        <Droppable droppableId="one">
                            {(provided) => (
                                <Board
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {toDos.map((toDo, index) => (
                                        <Draggable
                                            key={index}
                                            draggableId={toDo}
                                            index={index}
                                        >
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
                                    ))}
                                    {provided.placeholder}
                                </Board>
                            )}
                        </Droppable>
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;
