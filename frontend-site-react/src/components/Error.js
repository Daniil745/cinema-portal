import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Error() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

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
                <Typography component="h1" variant="h1" color="error" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Страница не найдена
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Извините, запрашиваемая страница не существует.
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleGoHome}
                    size="large"
                >
                    На главную
                </Button>
            </Box>
        </Container>
    );
}