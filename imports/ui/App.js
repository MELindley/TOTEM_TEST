import React, { Component } from 'react';
import "../../client/main.css";
import ListGrid from './ListGrid.js';

// App component - represents the whole app
//Base code from the meteor -react tutorial
export default class App extends Component {
    render() {
        //return the grid list
        return (
            <div className="container-fluid">
                <div className={"row m-auto"}>
                    <div className = "col-md-12">
                        <div className={"jumbotron text-center"}>
                            <h1>Simple Trello</h1>
                        </div>
                    </div>
                </div>
                <div className={"row m-auto"}>
                    <div className = "col-md-12">
                        <ListGrid/>
                    </div>
                </div>
            </div>
        );
    }
}