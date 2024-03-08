'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
interface sportsCardInterface {
    leagueNameAbv: string,
    leagueNameFull: string,
    image: string
}
export default function SportsCard({ leagueNameAbv, leagueNameFull, image }: sportsCardInterface) {
    const router = useRouter()
    return (
        <div
            className='hover:cursor-pointer'
            onClick={() => {
                router.push(`/${leagueNameAbv}`)
            }}>
            <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {leagueNameAbv}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {leagueNameFull}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}