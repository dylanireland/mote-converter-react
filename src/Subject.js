import React from "react";
import "./subject.css";
import Fields from "./Field";

export default function Subject() {
  return (
    <div id="subject">
      <div id="header">
        <h1>
          MoteConverter<b className="colorific">.xyz</b>
        </h1>
        <p>
          MoteConverter<b className="colorific">.xyz</b> is a simple tool to
          easily convert motes to CSPR and vice versa
        </p>
      </div>
      <div id="fields">
        <Fields />
      </div>
    </div>
  );
}
