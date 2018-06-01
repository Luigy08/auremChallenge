import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { EJSON } from 'meteor/ejson'
import './main.html';
var hasChanged = new Deps.Dependency();
var posts=[];

var getPosts=function(){//relacionar input con metodo en cargar en server
  Meteor.call('cargar', {
    entrada: $("#category").val()
  }, (err, response) => {
    posts=response;
    hasChanged.changed();        
  })
}

Template.posts.onRendered(function(){// inicia con funny 
  getPosts();
})

Template.posts.helpers({
  posts: function(){
    hasChanged.depend();
    return posts;
  } 
});

Template.top.events({//salida input funciona con enter
  'keyup input[name=text]': function (event,template) {
    if (event.which === 13) {
      getPosts();
    }
  }
});


