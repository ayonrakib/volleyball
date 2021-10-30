import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

export default function ToggleButtonGroupControlled() {
    const [value, setValue] = useState([1, 3]);
  
    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => setValue(val);
  
    return (
      <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
        <ToggleButton variant = "secondary" id="tbg-btn-1 yes-button" value={1}>
          Yes
        </ToggleButton>
        <ToggleButton id="tbg-btn-2 no-button" value={2}>
          No
        </ToggleButton>
        <ToggleButton id="tbg-btn-3 maybe-button" value={3}>
          Maybe
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }