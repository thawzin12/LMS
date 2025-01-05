const express = require('express');
const route = express.Router();

const check = require('../utilities/custommiddleware');
const bodyparser = require('body-parser');


route.use(bodyparser.json()); // Parse JSON
route.get('/english', check.userpass, (req, res) => {
    var cid = "E-2201";
    var uid = req.session.user.name;
    var cname = "Traveller Level B2";
    console.log('userid', uid);
    console.log('ecid', cid);
    console.log('ecname', cname);
    console.log('---------');
    res.render('english', { "cid": cid, "cname": cname, "uid": uid });
});

route.get('/datastructure', check.userpass, (req, res) => {
    var dcid = "CST-2211";
    var dcname = "Data Structure and Algorithms";
    var duid = req.session.user.name;
    res.render('datastructure', { "cid": dcid, "cname": dcname, "uid": duid });
})

route.get('/mathematics', check.userpass, (req, res) => {
    var mcid = "CST-2242";
    var mcname = "Linear Algebra";
    var muid = req.session.user.name;
    res.render('mathematics', { "cid": mcid, "cname": mcname, "uid": muid });
})

route.get('/softwareengineering', check.userpass, (req, res) => {
    var scid = "CST-2223";
    var scname = "Software Engineering";
    var suid = req.session.user.name;
    res.render('softwareeng', { "cid": scid, "cname": scname, "uid": suid });
})

route.get('/javascript', check.userpass, (req, res) => {
    var jcid = "CST-2254";
    var jcname = "Web Technology(js)";
    var juid = req.session.user.name;
    res.render('javascript', { "cid": jcid, "cname": jcname, "uid": juid });
})

route.get('/java', check.userpass, (req, res) => {
    var jacid = "CST-2205";
    var jacname = "Advanced Java Programming";
    var jauid = req.session.user.name;
    res.render('j2ee', { "cid": jacid, "cname": jacname, "uid": jauid });
})
// Fetch questions from the database
route.post('/totalmarks', check.userpass, async (req, res) => {
    const { cid, cname, uid, marks } = req.body;
    console.log('tcid', cid);
    console.log('tcname', cname);
    console.log('tuid', uid);
    console.log('tmark', marks);
    console.log('---------');
    try {
        var db = req.app.get('db');
        const [answer] =
            await db.execute('SELECT * FROM mark WHERE uid = ? and cid=?', [uid, cid]);
        if (answer.length > 0) {
            console.log('The data entered already.');
        }
        else {
            var placeholder = 'INSERT INTO mark (uid,cid,cname,mark) VALUES (?, ?, ?,?)';
            await db.execute(placeholder, [uid, cid, cname, marks]);
        }
    }
    catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).send('Internal Server Error');
    }
});

route.get('/entertainment', check.ensureStudentAuthenticated, (req, res) => {
    res.render('entertainment');
});

route.get('/international', check.ensureStudentAuthenticated, (req, res) => {
    res.render('international');
});

route.get('/generalknowledge', check.ensureStudentAuthenticated, (req, res) => {
    res.render('generalknowledge');
});

route.get('/health', check.ensureStudentAuthenticated, (req, res) => {
    res.render('health');
});
// Render forget password page

module.exports = route;