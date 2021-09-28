import React from "react";
import { useSelector } from "react-redux";
import { problemType } from "../../../features/problem/problemConstants";
import { MultiChoiceProblemMatUI } from "./MultiChoiceProblem/MultiChoiceProblemMatUI";
import { SingleChoiceProblemMatUI } from "./SingleChoiceProblem/SingleChoiceProblemMatUI";

const ProblemPostMatUI = ({ problemId }) => {
  const problem = useSelector((state) => {
    return state.problems.problems.find((elem) => elem.problemId == problemId);
  });

  const problemComponent = ((problem) => {
    let typeToProblemComponentMap = new Map([
      [
        problemType.SINGLECHOICE,
        <SingleChoiceProblemMatUI problem={{ ...problem }} />,
      ],
      [
        problemType.MULTICHOICE,
        <MultiChoiceProblemMatUI problem={{ ...problem }} />,
      ],
    ]);
    return typeToProblemComponentMap.get(problem.problemType);
  })(problem);

  if (!problem) {
    return <p>Problem not found!</p>;
  } else {
    return problemComponent;
  }
};

export default ProblemPostMatUI;
