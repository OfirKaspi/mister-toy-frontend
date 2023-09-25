import { useNavigate } from 'react-router-dom';
import { toyService } from '../services/toy.service.js';
import { saveToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, Grid, InputAdornment, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { MultiSelectLabels } from '../cmps/MultiSelectLabels.jsx';
import { utilService } from '../services/util.service.js';

export function ToyEdit() {
    const navigate = useNavigate()

    const [toyToAdd, setToyToAdd] = useState(toyService.getEmptyToy())
    console.log(toyToAdd);

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        setToyToAdd((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onAddRandomToy() {
        const toyToSave = toyService.getDefaultToy()
        console.log(toyToSave);
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
            .finally(() => {
                navigate('/toy')
            })
    }

    function onAddNewToy() {
        saveToy(toyToAdd)
            .then(addedToy => {
                showSuccessMsg(`Toy added (id: ${addedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
            .finally(() => {
                navigate('/toy')
            })
    }

    return (
        <>
            <div className="add-toy-container">

                <Typography gutterBottom variant='h5'>Add a new Toy</Typography >
                <Card style={{ maxWidth: 450, margin: '0 auto', padding: "10px 5px" }}>
                    <CardContent>
                        <form onSubmit={onAddNewToy}>
                            <Grid container spacing={1}>
                                <Grid xs={12} item>
                                    <TextField
                                        name='name'
                                        label='Toy Name'
                                        placeholder='Enter toy name'
                                        variant='outlined'
                                        value={toyToAdd.name}
                                        onChange={handleChange}
                                        fullWidth
                                        required />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        name='price'
                                        label='Price'
                                        placeholder='Enter toy price'
                                        variant='outlined'
                                        value={toyToAdd.price}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        fullWidth
                                        required />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <Select
                                        name="inStock"
                                        value={toyToAdd.inStock}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    >
                                        <MenuItem value={true}>In Stock</MenuItem>
                                        <MenuItem value={false}>Out of Stock</MenuItem>
                                    </Select>
                                </Grid>
                                {/* <Grid xs={12} item>
                                <MultiSelectLabels />
                            </Grid> */}
                                <Grid xs={12} item>
                                    <TextField
                                        name='description'
                                        label={'Description'}
                                        multiline rows={4}
                                        placeholder='Type your massage here'
                                        value={toyToAdd.description}
                                        onChange={handleChange}
                                        fullWidth
                                        required />
                                </Grid>
                                <Grid xs={12} item>
                                    <Button type='submit' variant='contained' color='primary' fullWidth >Submit</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className='add-toy-container'>
                <Typography gutterBottom variant='h5'>Add a random Toy</Typography >
                <Button onClick={onAddRandomToy} variant='contained' color='primary' fullWidth>Add a random toy</Button>
            </div>

        </>

    )
}