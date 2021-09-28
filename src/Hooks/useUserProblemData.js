import { useSelector } from "react-redux";

export function useUserProblemData(problemId){
    const loginUserId  = useSelector(state => state.users.loginUserId);
    const problem  = useSelector(state => state.problems.problems.find(problem => problem.problemId == problemId));

   

    let isProblemAuthor  =  problem.userId === loginUserId;
    let isProblemSolver  =  problem.solvers.includes(loginUserId);
    let isProblemFailure  = problem.failures.includes(loginUserId);
    let canSeeSolutions  =  isProblemAuthor ||  isProblemSolver || isProblemFailure;

    let problemAttemps =   problem.solveAttemps[loginUserId] === undefined ? problem.problemAnswerData.trials :  problem.solveAttemps[loginUserId];
    let problemAnswer  = problem.problemAnswerData.answer || problem.problemAnswerData.correctChoiceId;
    let problemChoices  =  problem.problemAnswerData.choices;

    return [
        isProblemAuthor ,
        isProblemSolver, 
        isProblemFailure,
        canSeeSolutions , 
        problemAttemps , 
        loginUserId,
        problemAnswer,
        problemChoices , 
    ];
}

