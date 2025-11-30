import * as React from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Grid, TextField } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MovieIcon from '@mui/icons-material/Movie';

export default function Myfriends() {
    const [friends, setFriends] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        fetchMyFriends();
    }, []);

    async function fetchMyFriends() {
        const response = await fetch("http://localhost:8080/allmyfriend");
        const result = await response.json();
        setFriends(result);
    }

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        
        if (term.length > 0) {
            const searchData = { login: term };
            fetch("http://localhost:8080/allmyfriendsort", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(searchData)
            })
            .then(res => res.json())
            .then((result) => {
                setFriends(result);
            });
        } else {
            fetchMyFriends();
        }
    };

    async function removeFriend(friendRelationship) {
        let result;
        const response = await fetch("http://localhost:8080/deleteonmyfriend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(friendRelationship)
        });
        
        await response.text()
            .then((json) => {
                result = json;
            });
        
        if (result === 'GOOD') {
            alert("Пользователь удален из друзей!");
            fetchMyFriends();
        } else {
            alert("Ошибка при удалении!");
        }
    }

    const viewUserCollection = (user) => {
        window.location.href = `/showusercollection?id=${user.id}&login=${user.login}`;
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Мои друзья
                </Typography>
                
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Поиск друзей..."
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ mb: 3 }}
                />

                <Grid container spacing={2}>
                    {friends.map(friend => (
                        <Grid item xs={12} key={friend.id}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography variant="h6">
                                                {friend.userstwo.login}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Email: {friend.userstwo.email}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            {friend.userstwo.showotherfilms && (
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<MovieIcon />}
                                                    onClick={() => viewUserCollection(friend.userstwo)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Коллекция
                                                </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={<PersonRemoveIcon />}
                                                onClick={() => removeFriend(friend)}
                                            >
                                                Удалить
                                            </Button>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {friends.length === 0 && (
                    <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
                        У вас пока нет друзей
                    </Typography>
                )}
            </Box>
        </Container>
    );
}