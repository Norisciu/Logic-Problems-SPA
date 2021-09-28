import React from "react";
import { useSelector } from "react-redux";
import ProblemCommentsMatUI from "../Components/SiteComponents/Comments/ProblemCommentsMatUI";
import ProblemPostMatUI from "../Components/SiteComponents/ProblemKindComponents/ProblemPostMatUI";
import TabMenuMatUI from "../Components/SiteComponents/TabMenu/TabMenuMatUI";
import AddProblemFormMatUI from "../Components/FormChecker/AddProblemFormMatUI";

// component displaying the contents of a single problem
const SingleProblemPageMatUI = ({ match }) => {
  const { problemId } = match.params;
  const problem = useSelector((state) => {
    return state.problems.problems.find((elem) => elem.problemId == problemId);
  });

  if (!problem) {
    return <p>Problem not found!</p>;
  } else {
    return (
      <TabMenuMatUI problemId={problemId}>
        <ProblemPostMatUI name="post" problemId={problemId} />
        <ProblemCommentsMatUI name="comments" problemId={problemId} />
        <AddProblemFormMatUI
          requiresAuthorPermission={true}
          name="update problem"
          problemId={problemId}
        />
      </TabMenuMatUI>
    );
  }
};

export default SingleProblemPageMatUI;
