import React from 'react';

interface FaqDataProps {
  question: string;
  response: string;
}

function QuestionResponse(props: FaqDataProps) {
  const { question, response } = props;

  return (
    <div className="card-body">
      <h5 className="card-title">{question}</h5>
      <p className="card-text">{response}</p>
    </div>
  );
}

export default QuestionResponse;
