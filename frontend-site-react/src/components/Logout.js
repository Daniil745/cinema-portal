import React, { useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

export default function Logout() {
    
    useEffect(() => {
        logout();
    }, []);

    async function logout() {
        const response = await fetch("http://localhost:8080/deauth");
        await response.text();
        window.location.replace("/");
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography component="h1" variant="h4" gutterBottom>
                    Выход из системы
                </Typography>
                <Typography variant="body1" paragraph>
                    Выполняется выход...
                </Typography>
                <CircularProgress />
            </Box>
        </Container>
    );
}