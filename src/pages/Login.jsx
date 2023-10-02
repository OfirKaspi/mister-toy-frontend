import { Avatar, Link, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { login } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useState } from "react";

export function Login() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(getEmptyCredentials())

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((credentials) => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        if (isSignupState) {
            try {
                const user = await signup(credentials)
                showSuccessMsg(`Welcome ${user.fullname}`)
            } catch (err) {
                showErrorMsg('Cannot signup')
            }
        }
    }

    const paperStyle = { padding: 20, height: 'fit-content', width: 300, margin: '50px 0 75px 0' }
    const avatarStyle = { backgroundColor: '#0077e0' }
    const marginStyle = { margin: '15px 0' }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2 style={marginStyle}>Sign in</h2>
                </Grid>
                <TextField
                    name="fullname"
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
                {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /> */}
                <Button type="submit" color="primary" variant="contained" style={marginStyle} fullWidth>Sign in</Button>
                <Typography>
                    <Link href="#" underline="hover">Forgot password</Link>
                </Typography>
                <Typography>
                    Don't have an account ?
                    <Link underline="hover" onClick={() => navigate('/signup')}> Sign in</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}