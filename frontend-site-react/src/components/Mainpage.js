import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Mainpage() {
    const [whouser, setWho] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        proverka();
    }, []);

    async function proverka() {
        let status;
        const response = await fetch("http://localhost:8080/getprocessuser2");
        await response.text()
            .then((json) => {
                status = json;
                setWho(status);
                if (status !== 'NULL') {
                    navigate("/allfilms");
                }
            });
    }

    const handleClickReg = async (e) => {
        e.preventDefault();
        navigate("/signin");
    }

    const handleClickEnter = async (e) => {
        e.preventDefault();
        navigate("/signup");
    }

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography component="h1" variant="h2" gutterBottom>
                    Добро пожаловать в FILMBASE
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Собирайте свою коллекцию фильмов, делитесь ей с друзьями и открывайте новые кинокартины
                </Typography>
                
                {whouser === "NULL" && (
                    <Box sx={{ mt: 4 }}>
                        <Button
                            variant="contained"
                            onClick={handleClickReg}
                            color="primary"
                            size="large"
                            sx={{ mr: 2 }}
                        >
                            ВХОД
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClickEnter}
                            color="secondary"
                            size="large"
                        >
                            РЕГИСТРАЦИЯ
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
}