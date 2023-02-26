import React from "react";

type PassLenProps = {
  desc: string;
  min: number;
  max: number;
  init: number;
  updater: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PassLen(props: PassLenProps) {
  return (
    <>
      <span>{props.desc}</span>
      <input
        id="pass_len"
        type="number"
        min={props.min}
        max={props.max}
        defaultValue={props.init}
        onChange={props.updater}
      />
    </>
  );
}
