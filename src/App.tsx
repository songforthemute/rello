import GlobalStyle from "./GlobalStyle";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./components/atoms";
import DraggableCard from "./components/DraggableCard";

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

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const _onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;

        setToDos((current) => {
            const copied = [...current];
            copied.splice(source?.index, 1); // del item from source
            copied.splice(destination?.index, 0, draggableId); // add item to destination
            return copied;
        });
    };

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
                                        <DraggableCard
                                            key={toDo}
                                            toDo={toDo}
                                            index={index}
                                        />
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
