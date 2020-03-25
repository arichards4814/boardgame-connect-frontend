import React from 'react';
// import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../Constants';
import Paper from '@material-ui/core/Paper'
import { Button, Input } from '@material-ui/core';
import ChatBubble from '../Components/ChatBubble'
// import Cable from '../Components/Cable';


class LiveGameRoom extends React.Component{

    state = {
        rooms: [],
        activeRoom: null,
        roomData: "",
        message: ""
    };


    renderMessage = (messageObject) => {
        console.log(messageObject)
    }

    createChatRoomWebsocketConnection = (room) => {
        console.log("room test", room)
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
        socket.onmessage =  (event) => {
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

    componentDidMount = () => {
        this.fetcher()
    };

    fetcher = () => {
        fetch(`${API_ROOT}/rooms`)
            .then(res => res.json())
            .then(rooms => this.setState({ rooms: rooms }))
            .then(x => this.setState({ activeRoom: this.props.room_id }))
            .then(y => {
                console.log("testing 123", y, this.state, this.state.rooms)
                if (this.state.rooms) {

                    let roomDataX = this.state.rooms.find(room => room.id === this.state.activeRoom)
                    this.setState({ roomData: roomDataX })
                }
            });
    }

    sendMessage = () => {
        fetch('http://localhost:3000/messages', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: localStorage.user_id,
                room_id: this.props.room_id,
                message_content: this.state.message
            })
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    displayMessages = () => {
        console.log(this.state.roomData)
        if(this.state.roomData){
            //find username first
            return this.state.roomData.messages.map(message => <ChatBubble {...message}></ChatBubble>)
        }
    }

    render() {
        this.createChatRoomWebsocketConnection(this.props.room_id)
        console.log(this.props.room_id)
    return(
        <div>
            {/* { this.state.roomData && this.state.roomData.users.map(user => <div> {user.name}</div>)} */}
            
            <Paper style={{ height: 200, backgroundColor: "#7eccb2"}}>
                <div style={{height: 158, overflow: "auto"}}> 
                    {/* MESSAGE PANEL */}
                    {this.displayMessages()}
                </div>
                <div style={{height: 40, backgroundColor: "#ffffff", position: "relative"}}>
                    <div style={{width: 338}}>
                        <Input fullWidth onChange={this.handleChange} name="message"> </Input>
                    </div>
                    <Button onClick={this.sendMessage} variant="contained" color="primary" style={{position: "relative", bottom: 30, left: 340}}>Send</Button>
                </div>
                

                {/* <button onClick={this.clickToAddFakePlayer}>Send</button> */}
            </Paper>
        </div>
    )
}


}


export default LiveGameRoom