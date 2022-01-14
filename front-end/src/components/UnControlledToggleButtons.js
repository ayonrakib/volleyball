import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import handleToggle from "../methods/handleToggle"

export default function UnControlledToggleButtons(props){
  return (
          <>
            <ToggleButtonGroup type="radio" name={`options-${props.id}`} defaultValue={0}>
              <ToggleButton variant = "secondary" id={`yesButton-${props.id}`} value={1} onChange = {(e) => handleToggle(e)}>
                Yes
              </ToggleButton>
              <ToggleButton variant = "secondary" id={`noButton-${props.id}`} value={2} onChange = {(e) => handleToggle(e)}>
                No
              </ToggleButton>
              <ToggleButton variant = "secondary" id={`maybeButton-${props.id}`} value={3} onChange = {(e) => handleToggle(e)}>
                Maybe
              </ToggleButton>
            </ToggleButtonGroup>
          </>
          )
}

