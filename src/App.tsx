import GlobalStyle from "./GlobalStyle";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { LOCAL_KEY, modalState, toDoState } from "./components/atoms";
import Board from "./components/Board";
import { KeyboardEvent, useEffect } from "react";
import Bin from "./components/Bin";
import AddForm from "./components/AddForm";
import DetailModal from "./components/DetailModal";

const Wrapper = styled.div`
    display: flex;
    /* max-width: 890px; */
    width: 90vw;
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
    @media screen and (max-width: 425px) {
    }
`;

const App = () => {
    const localToDos = useRecoilValue(toDoState);
    const [toDos, setToDos] = useRecoilState(toDoState);
    const [detailModal, setDetailModal] = useRecoilState(modalState);

    const _onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            setDetailModal(() => {
                return { modal: undefined, boardId: undefined, isShow: false };
            });
        }
    };

    const _onDragEnd = (info: DropResult) => {
        const { destination, source } = info;

        // 목적지 X
        if (!destination) return;

        // 카드 제거
        if (destination.droppableId === "bin") {
            setToDos((current) => {
                const sourceBoard = [...current[source.droppableId]];

                sourceBoard.splice(source.index, 1);

                return { ...current, [source.droppableId]: sourceBoard };
            });

            return;
        }

        // 동일 보드 내 이동
        if (destination.droppableId === source.droppableId) {
            setToDos((current) => {
                const sourceBoard = [...current[source.droppableId]];
                const sourceCard = sourceBoard[source.index];

                sourceBoard.splice(source.index, 1); // del item from source
                sourceBoard.splice(destination.index, 0, sourceCard); // add item to destination

                return { ...current, [destination.droppableId]: sourceBoard };
            });

            return;
        }

        // 보드 간 이동
        if (destination.droppableId !== source.droppableId) {
            setToDos((current) => {
                const sourceBoard = [...current[source.droppableId]];
                const sourceCard = sourceBoard[source.index];
                const destinationBoard = [...current[destination.droppableId]];

                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination.index, 0, sourceCard);

                return {
                    ...current,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            });

            return;
        }
    };

    // set default
    useEffect(() => {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(localToDos));
    }, [localToDos]);

    return (
        <div onKeyDown={detailModal.isShow ? _onKeyDown : undefined}>
            <GlobalStyle />

            {detailModal.isShow && <DetailModal />}

            <AddForm />
            <DragDropContext onDragEnd={_onDragEnd}>
                <Bin />
                <Wrapper>
                    <Boards>
                        {Object.keys(toDos).map((id) => (
                            <Board toDos={toDos[id]} boardId={id} key={id} />
                        ))}
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </div>
    );
};

export default App;
