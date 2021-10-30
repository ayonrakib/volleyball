import {ButtonGroup, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import { useState } from 'react';
export default function ToggleButtons() {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('0');
  
    const radios = [
      { name: 'Yes', value: '1' },
      { name: 'No', value: '2' },
      { name: 'Maybe', value: '3' },
    ];
  
    return (
      <>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              name="radio"
              value={radio.value}
              variant = "secondary"
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
  }