import * as React from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Grid, TextField } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Searchfriend() {
    const [users, setUsers] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        fetchAllUsers();
    }, []);

    async function fetchAllUsers() {
        const response = await fetch("http://localhost:8080/allusersforfriend");
        const result = await response.json();
        setUsers(result);
    }

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        
        if (term.length > 0) {
            const searchData = { login: term };
            fetch("http://localhost:8080/allusersforfriendsort", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(searchData)
            })
            .then(res => res.json())
            .then((result) => {
                setUsers(result);
            });
        } else {
            fetchAllUsers();
        }
    };

    async function addFriend(user) {
        let result;
        const response = await fetch("http://localhost:8080/addmyfriend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        
        await response.text()
            .then((json) => {
                result = json;
            });
        
        if (result === 'GOOD') {
            alert("Пользователь добавлен в друзья!");
            fetchAllUsers();
        } else if (result === 'ERROR') {
            alert("Нельзя добавить себя в друзья!");
        } else if (result === 'ERROR1') {
            alert("Этот пользователь уже у вас в друзьях!");
        }
    }

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Поиск друзей
                </Typography>
                
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Поиск по логину..."
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ mb: 3 }}
                />

                <Grid container spacing={2}>
                    {users.map(user => (
                        <Grid item xs={12} key={user.id}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography variant="h6">
                                                {user.login}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Email: {user.email}
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            startIcon={<PersonAddIcon />}
                                            onClick={() => addFriend(user)}
                                        >
                                            Добавить в друзья
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {users.length === 0 && (
                    <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
                        Пользователи не найдены
                    </Typography>
                )}
            </Box>
        </Container>
    );
}