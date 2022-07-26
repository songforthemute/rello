import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const ToggleBtn = styled.button<{ showForm: boolean }>`
    position: absolute;
    top: 40px;
    left: 120px;
    border: none;
    outline: none;
    background-color: rgba(180, 190, 195, 0.5);
    width: 60px;
    height: 60px;
    color: white;
    padding: auto;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    box-shadow: ${(props) =>
        props.showForm ? `inset ${props.theme.boxShadow}` : ""};
    div {
        font-size: 36px;
        padding: auto;
    }
    /* desktop & laptop */
    @media screen and (min-width: 769px) {
        &:hover {
            box-shadow: inset ${(props) => props.theme.boxShadow};
        }
    }
    /* tablet */
    @media screen and (max-width: 768px) {
        top: 30px;
        left: 100px;
        width: 50px;
        height: 50px;
        padding: 10px;
        font-size: 28px;
        div {
            font-size: 30px;
        }
    }
    /* mobile */
    @media screen and (max-width: 425px) {
        top: 20px;
        left: 70px;
        width: 40px;
        height: 40px;
        padding: 8px;
        font-size: 20px;
        div {
            font-size: 24px;
        }
    }
`;

const Form = styled.form`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease-in-out;
    top: 50px;
    left: 200px;
    /* tablet */
    @media screen and (max-width: 768px) {
        top: 40px;
        left: 170px;
    }
    /* mobile */
    @media screen and (max-width: 425px) {
        top: 25px;
        left: 120px;
    }
    input {
        border: none;
        border-radius: 20px;
        outline: none;
        padding: 5px 10px;
        height: 40px;
        width: 210px;
        transition: all 0.35s ease-in-out;
        /* tablet */
        @media screen and (max-width: 768px) {
            height: 30px;
            width: 180px;
        }
        /* mobile */
        @media screen and (max-width: 425px) {
            width: 150px;
        }
        &:focus,
        &:hover,
        &:active {
            box-shadow: inset ${(props) => props.theme.boxShadow};
        }
    }
`;

const SubmitBtn = styled.button`
    cursor: pointer;
    margin-left: 10px;
    border: none;
    border-radius: 25%;
    width: 40px;
    height: 40px;
    padding: 2px;
    text-align: center;
    background-color: rgba(180, 190, 195, 0.5);
    color: white;
    /* box-shadow: ${(props) => props.theme.boxShadow}; */
    transition: all 0.25s ease-in-out;
    div {
        font-size: 24px;
        padding: auto;
    }

    /* tablet */
    @media screen and (max-width: 768px) {
        width: 25px;
        height: 25px;
        div {
            font-size: 20px;
        }
    }
    &:focus,
    &:hover,
    &:active {
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

interface InterfaceForm {
    newBoard: string;
}

const AddBoard = () => {
    const [showForm, setShowForm] = useState(false);

    const { register, setValue, handleSubmit } = useForm<InterfaceForm>();
    const setToDos = useSetRecoilState(toDoState);

    const onValid = ({ newBoard }: InterfaceForm) => {
        const newBoardtitle = newBoard;

        setValue("newBoard", "");
        setToDos((current) => {
            return { ...current, [newBoardtitle]: [] };
        });
        setShowForm((prev) => !prev);
    };

    const _onClickToggle = () => {
        setShowForm((prev) => !prev);
    };

    return (
        <>
            <ToggleBtn onClick={_onClickToggle} showForm={showForm}>
                <div className="material-symbols-outlined">note_add</div>
            </ToggleBtn>
            {showForm && (
                <Form onSubmit={handleSubmit(onValid)}>
                    <input
                        {...register("newBoard", { required: true })}
                        type="text"
                        placeholder="Enter new board name."
                    />
                    <SubmitBtn>
                        <div className="material-symbols-outlined">check</div>
                    </SubmitBtn>
                </Form>
            )}
        </>
    );
};

export default AddBoard;
