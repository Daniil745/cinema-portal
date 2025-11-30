import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

export default function Showusercollection() {
    const location = useLocation();
    const [films, setFilms] = React.useState([]);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');
        const userLogin = urlParams.get('login');
        
        if (userId && userLogin) {
            setUser({ id: parseInt(userId), login: userLogin });
            fetchUserCollection(parseInt(userId));
        }
    }, [location]);

    async function fetchUserCollection(userId) {
        const userData = { id: userId };
        const response = await fetch("http://localhost:8080/showusercollection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        setFilms(result);
    }

    const handleSearch = (event) => {
        const headname = event.target.value;
        if (user && headname.length > 0) {
            const searchData = { headname: headname, id: user.id };
            fetch("http://localhost:8080/showusercollectionsort", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(searchData)
            })
            .then(res => res.json())
            .then((result) => {
                setFilms(result);
            });
        } else if (user) {
            fetchUserCollection(user.id);
        }
    };

    return (
        <Container component="main" maxWidth="100%">
            <Box sx={{ mt: 4, mb: 4 }}>
                {user && (
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Коллекция фильмов пользователя: {user.login}
                    </Typography>
                )}
                
                <Box textAlign="center" sx={{ mb: 3 }}>
                    <FormControl variant="standard" sx={{ minWidth: 300 }}>
                        <InputLabel htmlFor="search-collection">Поиск в коллекции...</InputLabel>
                        <Input id="search-collection" onChange={handleSearch} />
                    </FormControl>
                </Box>

                <Grid container spacing={3}>
                    {films.map(film => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={film.id}>
                            <Card sx={{ maxWidth: 330 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={film.cinemas.urlimage}
                                        alt={film.cinemas.headname}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {film.cinemas.headname}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {film.cinemas.director} - {film.cinemas.year}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Статус: {film.statuscinema}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Оценка пользователя:
                                        </Typography>
                                        <Rating 
                                            value={film.ratinguser} 
                                            readOnly 
                                            precision={0.5} 
                                        />
                                        <Typography variant="body2" color="text.secondary">
                                            ({film.ratinguser > 0 ? film.ratinguser : 'Не оценено'})
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {films.length === 0 && (
                    <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
                        Коллекция пуста или недоступна для просмотра
                    </Typography>
                )}
            </Box>
        </Container>
    );
}