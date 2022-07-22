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
    cursor: pointer;
    width: inherit;
    height: inherit;
    padding: 12px;
    border-radius: 12px;
    transition: all 0.35s ease-in-out;
    background-color: ${(props) => (props.isDraggingOver ? "tomato" : "")};
    box-shadow: ${(props) =>
        props.isDraggingOver
            ? `inset ${props.theme.boxShadow}`
            : props.theme.boxShadow};
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
                        <div>🗑</div>
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </TrashBin>
    );
};

export default Bin;
