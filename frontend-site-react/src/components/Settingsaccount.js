import * as React from 'react';
import { Container, Typography, Box, Card, CardContent, Switch, FormControlLabel, Button, TextField, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import KeyIcon from '@mui/icons-material/Key';

export default function Settingsaccount() {
    const [user, setUser] = React.useState({});
    const [passwordForm, setPasswordForm] = React.useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    React.useEffect(() => {
        fetchAccountData();
    }, []);

    async function fetchAccountData() {
        const response = await fetch("http://localhost:8080/getAccount");
        const result = await response.json();
        setUser(result);
    }

    const handlePrivacyChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.checked
        });
    };

    const handlePasswordChange = (event) => {
        setPasswordForm({
            ...passwordForm,
            [event.target.name]: event.target.value
        });
    };

    const savePrivacySettings = async () => {
        const response = await fetch("http://localhost:8080/savechangemyaccount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        
        const result = await response.text();
        alert(result);
    };

    const changePassword = async () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("Новые пароли не совпадают!");
            return;
        }

        const passwordData = {
            login: passwordForm.oldPassword, // старое поле для старого пароля
            password: passwordForm.newPassword,
            email: passwordForm.confirmPassword // повтор пароля
        };

        const response = await fetch("http://localhost:8080/savemynewpass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(passwordData)
        });
        
        const result = await response.text();
        alert(result);
        
        if (result.startsWith('1.')) {
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Настройки аккаунта
                </Typography>

                {/* Настройки приватности */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Настройки приватности
                        </Typography>
                        
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={user.showforaddfr || false}
                                    onChange={handlePrivacyChange}
                                    name="showforaddfr"
                                />
                            }
                            label="Разрешить другим пользователям добавлять меня в друзья"
                        />
                        
                        <Box sx={{ mt: 1 }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={user.showotherfilms || false}
                                        onChange={handlePrivacyChange}
                                        name="showotherfilms"
                                    />
                                }
                                label="Показывать мою коллекцию фильмов друзьям"
                            />
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={savePrivacySettings}
                            sx={{ mt: 2 }}
                        >
                            Сохранить настройки
                        </Button>
                    </CardContent>
                </Card>

                {/* Смена пароля */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Смена пароля
                        </Typography>
                        
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Старый пароль"
                                    name="oldPassword"
                                    value={passwordForm.oldPassword}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Новый пароль"
                                    name="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Подтвердите новый пароль"
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            variant="contained"
                            startIcon={<KeyIcon />}
                            onClick={changePassword}
                            sx={{ mt: 2 }}
                        >
                            Сменить пароль
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}