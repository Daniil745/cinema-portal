import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Rating from '@mui/material/Rating';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';

export default function Allfilms() {
    const navigate = useNavigate();
    const [whouser, setWho] = React.useState();
    const [item, setItem] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:8080/allfilms")
            .then(res => res.json())
            .then((result) => {
                setItem(result);
            });
        proverka();
    }, []);

    async function addonmyfilms(myfilm) {
        let accounts;
        const response = await fetch("http://localhost:8080/addmyfilm/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(myfilm)
        });
        response.text()
            .then((json) => {
                accounts = json;
                if (accounts === 'ERROR') {
                    alert("Данный фильм уже есть в вашей коллекции");
                }
                if (accounts === 'GOOD') {
                    alert("Фильм добавлен в вашу коллекцию");
                }
            });
    }

    async function editfilm(myfilm) {
        navigate("/editfilm", { state: myfilm });
    }

    async function proverka() {
        let status;
        const response = await fetch("http://localhost:8080/getprocessuser2");
        await response.text()
            .then((json) => {
                status = json;
                setWho(status);
            });
    }

    const handleChange = (event) => {
        let headname = event.target.value;
        const idd = { headname };
        fetch("http://localhost:8080/allfilmssort", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(idd)
        })
            .then(res => res.json())
            .then((result) => {
                setItem(result);
            });
    };

    return (
        <>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <FormControl variant="standard" sx={{ minWidth: 300 }}>
                    <InputLabel htmlFor="component-simple">ПОИСК...</InputLabel>
                    <Input id="idmarka" onChange={handleChange} />
                </FormControl>
            </div>

            <Container component="main" maxWidth="100%">
                <Grid container spacing={3} sx={{ padding: '20px' }}>
                    {item.map(item => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            <Card sx={{ maxWidth: 330, mt: 3 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={item.urlimage}
                                        alt={item.headname}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.headname}
                                        </Typography>
                                        {whouser === "ADMIN" &&
                                            <Button sx={{ mt: 0, mb: 1, width: 150, height: 25 }} 
                                                variant="contained"
                                                onClick={() => { editfilm(item) }}>
                                                Редактировать
                                            </Button>
                                        }
                                        <Typography variant="body2" color="text.secondary">
                                            {item.director} - {item.year}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Жанр: {item.zhanr}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Оценок фильма на портале: {item.marks}
                                        </Typography>
                                        <Rating name="half-rating-read" 
                                            defaultValue={item.rating} 
                                            precision={0.5} 
                                            readOnly />
                                        {whouser !== "NULL" &&
                                            <Button sx={{ mt: 1, width: '100%', height: 35 }} 
                                                variant="contained"
                                                onClick={() => { addonmyfilms(item) }} 
                                                endIcon={<EditIcon />}>
                                                Добавить в мои фильмы
                                            </Button>
                                        }
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}