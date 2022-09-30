import { useState, useEffect } from 'react'

export default function FuncComponent({myProp}) {

  // useState example
  const [funHex, setFunHex] = useState('FFFFFF');

  // useEffect example
  useEffect(() => {
    setTimeout(() => {
      let newHex = funHex.split('');
      let values = ['7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
      for (let i = 0; i < newHex.length; i++) {
        newHex[i] = values[Math.round(Math.random() * (values.length - 1))];
      }
      setFunHex(newHex.join(''));
    }, 500);
  }, [funHex]);

  return (
    <div className="functional-component">
      <p><b>Howdy, I'm a <span style={{'color': `#${funHex}`}}>{myProp}!</span></b></p>
    </div>
  );

};
