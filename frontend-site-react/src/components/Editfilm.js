import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Editfilm() {
    const location = useLocation();
    const navigate = useNavigate();
    const [film, setFilm] = React.useState(null);

    React.useEffect(() => {
        if (location.state) {
            setFilm(location.state);
        }
    }, [location]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const updatedFilm = {
            id: film.id,
            headname: data.get('headname'),
            urlimage: data.get('urlimage'),
            director: data.get('director'),
            zhanr: data.get('zhanr'),
            aboutis: data.get('aboutis'),
            year: parseInt(data.get('year'))
        };

        updateFilm(updatedFilm);
    };

    async function updateFilm(updatedFilm) {
        let result;
        const response = await fetch("http://localhost:8080/editfilm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFilm)
        });
        
        await response.text()
            .then((json) => {
                result = json;
            });
        
        alert(result);
        if (result.startsWith('1.')) {
            navigate('/allfilms');
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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Редактирование фильма
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="headname"
                                    required
                                    fullWidth
                                    id="headname"
                                    label="Название фильма"
                                    defaultValue={film.headname}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="urlimage"
                                    label="Постер фильма"
                                    name="urlimage"
                                    defaultValue={film.urlimage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="director"
                                    label="Режиссер"
                                    name="director"
                                    defaultValue={film.director}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="zhanr"
                                    label="Жанр"
                                    name="zhanr"
                                    defaultValue={film.zhanr}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="aboutis"
                                    label="Описание"
                                    name="aboutis"
                                    defaultValue={film.aboutis}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    id="year"
                                    label="Год"
                                    name="year"
                                    defaultValue={film.year}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Сохранить изменения
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}