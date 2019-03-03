import React, { Component } from "react";

import { Container } from "./Styled";
import Toolbar from "./Toolbar";
import PagesViewer from "./PagesViewer";
import getPages from "../helpers/getPages";

export default class Viewer extends Component {
  static defaultProps = {
    url:
      "https://www.free-ebooks.net/horror-gothic/Macabre-Memories/pdf?dl&preview?dl&preview",
    pdfWorker: "http://localhost:8000"
  };
  state = {
    loading: true,
    pages: [],
    pdfInfo: {
      name: "sample.pdf",
      url: this.props.url,
      nbPages: 0
    },
    zoom: 1,
    rotate: 180
  };

  componentDidMount = async () => {
    await this.initViewer(this.props.url);
  };

  componentDidUpdate = async props => {
    if (props.url !== this.props.url) await this.initViewer(this.props.url);
  };

  initViewer = async url => {
    await getPages(
      url,
      this.props.pdfWorker,
      () => this.state,
      this.addPages,
      this.handleLoaded
    );
  };

  handleZoom = type => {
    const { zoom } = this.state;
    const newZoom = type === "zoomIn" ? zoom + 0.2 : zoom - 0.2;

    this.setState({ zoom: newZoom });
  };

  handleRotate = () => {
    const { rotate } = this.state;
    const newRotate = rotate === 270 ? 0 : rotate + 90;

    this.setState({ rotate: newRotate });
  };

  handleDefault = () => {
    this.setState({ zoom: 1 });
  };

  addPages = newPages => {
    this.setState({ pages: [...this.state.pages, ...newPages] });
  };

  handleLoaded = () => {
    this.setState({
      loading: false,
      pdfInfo: { ...this.state.pdfInfo, nbPages: this.state.pages.length }
    });
  };

  render() {
    const { pages, pdfInfo, zoom, rotate, loading } = this.state;
    return (
      <Container>
        <Toolbar
          loading={loading}
          pages={pages}
          pdfInfo={pdfInfo}
          handleZoom={this.handleZoom}
          handleDefault={this.handleDefault}
          handleRotate={this.handleRotate}
        />
        <PagesViewer pages={pages} zoom={zoom} rotate={rotate} />
      </Container>
    );
  }
}
