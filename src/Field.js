import { React, useRef } from "react";
import "./field.css";
import BigNumber from "bignumber.js";

export default function Fields(props) {
  const fieldReference = useRef();

  function handleCSPRChange(e) {
    const csprValue = fieldReference.current.children[0].firstChild.value;
    let cspr = new BigNumber(csprValue);

    if (csprValue == "") {
        fieldReference.current.children[1].firstChild.value = ""
        return
    }

    if (isNaN(cspr)) {
        fieldReference.current.children[0].firstChild.value = csprValue.slice(0, -1)
        return
    }

    fieldReference.current.children[1].firstChild.value = cspr.times("1e9").toFixed();
  }

  function handleMoteChange(e) {
    const moteValue = fieldReference.current.children[1].firstChild.value
    let motes = new BigNumber(moteValue);

    if (moteValue == "") {
        fieldReference.current.children[0].firstChild.value = ""
        return
    }

    if (isNaN(motes)) {
        fieldReference.current.children[1].firstChild.value = moteValue.slice(0, -1)
        return
    }

    fieldReference.current.children[0].firstChild.value = motes
      .times("1e-9")
      .toFixed();
  }


  return (
    <div ref={fieldReference}>
      <div className="field">
        <input type="text" onInput={handleCSPRChange}></input>
        <div>
          <p>CSPR</p>
        </div>
      </div>
      <div className="field">
        <input type="text" onInput={handleMoteChange}></input>
        <div>
          <p>Motes</p>
        </div>
      </div>
    </div>
  );
}
