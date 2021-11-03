import { ToggleButton, ButtonGroup} from 'react-bootstrap';
import { useState } from 'react';
import handleToggle from './handleToggle';
export default function ToggleButtons() {
  // const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Yes', value: '1' },
    { name: 'No', value: '2' },
    { name: 'Maybe', value: '3' },
  ];
    return (
      <>
      <ButtonGroup className="mb-2">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            
            onChange={function handleOptions(e) {
              setRadioValue(e.currentTarget.value)
              handleToggle(e)
            } }
            
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      </>
    );
  }