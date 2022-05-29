import "./navigationbuttons.scss";
import { ReactComponent as ArrowRight } from "../../assets/svg/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../../assets/svg/arrow-left.svg";

function NextButton() {
  return (
    <div className="navigation">
      <p style={{ marginRight: "7px" }}>Next</p>
      <ArrowRight />
      {/* <i className="fi fi-rr-arrow-right"></i> */}
    </div>
  );
}
function SubmitButton() {
  return (
    <div className="navigation">
      <p style={{ marginRight: "7px" }}>Submit</p>
      <ArrowRight />
      {/* <i className="fi fi-rr-arrow-right"></i> */}
    </div>
  );
}
function PreviousButton() {
  return (
    <div className="navigation">
      <ArrowLeft />
      <p style={{ marginLeft: "7px" }}>Last</p>
    </div>
  );
}

export { NextButton, PreviousButton, SubmitButton };
