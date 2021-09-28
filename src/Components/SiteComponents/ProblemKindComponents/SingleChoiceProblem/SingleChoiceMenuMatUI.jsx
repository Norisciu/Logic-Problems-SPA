import React, { useEffect, useState } from "react";
import ButtonCustom from "../../../Controls/ButtonCustom";
import InputCustom from "../../../Controls/InputCustom";
import { Container } from "@material-ui/core";


export function SingleChoiceMenuMatUI({ setAnswerDataCallback }) {

    const [answerData, setAnswerData] = useState({ trials: 4, answer: "" });

    const onAnswerChange = (event) => {
        let value = event.target.value;
        setAnswerData({ ...answerData, answer: +value });
    }

    useEffect(() => {
        setAnswerDataCallback(answerData);
    }, [answerData])

    const onSubmitAnswer = event => {
        event.preventDefault();
        setAnswerDataCallback(answerData);
    }

    return (
        <Container>
            <InputCustom
                name="answer"
                value={answerData.answer}
                placeholder="Insert your numeric answer here"
                onChange={onAnswerChange}
            />
            <ButtonCustom onClick={onSubmitAnswer}>
                Set problem answer
            </ButtonCustom>

        </Container>
    )

}