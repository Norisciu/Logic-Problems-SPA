import { Grid, InputBase, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MultiChoiceMenuMatUI } from "../../Components/SiteComponents/ProblemKindComponents/MultiChoiceProblem/MultiChoiceMenuMatUI";
import SelectCustom from "../Controls/SelectCustom";
import { SingleChoiceMenuMatUI } from "../SiteComponents/ProblemKindComponents/SingleChoiceProblem/SingleChoiceMenuMatUI";
import { checkAnswerData } from "./checkData";
import { ErrorStatement } from "./ErrorStatement";
import { FormChecker } from "./FormChecker";
import { addProblem, updateProblem } from "../../features/problem/problemSlice";
import { problemType } from "../../features/problem/problemConstants";

const initFormData = {
  problemName: "",
  problemContent: "",
  userId: "",
  problemDifficulty: "Easy",
  difficulty: "Easy",
  problemKind: problemType.SINGLECHOICE,
  problemAnswerData: null,
  category: "Logic",
};

const useStyles = makeStyles((theme) => ({
  trialGridContainer: {
    width: "100%",
  },

  trialGridItem: {
    minHeight: "100%",
  },

  inputFieldTrial: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    width: "100%",
    border: "solid 2px #eee",
    borderRadius: "0",
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),

    "& .MuiOutlinedInput-root": {
      border: "solid 2px #eee",
    },
  },

  formRow: {
    width: "75%",
    width: "100%",
    backgroundColor: "white",
    paddingLeft: theme.spacing(1),

    marginBottom: theme.spacing(2),
  },

  formWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  formContent: {
    width: "100%",
    padding: "2em",
    margin: "auto",

    "& .MuiFormControl-root": {
      width: "100%",
      marginBottom: "2em",
      backgroundColor: "white",
    },

    "& .MuiGrid-item": {
      backgroundColor: theme.palette.background.gridCell,
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
  },

  gridCell: {
    backgroundColor: theme.palette.background.gridCell,
  },
}));

const AddProblemFormMatUI = ({ problemId }) => {
  const classes = useStyles();
  const problemData = useSelector((state) => {
    const problems = state.problems.problems;
    return problems.find((problem) => problem.problemId == problemId);
  });
  const [formState, setFormState] = useState(problemData || initFormData);
  const dispatch = useDispatch();
  const problemAuthor = useSelector((state) => state.users.loginUserId);
  const history = useHistory();

  const setProblemAnswerData = (answerData) => {
    setFormState({
      ...formState,
      problemAnswerData: { ...answerData },
    });
  };

  const setFormField = (event) => {
    let value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  const problemTypes = Object.values(problemType);
  const answerMenuOptions = problemTypes.map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ));

  const problemCategories = ["Logic", "Programming"];
  const problemCategoryOptions = problemCategories.map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ));

  const difficulties = ["Very easy", "Easy", "Medium", "Hard", "Very hard"];
  const problemDifficultyOptions = difficulties.map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ));

  const answerMenu = (() => {
    const problemKind = formState.problemKind;

    if (problemKind === problemType.SINGLECHOICE) {
      return (
        <SingleChoiceMenuMatUI setAnswerDataCallback={setProblemAnswerData} />
      );
    } else if (problemKind === problemType.MULTICHOICE) {
      return (
        <MultiChoiceMenuMatUI
          answerDataFromParent={formState.problemAnswerData}
          setAnswerData={setProblemAnswerData}
        />
      );
    } else {
      throw new Error(`unknown problem type ${problemKind}`);
    }
  })();

  const setProblemName = (event) => {
    let name = event.target.value;
    setFormState({ ...formState, problemName: name });
  };

  const setProblemContent = (event) => {
    let content = event.target.value;
    setFormState({ ...formState, problemContent: content });
  };

  const setProblemType = (event) => {
    let problemType = event.target.value;
    setFormState({
      ...formState,
      problemKind: problemType,
      problemAnswerData: formState.problemAnswerData,
    });
  };

  const addTheProblem = () => {
    if (problemId) {
      dispatch(updateProblem(formState));
    } else {
      dispatch(addProblem({ ...formState, userId: problemAuthor }));
      history.push("/");
    }
  };

  const { problemAnswerData, problemKind } = formState;
  const problemAnswerDataCheck = () =>
    checkAnswerData(problemAnswerData, problemKind);

  const toProblemsScreen = () => history.push("/");

  const formRules = {
    problemName: { require: { error: "Problem should have a name" } },
    problemAnswerData: { checkWith: problemAnswerDataCheck },
    problemContent: { require: { error: "Problem should have some content" } },
  };

  return (
    <FormChecker
      className={classes.formContent}
      formData={formState}
      formRules={formRules}
      submitCallback={addTheProblem}
    >
      <Grid spacing={4} container className={classes.trialGridContainer}>
        <Grid item md={7} className={classes.trialGridItem}>
          <div>
            <InputBase
              className={classes.inputFieldTrial}
              name="problemName"
              label="Problem name"
              variant="outlined"
              onChange={setProblemName}
              value={formState.problemName}
            />
            <ErrorStatement field="problemName" />
          </div>
          <div>
            <SelectCustom
              name="difficulty"
              style={{ width: "39%" }}
              onChange={setFormField}
            >
              {problemDifficultyOptions}
            </SelectCustom>
          </div>
          <div>
            <InputBase
              className={classes.inputFieldTrial}
              name="problemContent"
              onChange={setProblemContent}
              value={formState.problemContent}
              rows={15}
              multiline
            />
            <ErrorStatement field="problemContent" />
          </div>

          <div>
            <SelectCustom
              name="problemCategory"
              value={formState.problemCategory}
              onChange={setFormField}
            >
              {problemCategoryOptions}
            </SelectCustom>
          </div>
          <div>
            <SelectCustom
              name="problemType"
              value={formState.problemKind}
              onChange={setProblemType}
            >
              {answerMenuOptions}
            </SelectCustom>
          </div>
        </Grid>
        <Grid item md={1} className={classes.trialGridDivider}></Grid>
        <Grid md={4} item className={classes.trialGridItem}>
          {answerMenu}
        </Grid>
      </Grid>
      <button onClick={toProblemsScreen}>Go back</button>
    </FormChecker>
  );
};

export default AddProblemFormMatUI;
