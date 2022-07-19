import GlobalStyle from "./GlobalStyle";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./components/atoms";
import Board from "./components/Borad";

const Wrapper = styled.div`
    display: flex;
    max-width: 890px;
    width: 100vw;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 15px;
`;

const App = () => {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const _onDragEnd = (info: DropResult) => {
        const { destination, source, draggableId } = info;

        // 목적지 X
        if (!destination) return;

        // 동일 보드 내 이동
        if (destination.droppableId === source.droppableId) {
            setToDos((current) => {
                const copiedBoard = [...current[source.droppableId]];
                copiedBoard.splice(source.index, 1); // del item from source
                copiedBoard.splice(destination.index, 0, draggableId); // add item to destination
                return { ...current, [destination.droppableId]: copiedBoard };
            });
        }

        // 보드 간 이동
        if (destination.droppableId !== source.droppableId) {
            setToDos((current) => {
                const fromBoard = [...current[source.droppableId]];
                const toBoard = [...current[destination.droppableId]];
                fromBoard.splice(source.index, 1);
                toBoard.splice(destination.index, 0, draggableId);
                return {
                    ...current,
                    [source.droppableId]: fromBoard,
                    [destination.droppableId]: toBoard,
                };
            });
        }
    };

    return (
        <>
            <GlobalStyle />
            <DragDropContext onDragEnd={_onDragEnd}>
                <Wrapper>
                    <Boards>
                        {Object.keys(toDos).map((id) => (
                            <Board toDos={toDos[id]} boardId={id} key={id} />
                        ))}
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </>
    );
};

export default App;
