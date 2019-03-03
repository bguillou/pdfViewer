import React from "react";
import { Container } from "./Styled";

export default ({
  loading,
  pdfInfo,
  handleZoom,
  handledefault,
  handleRotate
}) => (
  <Container>
    <div>{pdfInfo.name}</div>
    {!loading && (
      <>
        <div>
          <span>1</span>
          <span>{"/" + pdfInfo.nbPages}</span>
        </div>
        <div>
          <i className="material-icons" onClick={handledefault}>
            crop_free
          </i>
          <i className="material-icons" onClick={() => handleZoom("zoomIn")}>
            zoom_in
          </i>
          <i className="material-icons" onClick={() => handleZoom("zoomOut")}>
            zoom_out
          </i>
          <i className="material-icons" onClick={handleRotate}>
            rotate_right
          </i>
          <i className="material-icons">get_app</i>
          <i className="material-icons">clear</i>
        </div>
      </>
    )}
  </Container>
);
