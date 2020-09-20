import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            <code>Jack Burgess</code>
          </h2>

          <h3>
            <code>
              Software Engineer @{" "}
              <a
                href="https://www.clock.co.uk/"
                target="_blank"
                rel="noreferrer noopener nofollow"
              >
                Clock Limited
              </a>
              <br />
              CTO @{" "}
              <a
                href="https://whitethorne.co.uk/"
                target="_blank"
                rel="noreferrer noopener nofollow"
              >
                Whitethorne Limited
              </a>
            </code>
          </h3>

          <h4>
            <code>React | NodeJS | React Native</code>
          </h4>

          <h4>
            Check out{" "}
            <a
              href="https://pubgrub.app/"
              target="_blank"
              rel="noreferrer noopener nofollow"
            >
              PubGrub
            </a>
          </h4>
        </header>
      </div>
    );
  }
}

export default App;
