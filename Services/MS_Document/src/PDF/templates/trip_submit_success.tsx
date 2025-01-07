import * as React from "react";

interface Props {
  title: string;
  content: string;
}

export const TripSubmitSuccessPDFOptions = {
  pageSize: "A4",
  pageMargins: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

const TripSubmitSuccess: React.FC<Props> = ({ title, content }) => (
  <div>
    <h1>{title}</h1>
    <p>{content}</p>
  </div>
);

export default TripSubmitSuccess;
