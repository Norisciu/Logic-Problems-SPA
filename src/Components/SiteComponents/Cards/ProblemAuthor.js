import React from "react";
import { useSelector } from "react-redux";

export function ProblemAuthor({ userId }) {
  const author = useSelector((state) => {
    return state.users.availableUsers.find((user) => user.id === userId);
  });

  return <span>by {author ? author.name : "Unknown author"}</span>;
}
