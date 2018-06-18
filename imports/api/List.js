import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const List = new Mongo.Collection('lists');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('lists', function tasksPublication() {
        return List.find();
    });
}

Meteor.methods({
    'lists.insert'(name){
        check(name,String);
        List.insert({
            name:name,
            createdAt: new Date(),
        });
    },

    'lists.remove'(listId){
        check(listId,String);
        List.remove(listId);
    },

});