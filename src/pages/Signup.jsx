import { Avatar, Link, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export function Signup() {
    const navigate = useNavigate()

    const paperStyle = { padding: 20, minHeight: '50vh', width: 300, margin: '50px 0 75px 0' }
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
                <form>
                    <TextField label='Full Name' placeholder="Enter full name" variant="standard" fullWidth required />
                    <TextField label='Email' placeholder="Enter email address" variant="standard" fullWidth required />
                    <TextField label='Username' placeholder="Enter username" variant="standard" fullWidth required />
                    <TextField label='Password' placeholder="Enter password" type="password" variant="standard" fullWidth required />
                    <TextField label='Confirm Password' placeholder="Enter password" type="password" variant="standard" fullWidth required />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                    <Button type="submit" color="primary" variant="contained" style={marginStyle} fullWidth>Register</Button>
                    <Typography>
                        Do you have an account ?
                        <Link underline="hover" onClick={() => navigate('/login')}> Sign in</Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    )
}