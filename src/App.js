import { useState } from "react";

//The App component is the Primary/ Grandparent component, it is the parent component of the Tip component.
export default function App() {
  return (
    <div>
      <Tip />
    </div>
  );
}

//The tip component is a parent component of the below 4 components and it is the child component of the App component, making the App component a grandparent component.
//The tip component calls the 4 sibling components in itself. The tag < Component /> is basically a messenger with transfers data from parent to child. With each component tag, it can relay customized data to each component.
//If the parent component has it's children component with both opening and closing tags, then the content between those tags can be passed on to it's children through the {children} prop(property).

//To reset and use the reset button, we have add new values to all the existing props. if we change all the existing values to zero it will give the illusion of starting again.
function Tip() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }
  return (
    <div>
      <Bill bill={bill} onSetBill={setBill} />
      <Service percentage={percentage1} onSelect={setPercentage1}>
        How did you like the experience?
      </Service>
      <Service percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the experience?
      </Service>
      <Total bill={bill} tip={tip} />
      <Reset onReset={handleReset} />
    </div>
  );
}

//The components below are sibling components, children component of the Tip component
function Bill({ bill, onSetBill }) {
  function handleBill(e) {
    onSetBill(Number(e.target.value));
  }

  return (
    <div>
      <form>
        <label>
          How much was the bill?
          <input
            type="text"
            name="bill"
            placeholder="bill amount"
            value={bill}
            onChange={handleBill}
          />
        </label>
      </form>
    </div>
  );
}

function Service({ children, percentage, onSelect }) {
  return (
    <div>
      <form>
        <label>
          {children}
          <select
            value={percentage}
            onChange={(e) => onSelect(Number(e.target.value))}
          >
            <option value="0">Dissatisfied (0%)</option>
            <option value="5">Fine (5%)</option>
            <option value="10">Good (10%)</option>
            <option value="20">Amazing (20%)</option>
          </select>
        </label>
      </form>
    </div>
  );
}

//The total component has data from the Bill component and the Service component, and since data cannot be passed from siblings, their data is created in the parent component(<Bill/>, <Service/>) which then sends it to the child <Total/>.
function Total({ bill, tip }) {
  return (
    <h2>
      You will be paying ${bill + tip} (${bill} + ${tip})
    </h2>
  );
}

function Reset({ onReset }) {
  return (
    <button type="reset" onClick={onReset}>
      Reset
    </button>
  );
}
