import React, { Component } from 'react';
import {Card} from "../api/Card";
import {List} from "../api/List";
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";

class CardComponent extends Component{
    handleDelete(){
        Meteor.call('cards.remove',this.props.card._id);
    }

    handleSetList(){
        let newList = this.refs.setList.value;
        Meteor.call('cards.update',this.props.card._id,newList);
    }

    mapList(list,key){
        return(
            <option value={list._id} key = {key}>{list.name}</option>
        )
    }

    render() {
        let lists = this.props.lists.map(
            (list,key) => this.mapList(list,key)
        )
        return(
            <div className = {"card"}>
                <div className = "card-header">
                    <div className={"row"}>
                        <div className={"col-md-10"}>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <select ref = "setList">
                                        {lists}
                                    </select>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <div className={"btn btn-success btn-sm"} onClick = {this.handleSetList.bind(this)}>
                                        Change Lists
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={ "col-md-2  m-auto"}>
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
export default withTracker(props => {
    Meteor.subscribe('lists');
    return {
        lists: List.find({_id:{$not:props.card.list}}).fetch(),
    };
})(CardComponent);
