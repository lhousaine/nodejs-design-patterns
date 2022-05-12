import react from "react";
import ReactDOM from "react-dom";

const h = react.createElement; // (1)

class Hello extends react.Component {
  render() {
    return h("h1", null, ["Hello ", this.props.name || "World"]);
  }
}
ReactDOM.render(
  h(Hello, { name: "React" }),
  document.getElementsByTagName("body")[0]
);
