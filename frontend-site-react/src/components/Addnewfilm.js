import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Addnewfilm() {
    const [whouser, setWho] = React.useState();

    React.useEffect(() => {
        proverka();
    }, []);

    async function proverka() {
        let status;
        const response = await fetch("http://localhost:8080/getprocessuser2");
        await response.text()
            .then((json) => {
                status = json;
                if (status === 'NULL') {
                    setWho("NULL");
                    window.location.replace("/");
                }
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if (data.get('headname').length < 1 || data.get('urlimage').length < 1
            || data.get('director').length < 1 || data.get('zhanr').length < 1
            || data.get('year').length < 1 || data.get('aboutis').length < 1) {
            alert("Заполните все поля!");
            return;
        }
        
        const year = parseInt(data.get('year'));
        if (year < 1888 || year > new Date().getFullYear() + 5) {
            alert("Введите корректный год!");
            return;
        }

        const models = setfrom(data);
        utopia(models);
    };

    async function utopia(models) {
        let sms;
        console.log(models);
        const response = await fetch("http://localhost:8080/addnewfilm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(models)
        });
        await response.text()
            .then((json) => {
                sms = json;
            });
        alert(sms);
        var s = sms.split('');
        console.log(s);
        if (s[0] === '1') {
            window.location.replace('/allfilms');
        }
    };

    function setfrom(data) {
        let headname = data.get('headname');
        let urlimage = data.get('urlimage');
        let director = data.get('director');
        let year = parseInt(data.get('year'));
        let zhanr = data.get('zhanr');
        let aboutis = data.get('aboutis');

        let models = {
            headname, 
            urlimage, 
            director,
            year, 
            zhanr, 
            aboutis,
            marks: 0,
            rating: 0.0
        };
        return models;
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
                    <Avatar sx={{ m: 1, bgcolor: '#FF0000' }}>
                        <AddBoxIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Добавление Фильма
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
                                    autoFocus
                                    helperText="Введите полное название фильма"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="urlimage"
                                    label="Ссылка на постер фильма"
                                    name="urlimage"
                                    helperText="URL изображения постера"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="director"
                                    label="Режиссер"
                                    name="director"
                                    helperText="ФИО режиссера"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="zhanr"
                                    label="Жанр"
                                    name="zhanr"
                                    helperText="Например: Драма, Комедия, Фантастика"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="aboutis"
                                    label="Описание фильма"
                                    name="aboutis"
                                    helperText="Краткое описание сюжета"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    id="year"
                                    label="Год выпуска"
                                    name="year"
                                    inputProps={{ 
                                        min: 1888, 
                                        max: new Date().getFullYear() + 5 
                                    }}
                                    helperText={`От 1888 до ${new Date().getFullYear() + 5}`}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Добавить фильм
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}