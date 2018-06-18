import { Mongo } from 'meteor/mongo';
import {check} from "meteor/check";
import {List} from "./List";
import {Meteor} from "meteor/meteor";

export const Card = new Mongo.Collection('cards');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('cards', function tasksPublication() {
        return Card.find();
    });
}


Meteor.methods({
    'cards.insert'(title,content,list){
        check(title,String);
        check(content,String);
        Card.insert({
            title:title,
            content:content,
            list:list,
            createdAt: new Date(),
        });
    },

    'cards.remove'(cardId){
        check(cardId,String);
        Card.remove(cardId);
    },

    'cards.update'(cardId,listId){
        check(cardId,String);
        check(listId,String);
        Card.update(cardId,{$set:{list:listId},});
    }

});