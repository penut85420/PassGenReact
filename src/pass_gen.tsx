import React from "react";
import PassLen from "./pass_len";
import { useState, useEffect } from "react";

export default function App() {
  const [passLen, setPassLen] = useState(32);
  const [genPass, setGenPass] = useState("");
  const [useDigit, setUseDigit] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useSymbol, setUseSymbol] = useState(false);
  const [validChars, setValidChars] = useState("");

  useEffect(() => {
    let validCharsTemp = "";
    if (useDigit) validCharsTemp += "0123456789";
    if (useLower) validCharsTemp += "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) validCharsTemp += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useSymbol) validCharsTemp += "!\";#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    setValidChars(validCharsTemp);
  }, [useDigit, useLower, useUpper, useSymbol]);

  function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassLen(parseInt(event.target.value));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const array = new Uint32Array(passLen);
    self.crypto.getRandomValues(array);

    let pass = "";
    for (const num of array) {
      let idx = num % validChars.length;
      pass += validChars[idx];
    }
    setGenPass(pass);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Password Generator</h1>
        <PassLen
          desc={"Password Length:"}
          min={1}
          max={128}
          init={32}
          updater={handleNumberChange}
        />
        <div>
          <table>
            <CheckBox
              title={"Digits"}
              eg={"12345"}
              checked={useDigit}
              setTarget={setUseDigit}
            />
            <CheckBox
              title={"Lowercase"}
              eg={"abcde"}
              checked={useLower}
              setTarget={setUseLower}
            />
            <CheckBox
              title={"Uppercase"}
              eg={"ABCDE"}
              checked={useUpper}
              setTarget={setUseUpper}
            />
            <CheckBox
              title={"Symbols"}
              eg={"_!+*/"}
              checked={useSymbol}
              setTarget={setUseSymbol}
            />
          </table>
        </div>
        <input type={"submit"} value="Generate" />
      </form>
      <div>
        <span>Result: </span>
        <input id="pass_result" type={"text"} value={genPass} />
      </div>
    </>
  );
}

type CheckBoxProps = {
  title: string;
  eg: string;
  checked: boolean;
  setTarget: React.Dispatch<React.SetStateAction<boolean>>;
};

function CheckBox(props: CheckBoxProps) {
  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    props.setTarget(event.target.checked);
  }

  return (
    <tr>
      <td>
        <input
          type={"checkbox"}
          checked={props.checked}
          onChange={handleCheck}
        />
        <label>{props.title}</label>
      </td>
      <td>{"(e.g. " + props.eg + ")"}</td>
    </tr>
  );
}
