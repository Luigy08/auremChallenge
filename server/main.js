import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.startup(() => {
  
});
Meteor.methods({
  'cargar'(params){
    try {
      const result = HTTP.call('GET', 'https://reddit.com/r/'+ params.entrada+'/.json', {//Cargando String de JSON
        params: {}
      });

      return JSON.parse(result.content).data.children.map(function(post){//Convertir string a JSON y obtener valores 
        return {
          title: post.data.title,
          author: post.data.author,
          thumbnail: post.data.thumbnail,
          num_comments: post.data.num_comments,
          ups: post.data.ups,
          downs: post.data.downs
        }
      });
    } catch (e) {
      console.error(e)
     
      return false;
    }
    
  }
});