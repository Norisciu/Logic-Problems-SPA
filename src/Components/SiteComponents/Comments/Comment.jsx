import React from "react";
import "./Comment.css";


const Comment = ({ user, downvotes, upvotes, content }) => {
    return (
    
        <div className="comment-wrapper">
            <header className="comment-header">
                <span className="comment-user">{user}</span>
                <div className="comment-votes">
                    <small>Downvotes : { downvotes} </small>
                    <small>Upvotes : {upvotes} </small>
                </div>
            </header>
            <p className="comment-content">
                {content}
            </p>
        </div>
    );
}

export default Comment;