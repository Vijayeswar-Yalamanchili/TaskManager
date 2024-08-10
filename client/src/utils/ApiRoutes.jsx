const ApiRoutes = {
  LOGIN : {
      path : '/users/login',
      authenticate : false
  },
  REGISTER : {
    path : '/users/register',
    authenticate : false
  },
  FORGOTPASSWORD : {
      path : '/users/forgotpassword',
      authenticate : false
  },
  LOGOUT : {
      path : '/users/logout',
      authenticate : true
  },
  GOOGLELOGIN : {
    path : '/googlelogin/success',
    authenticate : false
  },
  GOOGLELOGOUT : {
    path : '/googlelogout',
    authenticate : true
  },
  CURRENTUSER : {
    path : '/users/currentuser',
    authenticate : true
  },
  ADDPROJECT : {
    path : '/project/addproject',
    authenticate : true
  },
  UPDATEPROJECT : {
    path : '/project/updatedprojectcardname',
    authenticate : true
  },
  GETPROJECTSLIST : {
    path : '/project/getprojectslist',
    authenticate : true
  },
  GETCURRENTPROJECTCARDDATA : {
    path : '/project/getcurrentprojectcarddata',
    authenticate : true
  },
  DELETECURRENTPROJECT : {
    path : '/project/deleteproject',
    authenticate : true
  },
  ADDTASK : {
    path : '/task/addtask',
    authenticate : true
  }
}

export default ApiRoutes