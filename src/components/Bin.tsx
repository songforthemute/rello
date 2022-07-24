import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const TrashBin = styled.button`
    position: absolute;
    top: 40px;
    left: 40px;
    border: none;
    outline: none;
    background-color: rgba(180, 190, 195, 0.5);
    width: 60px;
    height: 60px;
    border-radius: 12px;
    font-size: 28px;
    padding: 0;

    /* tablet */
    @media screen and (max-width: 768px) {
        top: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        font-size: 24px;
    }
    /* mobile */
    @media screen and (max-width: 425px) {
        top: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        font-size: 20px;
    }
`;

const Area = styled.div<{ isDraggingOver: boolean }>`
    width: inherit;
    height: inherit;
    color: white;
    padding: 12px;
    border-radius: 12px;
    transition: all 0.25s ease-in-out;
    background-color: ${(props) => (props.isDraggingOver ? "#FF0000" : "")};
    box-shadow: ${(props) =>
        props.isDraggingOver ? `inset ${props.theme.boxShadow}` : ""};
    div {
        font-size: 36px;
        padding: auto;
    }
    &:hover,
    &:focus {
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
    /* tablet */
    @media screen and (max-width: 768px) {
        padding: 10px;
    }
    /* mobile */
    @media screen and (max-width: 425px) {
        padding: 8px;
    }
`;

const Bin = () => {
    return (
        <TrashBin>
            <Droppable droppableId="bin">
                {(provided, snapshot) => (
                    <Area
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        <div className="material-symbols-outlined">delete</div>
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </TrashBin>
    );
};

export default Bin;
