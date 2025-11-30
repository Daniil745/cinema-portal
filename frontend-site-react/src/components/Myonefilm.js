import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Card, CardMedia, Button, TextField, Rating, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Myonefilm() {
    const location = useLocation();
    const navigate = useNavigate();
    const [film, setFilm] = React.useState(null);
    const [rating, setRating] = React.useState(0);
    const [status, setStatus] = React.useState('');

    React.useEffect(() => {
        if (location.state) {
            setFilm(location.state);
            setRating(location.state.ratinguser || 0);
            setStatus(location.state.statuscinema || 'Без статуса просмотра');
        }
    }, [location]);

    const handleSave = async () => {
        const updatedFilm = {
            ...film,
            ratinguser: rating,
            statuscinema: status
        };

        const response = await fetch("http://localhost:8080/savechangemyfilm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFilm)
        });
        
        const result = await response.text();
        alert(result);
    };

    const handleDelete = async () => {
        if (window.confirm("Вы уверены, что хотите удалить этот фильм из своей коллекции?")) {
            const response = await fetch("http://localhost:8080/deleteonemyfilm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(film.cinemas)
            });
            
            const result = await response.text();
            alert(result);
            
            if (result.startsWith('1.')) {
                navigate('/myfilms');
            }
        }
    };

    if (!film) {
        return (
            <Container>
                <Typography>Фильм не найден</Typography>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/myfilms')}
                    sx={{ mb: 3 }}
                >
                    Назад к коллекции
                </Button>

                <Card>
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                        {/* Постер фильма */}
                        <Box flex={1}>
                            <CardMedia
                                component="img"
                                height="500"
                                image={film.cinemas.urlimage}
                                alt={film.cinemas.headname}
                                sx={{ objectFit: 'cover' }}
                            />
                        </Box>

                        {/* Информация о фильме */}
                        <Box flex={2} sx={{ p: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                {film.cinemas.headname}
                            </Typography>
                            
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                {film.cinemas.director} • {film.cinemas.year} • {film.cinemas.zhanr}
                            </Typography>

                            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                                {film.cinemas.aboutis}
                            </Typography>

                            {/* Рейтинг фильма на портале */}
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6">Рейтинг на портале:</Typography>
                                <Rating value={film.cinemas.rating} readOnly precision={0.1} />
                                <Typography variant="body2">
                                    {film.cinemas.rating} из 10 ({film.cinemas.marks} оценок)
                                </Typography>
                            </Box>

                            {/* Личные настройки */}
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" gutterBottom>Ваши настройки:</Typography>
                                
                                <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                                    <InputLabel>Статус просмотра</InputLabel>
                                    <Select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        label="Статус просмотра"
                                    >
                                        <MenuItem value="Без статуса просмотра">Без статуса просмотра</MenuItem>
                                        <MenuItem value="Просмотрено">Просмотрено</MenuItem>
                                        <MenuItem value="В планах">В планах</MenuItem>
                                        <MenuItem value="Смотрю">Смотрю</MenuItem>
                                        <MenuItem value="Брошено">Брошено</MenuItem>
                                    </Select>
                                </FormControl>

                                <Box sx={{ mt: 2 }}>
                                    <Typography component="legend">Ваша оценка:</Typography>
                                    <Rating
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                        precision={0.5}
                                        size="large"
                                    />
                                    <Typography variant="body2">
                                        {rating > 0 ? `Ваша оценка: ${rating}` : 'Еще не оценено'}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Кнопки действий */}
                            <Box sx={{ mt: 4 }} display="flex" gap={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSave}
                                    size="large"
                                >
                                    Сохранить изменения
                                </Button>
                                
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDelete}
                                    size="large"
                                >
                                    Удалить из коллекции
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
}