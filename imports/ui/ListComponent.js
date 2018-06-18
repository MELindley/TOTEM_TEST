import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import CardComponent from './CardComponent.js';
import { Card } from '../api/Card.js';
import { List } from  '../api/List.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom'


class ListComponent extends Component{

    constructor(props){
        super(props);
        console.log(props.cards);
    }

    mapCard(card,key){
        return(
            <li className={"list-group-item"} key = {key}>
                <CardComponent card = {card}/>
            </li>
        )
    }

    render(){
        let cards = this.props.cards.map(
            (card,key) => this.mapCard(card,key)
        )
        return(
          <div className = {"card"}>
              <div className={"card-header text-center"}>
                  <div className={"row"}>
                      <div className = "col-md-12">
                          <h4 className={"card-title"}>{this.props.list.name}</h4>
                      </div>
                  </div>
              </div>
              <ul className={"list-group list-group-flush"}>
                  {cards}
              </ul>
              <div className={"card-body"}>
                  <AddCard list = {this.props.list._id}/>
              </div>
              <div className={"card-footer"}>
                  <div className={"row"}>
                      <div className = "col-md-12">
                          <DeleteList list = {this.props.list._id} cards = {this.props.cards}/>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

class DeleteList extends Component{
    constructor(props){
        super(props);
        this.handleDeleteList = this.handleDeleteList.bind(this);
    }

    handleDeleteList(){
        //remove all cards from list
        //can only remove with id
        for(let i = 0; i<this.props.cards.length;i++){
            Card.remove(this.props.cards[i]._id);
        }
        //delete the List it self
        Meteor.call('lists.remove',this.props.list);
    }

    render(){
        return(
            <div className={"btn btn-danger btn-sm float-right"} onClick={this.handleDeleteList}>
                Delete
            </div>
        )
    }
}

class AddCard extends Component{

    constructor(props){
        super(props)
        this.handleAddCard = this.handleAddCard.bind(this);
    }

    handleAddCard(){
        let content = this.refs.addCardContent.value;
        let title = this.refs.addCardTitle.value;
        Meteor.call('cards.insert',title,content,this.props.list);
        ReactDOM.findDOMNode(this.refs.addCardTitle).value = '';
        ReactDOM.findDOMNode(this.refs.addCardContent).value = '';
    }
    render(){
        return(
            <div className={"row"}>
                <div className = "card w-100">
                    <div className={"card-body"}>
                        <div className = "row mb-1">
                            <div className = "col-xs-12 w-100">
                                <div className="input-group ">
                                    <input type="text" className="form-control" placeholder="Card Title" ref="addCardTitle"/>
                                </div>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col-xs-12 w-100">
                                <div className="input-group ">
                                    <input type="text" className="form-control" placeholder="Card Content" ref="addCardContent"/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className = "row">
                            <div className = "col-xs-12">
                                <div className ="btn-group btn-group-justified" role="group">
                                    <div className = "row">
                                        <div className = "col-md-12">
                                            <button className ="btn btn-success"  onClick={this.handleAddCard}>
                                                Add Card
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withTracker(props => {
    Meteor.subscribe('cards');
    return {
        cards: Card.find({list:props.list._id}).fetch(),
    };
})(ListComponent);
