import GlobalStyle from "./GlobalStyle";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { LOCAL_KEY, modalState, toDoState } from "./components/atoms";
import Board from "./components/Board";
import { useEffect } from "react";
import Bin from "./components/Bin";
import AddBoard from "./components/AddBoard";
import DetailModal from "./components/DetailModal";

const Wrapper = styled.div<{ boardCount: number }>`
    margin: 15px;
    margin-top: 0;
    display: flex;
    width: 90vw;
    max-width: 1024px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: ${(props) =>
        `${Math.max(100, Math.ceil(props.boardCount / 4) * 30 + 50)}vh`};
    @media screen and (max-width: 1024px) {
        height: ${(props) =>
            `${Math.max(100, Math.ceil(props.boardCount / 3) * 40 + 50)}vh`};
    }
    @media screen and (max-width: 425px) {
        height: ${(props) =>
            `${Math.max(100, Math.ceil(props.boardCount / 2) * 30 + 50)}vh`};
    }
`;

const Boards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 15px;
    @media screen and (max-width: 1024px) {
        gap: 20px 5px;
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 768px) {
        gap: 10px;
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 425px) {
        gap: 10px;
        grid-template-columns: 1fr 1fr;
    }
`;

const Footer = styled.footer`
    position: absolute;
    color: ${(props) => props.theme.boardColor};
    font-size: 16px;
    font-weight: 600;
    font-style: italic;
    right: 60px;
    bottom: 50px;

    @media screen and (max-width: 768px) {
        right: 25px;
        font-size: 12px;
        letter-spacing: -0.2px;
        bottom: 10px;
    }
`;

const App = () => {
    const localToDos = useRecoilValue(toDoState);
    const [toDos, setToDos] = useRecoilState(toDoState);
    const detailModal = useRecoilValue(modalState);

    const _onDragEnd = (info: DropResult) => {
        const { destination, source } = info;

        // 목적지 X
        if (!destination) return;

        // 카드 제거
        if (destination.droppableId === "bin") {
            const ok = window.confirm(
                "Are you sure you want to remove this card?\nYou cannot reverse this card."
            );
            ok &&
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
        <>
            <GlobalStyle />

            {detailModal.isShow && <DetailModal />}

            <AddBoard />

            <DragDropContext onDragEnd={_onDragEnd}>
                <Bin />
                <Wrapper boardCount={Object.keys(toDos).length}>
                    <Boards>
                        {Object.keys(toDos).map((id) => (
                            <Board toDos={toDos[id]} boardId={id} key={id} />
                        ))}
                    </Boards>
                </Wrapper>
            </DragDropContext>
            <Footer>&copy; Rello {new Date().getFullYear()}</Footer>
        </>
    );
};

export default App;
