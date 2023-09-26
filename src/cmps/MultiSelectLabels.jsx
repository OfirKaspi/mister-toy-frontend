import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { toyService } from '../services/toy.service';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const labels = toyService.getLabels()

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export function MultiSelectLabels({ setLabels }) {
    const theme = useTheme();
    const [labelsNames, setPersonName] = useState([]);

    useEffect(() => {
        setLabels(labelsNames)
    }, [labelsNames])

    const handleChange = (event) => {
        const { target: { value } } = event
        setPersonName(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <>
            <FormControl fullWidth>
                <InputLabel >Labels</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    multiple
                    value={labelsNames}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Labels" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {labels.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, labelsNames, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}