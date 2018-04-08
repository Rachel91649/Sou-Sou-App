const db = require("./index");
const stripe = require("../constants/stripe");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");
const session = require("express-session");

// Query to get all groups for public groups page, map in the front-end
// getAllGroups = (req, res, next) => {
//      db.any("select * from groups inner join users on groups.creator = users.ID")
//     .then((data) => {
//       console.log(data);
//         res.status(200).json({
//             status: 'success',
//             data: data,
//             message: 'Retrieved all groups'
//         });
//     })
//     .catch((err) => {
//         return next(err);
//     })
// }

//Get all information of all users
getAllUsers = (req, res, next) => {

  db
    .any("select * from users")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Crystal has Retrieved ALL users"
      });

    })
    .catch(function(err) {
      return next(err);
    });
}

getSingleUsers = (req, res, next) => {

  db
    .any("select * from users where first_name=Jason")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Crystal has Retrieved ALL users"
      });

    })
    .catch(function(err) {
      return next(err);
    });
}



//Login users
loginUser = (req, res, next) => {
  passport.authenticate("local", {});
var sessData = req.session;
  const authenticate = passport.authenticate("local", (err, user, info) => {
    console.log('User: ', user);
    if(err) {
      res.status(500).send("Error while trying to logging in, Please try again")
    } else if (!user) {
      res.status(401).send("Invalid Username or Password, Please try again");
    } else if (user) {

      req.logIn(user, (err) => {
        if (err) {
          res.status(500).send("Login Error");
        }else {
           console.log('USER====>:',user);
          console.log('Res Login====>:',res);
          console.log(res.status);
          res.status(200).send(user);


          // res.redirect('/users/profile');
        }
      })
    }
  })
  return authenticate(req, res, next) //redirect - erty 
}
//Create user with resistration and login users
createUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password);
  console.log('createUser hash: ', hash);

  db.any('INSERT INTO users (first_name, last_name, username, password_digest, email) VALUES (${firstName}, ${lastName}, ${username}, ${password}, ${email})', {
    firstName: req.body.firstName,
    lastName:req.body.lastName,
    username: req.body.username,
    email:req.body.email,
    password: hash,
  })
  .then(() => {
    //Would like to authenticate and redirect to profile or login
    res.send(`created user: ${req.body.username}`);
    if(next) { // this is super hacky, next will be undefined in seed.js
        loginUser()
    }
  })
    .catch(err => {
      console.log('Create User Error: ',err);
      res.status(500).send('error creating user')
    })
  }



//User logout
logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send("User logout")
}

// get user info for their profile page when they log in or during session
// getUserInfo = (req, res, next) => {
//     db.any('select * from users where username = ${userName}')
//     .then((data) => {
//         res.status(200).json({
//             status: success,
//             data: data,
//             message: 'Retrived User info'
//         });
//     })
//     .catch((err) => {
//         return next(err);
//     });
// }

getUserInfo = (req, res, next) => {

  console.log(req.body.userID);
    db.any('select * from users inner join groups on groups.creator = ${userID} and users.id = ${userID}',{
      userID:req.params.userID
    })
    .then((data) => {
    //   console.log("DATA:=======================================> ", data);
      res.status(200).json({
          status: "success",
          data: data,
          message: 'Retrieved group info'
      });
    })
    .catch((err) => {
    //   console.log("ERROR:=====================================> ",err);
        return next(err);
    });
}


// select one group from groups list page from front-end(list provided by getAllGroups)
getSingleGroup = (req, res, next) => {
  console.log("REQ Group ID: " + req.params.groupID);
    db.one('select * from groups where id=${groupID}',
        {
            groupID: req.params.groupID
        }
    )
    .then((data) => {
      console.log(data);
        res.status(200).json({
            status: "success",
            data: data,
            message: 'Retrieved group info'
        });
    })
    .catch((err) => {
        return next(err);
        console.log(err);
    })
}
// creates group when user submits form from group creation page
createGroup = (req, res, next) => {
    db.none('insert into groups (group_name, total_members, creator, pay_in_amount, pay_out_amount, frequency, description_) values (${groupName}, ${totalMembers}, ${creator},${payinAmount}, ${payoutAmount}, ${frequency}, ${description})',{
        groupName: req.body.groupName,
        totalMembers: req.body.totalMembers,
        creator: req.body.creator,
        payinAmount: req.body.payinAmount,
        payoutAmount: req.body.payoutAmount,
        frequency: req.body.frequency,
        description: req.body.description
    })
    .then((data) => {
        res.status(200).json({
            status: "success",
            data: data,
            message: 'Created group!'
        });
    })
    .catch((err) => {
        return next(err);
    })
}

userJoinGroup = (req, res, next) => {

   db.none('insert into users_groups (user_id, group_id) values (${userID}, ${groupID})', {
      groupID: req.params.groupID,
      userID: req.params.userID
   })
    .then((data) => {
        res.status(200).json({
            status: "success",
            data: data,
            messge: 'User joined group'
        })
    })
    .catch((err) => {
        return next(err);
    })
}

saveCustomerToken = (req, res, next) => {
    db.none('update users set stripe_id = ${stripe_id} WHERE email = ${email}', {
        stripe_id: req.query.stripe_id,
        email: req.query.email
    })
    .then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'User token saved'
        })
    })
    .catch((err) => {
        return next(err);
    })
}

paymentSent = (req, res, next) => {
    
}

saveCustomerId = (data, id) => {
    db.none('update users set stripe_id = ${stripe_user_id} WHERE id = ${id}', {
        stripe_user_id: data,
        id: id
    })
    .then((data) => {
        console.log('SAVED CUSTOMER ID => ' + data);
    })
    .catch((err) => {
        console.log('YOU SUCK');
        return;
    })
}

getMembersFromGroup = (group_id) => {
    return (db.any('select * from users_groups LEFT JOIN users on users_groups.user_id = users.id where group_id = ${group_id}', {
        group_id: group_id
    }))
    // .then((data) => {
    //     console.log('members data => ' + JSON.stringify(data));
    //     return data;
    // })
    // .catch((err) => {
    //     console.log('ERROR => ' + err);
    //     return;
    // })
}

getNumberOfPayments = (user, group) => {
    console.log(user, group);
    return (db.any('select * from payments_in where user_id = ${user} and group_id = ${group}', {
        user: user,
        group: group
    }))
    // .then((data) => {
    //     res.status(200).json({
    //         status: 'success',
    //         data: data,
    //         message: 'list of payments'
    //     })
    // })
    // .catch((err) => {
    //     console.log('number payments => ' + err);
    //     return;
    // })
    // db.any('select * from payments_in where user_id = ${user} and group_id = ${group}', {
    //     user: user,
    //     group: group
    // })
    // .then((data) => {
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) => {
    //     console.log('payments in error => ' + err);
    // })
}

paymentsIn = (user, amount, group, charge_id) => {
    return (db.none('insert into payments_in (payment_id, amount, user_id, group_id) VALUES (${charge_id}, ${amount}, ${user}, ${group})', {
        charge_id: charge_id,
        group: group,
        user:user,
        amount: amount
    }));
    // .then((data) => {
    //     res.status(200).json({
    //         status: 'success',
    //         data: data,
    //         message: 'payment sent in'
    //     })
    // })
    // .catch((err) => {
    //     console.log(err);
    //     return;
    // })
}

paymentsOut = (user, amount, group, charge_id) => {
    return (db.none('insert into payments_out (payment_id, amount, user_id, group_id) VALUES (${charge_id}, ${amount}, ${user}, ${group})', {
        charge_id: charge_id,
        group: group,
        user:user,
        amount: amount
    }));
    // .then((data) => {
    //     res.status(200).json({
    //         status: 'success',
    //         data: data,
    //         message: 'payment sent out'
    //     })
    // })
    // .catch((err) => {
    //     console.log(err);
    //     return;
    // })
}

getGroup = (groupID) => {
    return (db.one('select * from groups where id = ${groupID}', {
        groupID: groupID
    }))
}



getAllGroups = (req, res, next) => {

    db.any('select * from groups inner join users on groups.creator = users.ID')
    .then((data) => {
      console.log(data);
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved all creators'
        });
    })
    .catch((err) => {
      console.log(err)
        return next(err);
    })
}




module.exports = {
    getAllGroups: getAllGroups,
    getUserInfo: getUserInfo,
    getSingleGroup: getSingleGroup,
    createGroup: createGroup,
    createUser: createUser,
    loginUser: loginUser,
    getAllUsers:getAllUsers,
    saveCustomerId: saveCustomerId,
    userJoinGroup: userJoinGroup,
    getMembersFromGroup: getMembersFromGroup,
    getNumberOfPayments: getNumberOfPayments,
    getGroup: getGroup,
    getSingleUsers:getSingleUsers,
    paymentsIn: paymentsIn,
    paymentsOut: paymentsOut,
    // getUserGroupInfo: getUserGroupInfo,
    // getAllCreatorsInfo: getAllCreatorsInfo
};
