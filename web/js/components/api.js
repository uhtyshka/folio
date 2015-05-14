

define(['angular'], function(ang) {
  function methods ($http) {

    function postLogin (data) {
      return $http.post('/login', data);
    }

////
//// C R E A T E
////

    function createCategories (data) {
      return $http.post('/categories', data);
    }
    function createProjects (data) {
      return $http.post('/projects/create', data);
    }
    function createItems (data) {
      return $http.post('/items/create', data);
    }

////
//// R E A D
////

    function getUser (data) {
      return $http.get('/user', data);
    };
    function getCategories (data) {
      return $http.get('/categories', data);
    };
    function getProjects (data) {
      return $http.get('/projects', data);
    };
    function getItems (data) {
      return $http.get('/items', data);
    };

////
//// U P D A T E
////

    function editUser (data) {
      return $http.post('/user/update', data);
    };
    function editCategories(data) {
      return $http.post('/categories/update', data);
    };
    function editProjects (data) {
      return $http.post('/projects/update', data);
    };
    function editItems (data) {
      return $http.post('/items/update', data);
    };

////
//// D E S T R O Y
////


    function eraseCategories(data) {
      return $http.post('/categories/destroy', data);
    };
    function eraseProjects (data) {
      return $http.post('/projects/destroy', data);
    };
    function eraseItems (data) {
      return $http.post('/items/destroy', data);
    };

////
////
////

    return {
      postLogin : postLogin,
      // create
      createCategories : createCategories,
      createProjects   : createProjects,
      createItems      : createItems,
      // read 
      getUser       : getUser,
      getCategories : getCategories,
      getProjects   : getProjects,
      getItems      : getItems,
      // update
      editUser       : editUser,
      editCategories : editCategories,
      editProjects   : editProjects,
      editItems      : editItems,
      // destroy
      eraseCategories : eraseCategories,
      eraseProjects   : eraseProjects,
      eraseItems      : eraseItems
    };
  }; // end methods();


  return ang.module('mainApp.Api', ['ngRoute'])
            .factory('ApiFactory', ['$http', methods]);

});
