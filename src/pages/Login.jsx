import { Avatar, Link, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate()

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
                <TextField label='Username' placeholder="Enter username" variant="standard" fullWidth required />
                <TextField label='Password' placeholder="Enter password" type="password" variant="standard" fullWidth required />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
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