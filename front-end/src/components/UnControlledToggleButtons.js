import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import handleToggle from "../methods/handleToggle"

export default function UnControlledToggleButtons(){
  return (
          <>
            <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
              <ToggleButton variant = "secondary" id="yesButton" value={1} onChange = {(e) => handleToggle(e)}>
                Yes
              </ToggleButton>
              <ToggleButton variant = "secondary" id="noButton" value={2} onChange = {(e) => handleToggle(e)}>
                No
              </ToggleButton>
              <ToggleButton variant = "secondary" id="maybeButton" value={3} onChange = {(e) => handleToggle(e)}>
                Maybe
              </ToggleButton>
            </ToggleButtonGroup>
          </>
          )
}

