import React, { Component } from 'react';
import ListComponent from './ListComponent.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { List } from '../api/List.js';
import ReactDOM from 'react-dom'

class ListGrid extends Component{

    mapList(list,key){
        return(
            <div className={"col"} key = {key}>
                <ListComponent list = {list} key = {key}/>
            </div>
        )
    }



    render(){
        let lists = this.props.lists.map(
            (list,key) => this.mapList(list,key)
        );
        if(lists.length>0) {
            return (
                <div>
                    <div className={"row"}>
                        {lists}
                    </div>
                    <br/><br/>
                    <AddList/>
                </div>

            );
        }else{
            return(
                <AddList />
            );
        }
    }
}

class AddList extends Component{

    constructor(props){
        super(props)
        this.handleAddList = this.handleAddList.bind(this);
    }


    handleAddList(){
        let listName = this.refs.addList.value;
        Meteor.call('lists.insert',listName);
        ReactDOM.findDOMNode(this.refs.addList).value = '';
    }
    render(){
        return(
            <div className={"row"}>
                <div className = "card w-100">
                    <div className = "card-header">
                        Add List
                    </div>
                    <div className={"card-body"}>
                        <div className = "row">
                            <div className = "col-xs-12 w-100">

                                <div className="input-group ">
                                    <input type="text" className="form-control" placeholder="List Name" ref="addList"/>
                                </div>
                            </div>
                        </div><br/>
                        <div className = "row">
                            <div className = "col-xs-12">
                                <div className ="btn-group btn-group-justified" role="group">
                                    <div className = "row">
                                        <div className = "col-md-12">
                                            <button className ="btn btn-success"  onClick={this.handleAddList}>
                                                Add list
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


export default withTracker(() => {
    Meteor.subscribe('lists');
    return {
        lists: List.find({}).fetch(),
    };
})(ListGrid);