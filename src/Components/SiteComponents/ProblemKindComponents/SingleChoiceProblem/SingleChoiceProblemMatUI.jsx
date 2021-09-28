import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkProblemNumericAnswer } from "../../../../features/problem/problemSlice";
import { useUserProblemData } from "../../../../Hooks/useUserProblemData";
import { makeStyles } from "@material-ui/core";
import ProblemContentMatUI from "../MultiChoiceProblem/ProblemContentMatUI";
import { SingleChoiceAnswerMenuMatUI } from "./SingleChoiceAnswerMenuMatUI";
import SolutionsDisplay from "../../../../Components/SiteComponents/SolutionComponents/SolutionsDisplay";
import { useUsers } from "../../../../Hooks/useUsers";
import { BasicProblemPageLayout } from "../../../../Layouts/BasicProblemPageLayout";

const useStyles = makeStyles((theme) => ({
  rightColumn: {
    paddingLeft: theme.spacing(4),
  },

  bottomRow: {
    marginTop: theme.spacing(4),
  },
}));

export function SingleChoiceProblemMatUI({ problem }) {
  const classes = useStyles();

  const [answerData, setAnswerData] = useState({ answer: "" });
  const dispatch = useDispatch();

  const [
    isProblemAuthor,
    isProblemSolver,
    isProblemFailure,
    canSeeSolutions,
    problemAttemps,
    currentUserId,
    problemAnswer,
  ] = useUserProblemData(problem.problemId);

  const [users, setUser, loginUser, userName, getUserName] = useUsers();
  const problemAuthor = getUserName(problem.userId);

  const setAnswerFromInput = (event) => {
    let value = event.target.value;
    setAnswerData({ answer: +value });
  };

  const checkAnswer = () => {
    dispatch(
      checkProblemNumericAnswer({
        userId: currentUserId,
        userAnswer: answerData,
        problemId: problem.problemId,
      })
    );
  };

  return (
    <BasicProblemPageLayout>
      <ProblemContentMatUI
        name={problem.problemName}
        content={problem.problemContent}
        author={problemAuthor}
      />
      <SingleChoiceAnswerMenuMatUI
        problemId={problem.problemId}
        onAnswerChangeCallback={setAnswerFromInput}
        checkAnswerCallback={checkAnswer}
        answerData={answerData}
      />
      <SolutionsDisplay problem={problem} isVisible={canSeeSolutions} />
    </BasicProblemPageLayout>
  );
}
