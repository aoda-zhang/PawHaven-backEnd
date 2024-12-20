import { Button, Html } from "@react-email/components";
import React from "react";

interface Props {
  url: string;
}
const tripSbumitFailed = (props: Props) => {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
};
export default tripSbumitFailed;
