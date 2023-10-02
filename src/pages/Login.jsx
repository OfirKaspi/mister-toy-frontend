import { Avatar, Link, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
// import { login } from '../../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useState } from "react";
import { Warning } from "@mui/icons-material";
import { login } from "../store/actions/user.actions";

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

export function Login() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [cantLoginMsg, setCantLoginMsg] = useState('')

    const paperStyle = { padding: 20, width: 300, margin: '50px 0 75px 0' }
    const avatarStyle = { backgroundColor: '#0077e0' }
    const marginStyle = { margin: '15px 0' }

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((credentials) => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            console.log('here1');
            const user = await login(credentials)
            console.log('here2');
            showSuccessMsg(`Welcome ${user.fullname}`)
            navigate('/toy')
        } catch (err) {
            console.log('here3');
            showErrorMsg('Cannot signup')
            setCantLoginMsg('Wrong credantials')
        }
    }



    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2 style={marginStyle}>Sign in</h2>
                </Grid>
                <form onSubmit={onSubmit}>
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
                </form>
                <Typography>
                    <Link href="#" underline="hover">Forgot password</Link>
                </Typography>
                <Typography>
                    Don't have an account ?
                    <Link underline="hover" onClick={() => navigate('/auth/signup')}> Sign up</Link>
                </Typography>
                {cantLoginMsg && (
                    <Typography style={{ color: "#ff0000" }}>
                        {cantLoginMsg}
                    </Typography>
                )}
            </Paper>
        </Grid>
    )
}