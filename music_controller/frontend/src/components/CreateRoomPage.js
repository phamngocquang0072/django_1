import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useNavigate } from "react-router-dom";

class CreateRoomPage extends Component {
    DefaultVotes = 3;
    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.DefaultVotes
        };
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    };

    handleVotesChange = (e) => {
        this.setState({
            votesToSkip: e.target.value
        });
    }

    handleGuestCanPauseChange = (e) => {
        this.setState({
            guestCanPause: e.target.value === 'true' ? true : false
        });
    }

    handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };
        fetch("/api/create/", requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.navigate(`/room/${data.code}`));
    }
    render() {
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Hi, how's it going?
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
                        <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        label="Play/Pause"
                        labelPlacement="bottom"
                        />
                        <FormControlLabel
                        value="false"
                        control={<Radio color="primary" />}
                        label="No Control"
                        labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                    required={true}
                    type="number"
                    defaultValue={this.DefaultVotes}
                    onChange={this.handleVotesChange}
                    inputProps={{ min: 1, style: { textAlign: 'center' } }}
                    />
                    <FormHelperText>
                        <div align="center">
                            Pls vote for us!
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                color="primary"
                variant="contained"

                onClick={this.handleRoomButtonPressed}
                >
                    Create Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center" spacing={2}>
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
        );
    }
}
function RoomCreateWrapper() {
  const navigate = useNavigate();

  return <CreateRoomPage navigate={navigate} />;
}
export default RoomCreateWrapper;