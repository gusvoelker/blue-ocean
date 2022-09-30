import { useState, useEffect } from 'react'

export default function FuncComponent({myProp}) {

  const [stateVariable, setStateVariable] = useState(null)

  return (
    <div className="functional-component">
      <p><b>Howdy, I'm a {myProp}!</b></p>
    </div>
  );

};
