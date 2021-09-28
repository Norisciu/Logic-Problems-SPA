import { createSlice, nanoid } from "@reduxjs/toolkit";
import { problemDifficulty, problemType } from "./problemConstants";

let initialState = {
  problems: [
    {
      problemName: "Chessboard",
      problemContent: "This is a logic problem involving chessboards.",
      problemId: 1,
      userId: "1",
      category: "Logic",
      difficulty: problemDifficulty.VERY_EASY,
      problemType: problemType.SINGLECHOICE,
      problemAnswerData: { trials: 4, answer: 4 },
      solvers: [],
      failures: [],
      solveAttemps: {},
      problemSolutions: [],
      comments: [
        {
          user: "Some user",
          upvotes: 0,
          downvotes: 0,
          content: "This is an awesome problem!!",
        },
      ],
    },
    {
      problemName: "Chessboard multichoice ultra easy",
      problemContent:
        "This is an ultra super easy logic problem involving chessboards.",
      problemId: "12",
      userId: "0",
      category: "Logic",
      difficulty: problemDifficulty.VERY_EASY,
      problemType: problemType.MULTICHOICE,
      problemAnswerData: {
        choices: [
          { id: "0", content: "Choice 1" },
          { id: "1", content: "Choice 2" },
          { id: "2", content: "Choice 3" },
        ],
        correctChoiceId: "1",
      },
      solvers: [],
      failures: [],
      solveAttemps: {},
      problemSolutions: [
        {
          solutionAuthor: "Unknown author",
          solutionContent: "Solution to this problem..",
          upvotes: {
            count: 0,
            users: [],
          },
          downvotes: {
            count: 0,
            users: [],
          },
          id: "1",
        },
        {
          solutionAuthor: "Unknown author 2",
          solutionContent: "Solution to this problem..",
          upvotes: {
            count: 2,
            users: [],
          },
          downvotes: {
            count: 0,
            users: [],
          },
          id: "2",
        },
      ],
      comments: [],
    },
    {
      problemName: "Chessboard multichoice",
      problemContent: "This is a logic problem involving chessboards.",
      problemId: "2",
      userId: "0",
      category: "Logic",
      difficulty: problemDifficulty.EASY,
      problemType: problemType.MULTICHOICE,
      problemAnswerData: {
        choices: [
          { id: "0", content: "Choice 1" },
          { id: "1", content: "Choice 2" },
          { id: "2", content: "Choice 3" },
        ],
        correctChoiceId: "1",
      },
      solvers: [],
      failures: [],
      solveAttemps: {},
      problemSolutions: [
        {
          solutionAuthor: "Unknown author",
          solutionContent: "Solution to this problem..",
          upvotes: {
            count: 0,
            users: [],
          },
          downvotes: {
            count: 0,
            users: [],
          },
          id: "1",
        },
        {
          solutionAuthor: "Unknown author 2",
          solutionContent: "Solution to this problem..",
          upvotes: {
            count: 2,
            users: [],
          },
          downvotes: {
            count: 0,
            users: [],
          },
          id: "2",
        },
      ],
      comments: [],
    },

    {
      problemName: "Chessboard multichoice medium",
      problemContent: "This is a logic problem involving chessboards.",
      problemId: "3",
      userId: "0",
      category: "Logic",
      difficulty: problemDifficulty.MEDIUM,
      problemType: problemType.MULTICHOICE,
      problemAnswerData: {
        choices: [
          { id: "0", content: "Choice 1" },
          { id: "1", content: "Choice 2" },
          { id: "2", content: "Choice 3" },
        ],
        correctChoiceId: "1",
      },
      solvers: [],
      failures: [],
      solveAttemps: {},
      problemSolutions: [
        {
          solutionAuthor: "Unknown author",
          solutionContent: "Solution to this problem..",
          upvotes: {
            count: 0,
            users: [],
          },
          downvotes: {
            count: 0,
            users: [],
          },
          id: "1",
        },
        {
          solutionAuthor: "Unknown author 2",
          solutionContent: "Solution to this problem..",
          upvotes: {
            count: 2,
            users: [],
          },
          downvotes: {
            count: 0,
            users: [],
          },
          id: "2",
        },
      ],
      comments: [],
    },
    {
      problemName: "Chessboard Hard",
      problemContent: "This is a logic problem involving chessboards.",
      problemId: "4",
      userId: "3",
      category: "Logic",
      difficulty: problemDifficulty.HARD,
      problemType: problemType.SINGLECHOICE,
      problemAnswerData: { trials: 4, answer: 4 },
      solvers: [],
      failures: [],
      solveAttemps: {},
      problemSolutions: [],
      comments: [
        {
          user: "Unknown user",
          upvotes: 0,
          downvotes: 0,
          content: "This is an awesome problem!!",
        },
      ],
    },
  ],
  filters: {
    category: "Logic",
    difficulty: problemDifficulty.VERY_EASY,
  },
};

localStorage.setItem("logicProblems", JSON.stringify(initialState));
// const startingState  =  initialState || JSON.parse(localStorage.getItem("logicProblems"))

export const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    addProblem: {
      reducer(state, action) {
        state.problems.push(action.payload);
        localStorage.setItem("logicProblems", JSON.stringify(state));
      },

      prepare(data) {
        const id = nanoid();
        const problemName =
          data.problemName === "" ? "Nameless problem" : data.problemName;

        return {
          payload: {
            ...data,
            problemName: problemName,
            problemId: id,
            solvers: [],
            failures: [],
            solveAttemps: {},
            problemSolutions: [],
            comments: [],
          },
        };
      },
    },

    updateProblem: (state, action) => {
      const { problemId } = action.payload;
      let targetProblem = state.problems.find(
        (problem) => problem.problemId === problemId
      );
      targetProblem = { ...targetProblem, ...action.payload };
      let updateProblems = state.problems.map((problem) =>
        problem.problemId === problemId ? targetProblem : problem
      );
      state.problems = updateProblems;
      localStorage.setItem("logicProblems", JSON.stringify(state));
    },

    changeCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    changeDifficulty: (state, action) => {
      state.filters.difficulty = action.payload;
    },

    addProblemComment: (state, action) => {
      let { problemId, userName, comment } = action.payload;
      let problem = state.problems.find(
        (problem) => problem.problemId == problemId
      );
      let pushComment = {
        user: userName,
        upvotes: 0,
        downvotes: 0,
        content: comment,
      };

      problem.comments.push(pushComment);
    },

    addProblemSolution: (state, action) => {
      const { problemId, solutionContent, author } = action.payload;
      let problem = state.problems.find(
        (problem) => problem.problemId == problemId
      );
      let solutionToPush = {
        solutionAuthor: author || "Unknown author",
        solutionContent: solutionContent,
        upvotes: { count: 0, users: [] },
        downvotes: { count: 0, users: [] },
        id: nanoid(),
      };
      problem.problemSolutions.push(solutionToPush);
    },

    upvoteSolution: (state, action) => {
      const { problemId, solutionId, userId } = action.payload;

      let problem = state.problems.find(
        (problem) => problem.problemId == problemId
      );
      let solution = problem.problemSolutions.find(
        (solution) => solution.id === solutionId
      );

      if (solution.upvotes.users.includes(userId)) {
        const clearUsers = solution.upvotes.users.filter(
          (user) => user != userId
        );

        solution.upvotes.users = clearUsers;
        solution.upvotes.count--;
      } else {
        solution.upvotes.users.push(userId);
        solution.upvotes.count += 1;
      }

      if (solution.downvotes.users.includes(userId)) {
        solution.downvotes.users = solution.downvotes.users.filter(
          (user) => user != userId
        );
        solution.downvotes.count -= 1;
      }
    },

    downvoteSolution: (state, action) => {
      const { problemId, solutionId, userId } = action.payload;
      let problem = state.problems.find(
        (problem) => problem.problemId == problemId
      );
      let solution = problem.problemSolutions.find(
        (solution) => solution.id === solutionId
      );
      let userIds = solution.downvotes.users;

      if (userIds.includes(userId)) {
        solution.downvotes.users = userIds.filter((user) => user != userId);
        solution.downvotes.count--;
      } else {
        solution.downvotes.users.push(userId);
        solution.downvotes.count += 1;
      }

      if (solution.upvotes.users.includes(userId)) {
        solution.upvotes.users = solution.upvotes.users.filter(
          (user) => user != userId
        );
        solution.upvotes.count -= 1;
      }
    },

    checkProblemNumericAnswer: (state, action) => {
      const { userAnswer, userId, problemId } = action.payload;
      const problem = state.problems.find(
        (problem) => problem.problemId === problemId
      );

      if (problem.solveAttemps[userId] === undefined) {
        problem.solveAttemps[userId] = problem.problemAnswerData.trials;
      }

      if (problem.problemAnswerData.answer === userAnswer.answer) {
        problem.solvers.push(userId);
        return;
      }

      problem.solveAttemps[userId] = problem.solveAttemps[userId] - 1;
      if (problem.solveAttemps[userId] <= 0) {
        problem.failures.push(userId);
      }
    },

    checkMultiChoiceProblemAnswer: (state, action) => {
      const { userAnswer, userId, problemId } = action.payload;
      const problem = state.problems.find(
        (problem) => problem.problemId === problemId
      );

      problem.solveAttemps[userId] = userAnswer;
      if (problem.problemAnswerData.correctChoiceId === userAnswer.answer) {
        problem.solvers.push(userId);
      } else {
        problem.failures.push(userId);
      }
    },
  },
});

export const {
  addProblem,
  updateProblem,
  addProblemSolution,
  upvoteSolution,
  downvoteSolution,
  addProblemComment,
  checkProblemNumericAnswer,
  checkMultiChoiceProblemAnswer,
  changeCategory,
  changeDifficulty,
} = problemSlice.actions;
export default problemSlice.reducer;
