import react from "react";

export class AsyncPage extends react.Component {
  static async preloadAsyncData(props) {
    throw new Error("Must be implemented by sub class");
  }
  // (1)
  render() {
    throw new Error("Must be implemented by sub class");
  }
  constructor(props) {
    super(props);
    const location = props.match.url;
    this.hasData = false;
    let staticData;
    let staticError;
    const staticContext =
      typeof window !== "undefined"
        ? window.__STATIC_CONTEXT__ // client-side
        : this.props.staticContext; // server-side
    if (staticContext && staticContext[location]) {
      const { data, err } = staticContext[location];
      staticData = data;
      staticError = err;
      this.hasStaticData = true;
      typeof window !== "undefined" && delete staticContext[location];
    }
    this.state = {
      ...staticData,
      staticError,
      loading: !this.hasStaticData,
    };
  }
  async componentDidMount() {
    // (3)
    if (!this.hasStaticData) {
      let staticData;
      let staticError;
      try {
        const data = await this.constructor.preloadAsyncData(this.props);
        staticData = data;
      } catch (err) {
        staticError = err;
      }
      this.setState({
        ...staticData,
        loading: false,
        staticError,
      });
    }
  }
}
