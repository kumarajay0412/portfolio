import React from 'react';

import {Whiteboard, EventStream, EventStore} from '@ohtomi/react-whiteboard';


class Draw extends React.Component {

    constructor(props) {
        super(props);

        this.events = new EventStream();
        this.eventStore = new EventStore();
        this.width = 450;
        this.height = 400;
        this.style = {
            backgroundColor: 'lightyellow'
        };
    }

    render() {
        return (
            <Whiteboard events={this.events} eventStore={this.eventStore}
                        width={this.width} height={this.height} style={this.style}/>
                        
        );
    }
}
export default Draw;