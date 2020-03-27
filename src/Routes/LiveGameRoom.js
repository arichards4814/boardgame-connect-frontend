import React from 'react';
// import { ActionCable } from 'react-actioncable-provider';
import Paper from '@material-ui/core/Paper'
import { Button, Input } from '@material-ui/core';
import ChatBubble from '../Components/ChatBubble';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import Cable from '../Components/Cable';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class LiveGameRoom extends React.Component{

    state = {
        rooms: [],
        activeRoom: null,
        roomData: "",
        message: "",
        open: false,
        prompt: "",
        severity: "info"
    };


    renderMessage = (messageObject) => {
        console.log(messageObject)
    }

    createChatRoomWebsocketConnection = (room) => {

        // Creates the new WebSocket connection.
        let socket = new WebSocket("ws://localhost:3000/cable");
        // When the connection is first created, this code runs subscribing the client to a specific chatroom stream in the ChatRoomChannel.
        
        socket.onopen = function (event) {
            console.log('WebSocket is connected.');
            const msg = {
                command: 'subscribe',
                identifier: JSON.stringify({
                    id: room,
                    channel: 'RoomsChannel'
                }),
            };
            socket.send(JSON.stringify(msg));
        };

        // When the connection is closed, this code will run.
        socket.onclose = function (event) {
            console.log('WebSocket is closed.');
        };

        // When a message is received through the websocket, this code will run.
        socket.onmessage = (event) => {
            const response = event.data;
            const msg = JSON.parse(response);

            // Ignores pings.
            if (msg.type === "ping") {
                return;
            }
            console.log("FROM RAILS: ", msg);

            // Renders any newly created messages onto the page.
            if (msg.message) {

                console.log("Fetching new room data", msg.message)
                this.fetcher()
                this.props.fetch_room_data()
            }

        };

        // When an error occurs through the websocket connection, this code is run printing the error message.
        socket.onerror = function (error) {
            console.log('WebSocket Error: ' + error);
        };
        
    }

    clickToAddFakePlayer = () => {
        fetch('http://localhost:3000/userrooms', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: 22,
                room_id: this.props.room_id
            })
        })
    }

    //////////

    fetcher = () => {
        console.log("in fetcher", this.props)
        fetch(`http://localhost:3000/rooms`)
            .then(resp => resp.json())
            .then(newrooms => {
                this.setState({ rooms: newrooms })})
            .then(console.log("rooms",this.state.rooms))
            .then(x => this.setState({ activeRoom: this.props.room_id }))
            .then(y => {
                if (this.state.rooms) {
                    let roomDataX = this.state.rooms.find(room => parseInt(room.id) === parseInt(this.props.room_id))
                    
                    this.setState({ roomData: roomDataX })
                }
            }).then(this.createChatRoomWebsocketConnection(this.props.room_id))
           ;
    }


    sendMessage = () => {
        console.log("room id in sendMessage", this.props.room_id)
        fetch('http://localhost:3000/messages', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'Authorization': localStorage.user_id
            },
            body: JSON.stringify({
                user_id: localStorage.user_id,
                room_id: this.props.room_id,
                message_content: this.state.message
            })
        })

        this.setState({message: ""})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    displayMessages = () => {
        console.log("room data", this.state.roomData)
        if(this.state.roomData){
            //find username first
            return this.state.roomData.messages.map((message, index) => <ChatBubble key={index} {...message}></ChatBubble>)
        }
    }

    scrollToBottom = () => {
        this.message_panel.scrollTop = this.message_panel.scrollHeight
    }

    componentDidMount() {
        this.fetcher()
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollToBottom();
        console.log("prev preState", prevProps.roomData)

        console.log("prev preProps", prevProps)

        console.log("roomdata", this.state.roomData)
        if (prevState.roomData && prevState.roomData.users.length < this.state.roomData.users.length){
            this.setState({
                open: true,
                prompt: "A new player has entered the room.",
                severity: "info"
            })
        } else if (prevState.roomData && prevState.roomData.users.length > this.state.roomData.users.length){
            this.setState({
                open: true,
                prompt: "A player has left the room.",
                severity: "warning"
            })
        }
    }


    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        console.log(this.state.rooms)
    return(
        <div>
            {/* { this.state.roomData && this.state.roomData.users.map(user => <div> {user.name}</div>)} */}
            
            <Paper style={{ height: 210, backgroundColor: "#7eccb2"}}>
                <div style={{ height: 170, overflow: "auto" }} ref={(el) => { this.message_panel = el; }}> 
                    {/* MESSAGE PANEL */}
                    {this.displayMessages()}
                </div>
                <div style={{height: 40, backgroundColor: "#ffffff", position: "relative"}}>
                    <div style={{width: 338}}>
                        <Input fullWidth onChange={this.handleChange} value={this.state.message} name="message"> </Input>
                    </div>
                    <Button onClick={this.sendMessage} variant="contained" color="primary" style={{position: "relative", top: 28, left: 240, width: 90}}>Send</Button>
                </div>
                

                {/* <button onClick={this.clickToAddFakePlayer}>Send</button> */}
            </Paper>
            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity={this.state.severity}>
                    {this.state.prompt}
                </Alert>
            </Snackbar>
        </div>
    )
}


}


export default LiveGameRoom