import React from 'react'

export default class ClassComponent extends React.Component {

  // PROPS:
  // props.myProp - Name of the component, provided from App.jsx
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="class-component">
        <p><i>Nice to meet you, I'm a {this.props.myProp}.</i></p>
      </div>
    );
  }

}
