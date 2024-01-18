import React, { Component } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null
        }
    };

    async componentDidMount(){
        fetch("/api/user-in-room").then((response) => response.json()).then((data) => {
            this.setState({
                roomCode: data.code
            })
        })
    }

    renderHomePage(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Home
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" spacing={3}>
                    <Button variant="contained" color="primary" to="/join" component={Link}>
                        Join a Room
                    </Button>
                    <Button variant="contained" color="secondary" to="/create" component={Link}>
                        Create a Room
                    </Button>
                </Grid>
            </Grid>
        )
    }
    render(){
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={
                        this.state.roomCode ? (
                            <Navigate replace to={`/room/${this.state.roomCode}`} />
                        ) : this.renderHomePage()} />
                    <Route exact path="/join" element={<RoomJoinPage/>}/>
                    <Route exact path="/create" element={<CreateRoomPage/>}/>
                    <Route exact path="/room/:roomCode" element={<Room/>}/>
                </Routes>
            </Router>
        );
    }
}
