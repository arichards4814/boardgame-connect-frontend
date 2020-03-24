import React from 'react';
// import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../Constants';
import { API_WS_ROOT } from '../Constants'
// import Cable from '../Components/Cable';


class LiveGameRoom extends React.Component{

    state = {
        rooms: [],
        activeRoom: null,
        roomData: ""
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
                //also say a new user has joined the game
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
        }).then(this.props.fetch_room_data)
    }

    //////////

    componentDidMount = () => {
        this.fetcher()
    };

    fetcher = () => {
        fetch(`${API_ROOT}/rooms`)
            .then(res => res.json())
            .then(rooms => this.setState({ rooms: rooms }))
            .then(x => this.setState({ activeRoom: 20 }))
            .then(y => {
                if (this.state.rooms) {
                    let roomData = this.state.rooms.find(room => room.id === this.state.activeRoom)
                    this.setState({ roomData: roomData })
                }
            });
    }

    render() {
        this.createChatRoomWebsocketConnection(this.props.room_id)
    return(
        <div>
            {/* { this.state.roomData && this.state.roomData.users.map(user => <div> {user.name}</div>)} */}
            <button onClick={this.clickToAddFakePlayer}>Add Fake Player</button>
        </div>
    )
}


}


export default LiveGameRoom