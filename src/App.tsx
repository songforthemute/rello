import GlobalStyle from "./GlobalStyle";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { LOCAL_KEY, modalState, toDoState } from "./components/atoms";
import Board from "./components/Board";
import { useEffect } from "react";
import BinBtn from "./components/BinBtn";
import AddBoardBtn from "./components/AddBoardBtn";
import DetailModal from "./components/DetailModal";

const Wrapper = styled.div<{ boardCount: number }>`
    display: flex;
    width: 90vw;
    max-width: 1024px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: ${(props) =>
        `${Math.max(100, Math.ceil(props.boardCount / 4) * 30 + 50)}vh`};
`;

const Boards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: row;
    margin: auto;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    @media screen and (max-width: 425px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Footer = styled.footer`
    position: absolute;
    color: ${(props) => props.theme.boardColor};
    font-size: 1rem;
    font-weight: 400;
    font-style: italic;
    letter-spacing: 1px;
    right: 2rem;
    top: 2rem;
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

            {detailModal.isShow ? <DetailModal /> : null}

            <AddBoardBtn />

            <DragDropContext onDragEnd={_onDragEnd}>
                <BinBtn />
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
