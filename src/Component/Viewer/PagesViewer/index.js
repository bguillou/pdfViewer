import React from "react";
import { Container } from "./Styled";
import Page from "./Page";

export default ({ pages, zoom, rotate }) => (
  <Container>
    {pages.map(page => (
      <Page key={page.id} page={page} zoom={zoom} rotate={rotate} />
    ))}
  </Container>
);
