module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title:'User Profile'
    });
}

//render the signUp page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render the signIn page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//get the signup data
module.exports.create = function(req, res){

}

//sign in and create session for the user
module.exports.createSession = function(req, res){

}

