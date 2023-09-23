import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';

import { useNavigate } from "react-router-dom";
import { utilService } from '../services/util.service';

export function ToyPreview({ toy, onRemoveToy, onEditToy }) {
    const navigate = useNavigate();

    const onNavToDetails = () => {
        navigate(`/toy/${toy._id}`)
    }

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardActionArea onClick={onNavToDetails}>
                <img src={utilService.getAssetSrc('logo.png')} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {toy.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {toy.labels.map((label, idx) => (
                            <span className='label-span' key={idx}>{label}</span>
                        ))}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {toy.inStock ? <span className="green">Available in store</span> : <span className="red">Out of stock</span>}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className='flex justify-between'>
                <button onClick={() => onEditToy(toy)}>Edit</button>
                <span className='icon' onClick={() => onRemoveToy(toy._id)}><AiOutlineDelete size="2rem" /></span>
            </CardActions>
        </Card>
    )
}