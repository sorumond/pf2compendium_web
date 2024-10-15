import './CompendiumCheckbox.css';
import { useEffect, useState } from 'react';

export function CompendiumCheckbox(props: { label?, name?, value?, onChange?, defaultChecked?, checked?}) {

    const [label] = useState(props.label);
    const [name] = useState(props.name);
    const [value] = useState(props.value);
    const onChange = props.onChange;
    const [defaultChecked] = useState(props.defaultChecked);
    const [checked, setChecked] = useState(defaultChecked ? true : false);
    const [firstLoad, setFirstLoad] = useState(true);

    function handleClick() {
        setChecked(!checked);
        if (onChange) {
            onChange(!checked);
        }
    }

    useEffect(() => {
        if (firstLoad) {
            return;
        }
        if (props.checked != undefined) {
            setChecked(props.checked);
        }
    }, [props.checked]);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }
    }, []);

    return (
        <div onClick={() => handleClick()} style={{ cursor: 'pointer' }} className={`compendium-check-box ${checked ? 'Selected' : ''}`}>
            <input
                style={{ display: 'none' }}
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
            />
            <div style={{ pointerEvents: 'none' }}>{label}</div>
            <div style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0', pointerEvents: 'none' }}></div>

        </div>
    );
}

