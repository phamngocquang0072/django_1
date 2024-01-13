import React, { Component } from 'react';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';


class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: '',
        };
        this.handleRoomCodeChange = this.handleRoomCodeChange.bind(this);
        this.enterRoom = this.enterRoom.bind(this);
    };

    handleRoomCodeChange = (e) => {
        this.setState({
            roomCode: e.target.value
        })
    }

    enterRoom = () => {
        const requestOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: this.state.roomCode
            })
        }
        fetch("/api/join-room/", requestOption).then((response) => {
            if (response.ok) {
                this.props.navigate(`/room/${this.state.roomCode}`)
            } else {
                this.props.navigate(`/`)
            }
        })
    }
    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}  align="center">
                    <Typography component="h4" variant="h4">
                        Join A Room
                    </Typography>
                </Grid>
                <Grid item xs={12}  align="center">
                    <TextField
                        label="Code"
                        placeholder="Enter a Room Code"
                        variant="outlined"
                        onChange={this.handleRoomCodeChange}
                    />
                </Grid>
                <Grid item xs={12}  align="center">
                    <Button variant="contained" color="primary" onClick={this.enterRoom}>
                        Enter Room
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
function RoomJoinWrapper() {
  const navigate = useNavigate();

  return <RoomJoinPage navigate={navigate} />;
}
export default RoomJoinWrapper;