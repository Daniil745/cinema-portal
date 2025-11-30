import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';

export default function Myfilms() {
    const navigate = useNavigate();
    const [item, setItem] = React.useState([]);

    React.useEffect(() => {
        fetchMyFilms();
    }, []);

    async function fetchMyFilms() {
        const response = await fetch("http://localhost:8080/allmyfilms");
        const result = await response.json();
        setItem(result);
    }

    const handleChange = (event) => {
        let headname = event.target.value;
        const searchData = { headname };
        fetch("http://localhost:8080/allmyfilmssort", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(searchData)
        })
            .then(res => res.json())
            .then((result) => {
                setItem(result);
            });
    };

    const handleFilmClick = (film) => {
        navigate("/myonefilm", { state: film });
    };

    return (
        <>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <FormControl variant="standard" sx={{ minWidth: 300 }}>
                    <InputLabel htmlFor="search-my-films">ПОИСК В МОИХ ФИЛЬМАХ...</InputLabel>
                    <Input id="search-my-films" onChange={handleChange} />
                </FormControl>
            </div>

            <Container component="main" maxWidth="100%">
                <Grid container spacing={3} sx={{ padding: '20px' }}>
                    {item.map(item => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            <Card sx={{ maxWidth: 330 }}>
                                <CardActionArea onClick={() => handleFilmClick(item)}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={item.cinemas.urlimage}
                                        alt={item.cinemas.headname}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.cinemas.headname}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.cinemas.director} - {item.cinemas.year}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Статус: {item.statuscinema}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Ваша оценка: {item.ratinguser > 0 ? item.ratinguser : 'Не оценено'}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}