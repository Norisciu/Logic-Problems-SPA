import {
    List,
    Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProblemComment } from "../../../features/problem/problemSlice";
import ButtonCustom from "../../Controls/ButtonCustom";
import InputCustom from "../../Controls/InputCustom";
import Comment from "./Comment.jsx";
import "./ProblemComment.css";

const ProblemCommentsMatUI = ({ problemId }) => {

    const dispatch = useDispatch();

    const userName = useSelector(state => {
        const userId = state.users.loginUserId;

        const userName = state.users.availableUsers.find(user => user.id == userId).name;
        return userName;
    });

    const problem = useSelector(state => {
        return state.problems.problems.find(elem => elem.problemId == problemId);
    })


    const { comments } = problem;

    const [commentContent, setCommentContent] = useState("");
    const handleCommentInput = event => {
        setCommentContent(event.target.value);
    }

    const handleCommentSubmit = event => {
        event.preventDefault();

        dispatch(addProblemComment({
            comment: commentContent,
            problemId: problemId,
            userName: userName
        }));
    }

    const theComments = comments.map(comment => <Comment {...comment} />)

    return (
        <>
            <Typography variant="h5">
                Publish a comment..
            </Typography>
            <InputCustom
                value={commentContent}
                onChange={handleCommentInput}
                rows={4}
            />
            <ButtonCustom onClick={handleCommentSubmit}>
                Comment
            </ButtonCustom>
            <List>
                {theComments}
            </List>
        </>
    )
}


export default ProblemCommentsMatUI;