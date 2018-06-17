import React, { Component } from 'react';
import {Card} from "../api/Card";
import {List} from "../api/List";

export default class CardComponent extends Component{
    handleDelete(){
        Card.remove(this.props.card._id);
    }
    render() {
    return(
        <div className = {"card"}>
            <div className = "card-header">
                <div className={"row"}>
                    <div className={ "col-md-12"}>
                        <div className={"btn btn-danger btn-sm float-right"} onClick={this.handleDelete.bind(this)}>
                            X
                        </div>
                    </div>
                </div>
            </div>
            <div className={"card-body"}>
                <h6 className={"card-title"}>
                    {this.props.card.title}
                </h6>
                {this.props.card.content}
            </div>

        </div>
        );
    }

}
