import { problemType } from "../../features/problem/problemConstants";

export function checkData(data, rules) {
  let errorsFound = {};

  Object.keys(data).forEach((formField) => {
    if (rules.hasOwnProperty(formField)) {
      let fieldErrors = [];
      let fieldValue = data[formField];
      if (rules[formField].require && isEmptyValue(fieldValue)) {
        let errorStatement = rules[formField].require.error;
        fieldErrors.push(errorStatement);
      }

      if (rules[formField].checkWith) {
        let checkFun = rules[formField].checkWith;
        let errorResult = checkFun();
        if (errorResult) {
          fieldErrors = fieldErrors.concat(errorResult);
        }
      }

      if (fieldErrors.length > 0) {
        errorsFound[formField] = fieldErrors;
      }
    }
  });

  return errorsFound;
}

export function checkAnswerData(answer, answerType) {
  if (answerType === problemType.SINGLECHOICE) {
    return checkSingleChoiceAnswer(answer);
  } else if (answerType === problemType.MULTICHOICE) {
    return checkMultiChoiceAnswer(answer);
  } else {
    throw new Error(`unknown problem type provide for form data checking`);
  }
}

const checkSingleChoiceAnswer = ({ answer }) => {
  let errors = [];
  if (isEmptyValue(answer)) {
    errors.push("You should provide a numeric value");
  }

  return errors;
};

const checkMultiChoiceAnswer = (answer) => {
  console.log(`checkMultiChoiceAnswer answer `, answer);
  const { choices, correctChoiceId } = answer;
  let errors = [];

  // assume that if there is not a choices field on the answer
  // object the even that triggierd the form checking was a
  // changie on problem type from SingleChoice to MultiChoice
  // such that there isn't yet a correct answer data
  if (!choices) {
    return [];
  }

  if (choices.length < 2) {
    errors.push("You should provide at least 2 choices.");
  }

  if (!correctChoiceId) {
    errors.push("You should provide 1 correct choice.");
  }

  return errors;
};

const isEmptyValue = (value) => value === "";
