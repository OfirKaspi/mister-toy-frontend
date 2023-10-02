import { Avatar, Link, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { useState } from "react";

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki',
    }
}

export function Signup() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(getEmptyCredentials())

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((credentials) => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome ${user.fullname}`)
            navigate('/toy')
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    const { username, password, fullname } = credentials

    const paperStyle = { padding: 20, width: 300, margin: '50px 0 75px 0' }
    const avatarStyle = { backgroundColor: '#0077e0' }
    const marginStyle = { margin: '15px 0' }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}></Avatar>
                    <h2 style={marginStyle}>Register</h2>
                    <Typography variant="caption" gutterBottom>Please fill this form to create an accont</Typography>
                </Grid>
                <form onSubmit={onSubmit}>
                    <TextField
                        name="fullname"
                        label='Full Name'
                        placeholder="Enter full name"
                        variant="standard"
                        onChange={handleCredentialsChange}
                        fullWidth
                        required
                    />
                    {/* <TextField label='Email' placeholder="Enter email address" variant="standard" fullWidth required /> */}
                    <TextField
                        name="username"
                        label='Username'
                        placeholder="Enter username"
                        variant="standard"
                        onChange={handleCredentialsChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="password"
                        label='Password'
                        placeholder="Enter password"
                        type="password"
                        variant="standard"
                        onChange={handleCredentialsChange}
                        fullWidth
                        required
                    />
                    {/* <TextField label='Confirm Password' placeholder="Enter password" type="password" variant="standard" fullWidth required /> */}
                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /> */}
                    <Button type="submit" color="primary" variant="contained" style={marginStyle} fullWidth>Register</Button>
                </form>
                <Typography>
                    Do you have an account ?
                    <Link underline="hover" onClick={() => navigate('/auth/login')}> Sign in</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}