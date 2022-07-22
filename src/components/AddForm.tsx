import { MouseEvent, useState } from "react";
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
    font-size: 40px;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.35s ease-in-out;
    box-shadow: ${(props) =>
        props.showForm
            ? `inset ${props.theme.boxShadow}`
            : props.theme.boxShadow};
    /* tablet */
    @media screen and (max-width: 768px) {
        top: 30px;
        left: 100px;
        width: 50px;
        height: 50px;
        padding: 10px;
        font-size: 28px;
    }
    /* mobile */
    @media screen and (max-width: 425px) {
        top: 20px;
        left: 80px;
        width: 40px;
        height: 40px;
        padding: 8px;
        font-size: 20px;
    }
`;

const Form = styled.form<{ showForm: boolean }>`
    display: ${(props) => (props.showForm ? "flex" : "none")};
    position: absolute;
    justify-content: center;
    align-items: center;
    transition: all 0.35s ease-in-out;
    top: 50px;
    left: 220px;
    /* tablet */
    @media screen and (max-width: 768px) {
        top: 40px;
        left: 180px;
    }
    /* mobile */
    @media screen and (max-width: 425px) {
        top: 25px;
        left: 140px;
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
    margin-left: 20px;
    border: none;
    border-radius: 25%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    padding: auto;
    text-align: center;
    background-color: rgba(180, 190, 195, 0.5);
    color: white;
    box-shadow: ${(props) => props.theme.boxShadow};
    transition: all 0.35s ease-in-out;
    /* tablet */
    @media screen and (max-width: 768px) {
        width: 25px;
        height: 25px;
        font-size: 14px;
    }
    &:focus,
    &:hover,
    &:active {
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
`;

const AddForm = () => {
    const [showForm, setShowForm] = useState(false);
    const setToDos = useSetRecoilState(toDoState);
    const { register } = useForm();

    const _onClickToggle = (e: MouseEvent<HTMLButtonElement>) => {
        // Add input form in modal window & function
        setShowForm((prev) => !prev);
    };

    return (
        <>
            <ToggleBtn onClick={_onClickToggle} showForm={showForm}>
                +
            </ToggleBtn>
            <Form showForm={showForm}>
                <input type="text" />
                <SubmitBtn>&rarr;</SubmitBtn>
            </Form>
        </>
    );
};

export default AddForm;
