import React, { Component } from "react";
import { Img, Container } from "./Styled";

export default class Page extends Component {
  static defaultProps = {
    zoom: 1
  };
  shouldComponentUpdate({ page, zoom }) {
    return page.id !== this.props.page.id || zoom !== this.props.zomm;
  }
  state = { width: 0, height: 0 };

  onLoad = e => {
    const { width, height } = e.target.getBoundingClientRect();
    this.setState({ width, height });
  };

  render() {
    const { page, zoom, rotate } = this.props;
    const { width, height } = this.state;
    const dimention =
      width && height ? { width: width * zoom, height: height * zoom } : {};
    const opacity = width && height ? 1 : 0;

    return (
      //   <Container style={dimention}>
      <Img
        src={page.url}
        alt=""
        onLoad={this.onLoad}
        rotate={rotate}
        style={{ opacity, ...dimention }}
      />
      //   </Container>
    );
  }
}
