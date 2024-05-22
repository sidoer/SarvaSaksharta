require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken')
const svgCaptcha = require('svg-captcha');
const cors = require('cors')
const mongoose = require('mongoose');
const multer = require('multer')
const argon2 = require('argon2');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


const app = express();
app.use(cors())
app.use(express.json());
const PORT = 5500; 


if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI not defined. Please set the environment variable.');
  process.exit(1);
}


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  const jwt_secret=process.env.SECRET
  // Define a mongoose.Schema


  const user_data=new mongoose.Schema({
    user:{type:String,lowercase:true},
    role:{type:String},
    pass:{type:String}
})
const user_model=mongoose.model("Credential",user_data)

const user_data2=new mongoose.Schema({
    user:String,
    name:String,
    mail:String,
    role:String,
    grade:String,
    grade_check:String
})
const user_model2=mongoose.model("Profile",user_data2)

const forum=new mongoose.Schema({
    user:String,
    message:String,
    grade:String
})
const forum_model=mongoose.model("Forum",forum)

const uploads_schema=new mongoose.Schema({
    user:String,
    grade:String,
    subject:String,
    unit:String,
    topic:String,
    filename:String,
    approved:Boolean
})
const uploads_model=mongoose.model("Upload",uploads_schema)

const subjects_schema =new mongoose.Schema({
    grade:String,
    subjects:Array
})
const subjects_model=mongoose.model("Subject",subjects_schema)
const tasks_schema =new mongoose.Schema({
    task_name:String,
    task_grade:String
})
const tasks_model=mongoose.model("Task",tasks_schema)


let verify_captcha="";
app.get('/api/captcha', (req, res) => {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0oO1iIlL',
      noise: 1,
      color: true,
      width: "150"
    });
  
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(captcha.data);
  
    verify_captcha=captcha.text
    //console.log(verify_captcha);
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() +"-"+file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  /*const upload = multer({
    storage: storage,
    limits: {
      fileSize: 500 * 1024,
    },
  });*/
  


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    jwt.verify(token, jwt_secret, (err, user) => {
      if (err) {
        console.log('Token Verification Error:', err);
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  };

  app.post('/api/signup', async (req, res) => {
    console.log(req.body);
    if (
        req.body.pass != req.body.confirm_pass ||
        req.body.role === "" ||
        verify_captcha != req.body.captcha
    ) {
        if (req.body.pass != req.body.confirm_pass) {
            res.sendStatus(202);
        } else if (verify_captcha != req.body.captcha) {
            res.sendStatus(203);
        }
    } else if (
        req.body.pass == req.body.confirm_pass &&
        verify_captcha === req.body.captcha
    ) {
        console.log("ochindi");
        const add_user = {
            user: req.body.user,
            pass: req.body.pass,
        };
        const account_exists = await user_model.exists({ user: add_user.user });
        if (account_exists != null) {
            res.sendStatus(201);
            console.log("not saved");
        } else if (account_exists == null) {
            try {
                const hash = await argon2.hash(req.body.pass);
                const add_user2 = new user_model({
                    user: req.body.user,
                    pass: hash,
                    role: req.body.role,
                });
                if (req.body.role == "teacher") {
                    const user_profile = new user_model2({
                        user: req.body.user,
                        name: "enter nickname",
                        mail: "enter mail",
                        role: req.body.role,
                        grade: "no-grade",
                        grade_check: "selected",
                    });
                    user_profile.save();
                } else if (req.body.role == "student") {
                    const user_profile = new user_model2({
                        user: req.body.user,
                        name: "enter nickname",
                        mail: "enter mail",
                        role: req.body.role,
                        grade: "-",
                        grade_check: "",
                    });
                    user_profile.save();
                }
                add_user2.save();
                res.sendStatus(200);
                console.log("saved");
            } catch (error) {
                console.error("Error:", error);
                res.sendStatus(500);
            }
        }
    }
});

app.post('/api/signin', async (req, res) => {
    const signin_check = await user_model.findOne({ user: req.body.user });
    const role_check = await user_model2.findOne({ user: req.body.user });
    console.log(req.body);

    const get_hash = signin_check.pass;

    try {
        const result = await argon2.verify(get_hash, req.body.pass);
        if (result && req.body.captcha === verify_captcha) {
            let token;
            try {
                token = jwt.sign(
                    { user: req.body.user },
                    jwt_secret,
                    { expiresIn: "1h" }
                );
                res.json({ token: token });
            } catch (err) {
                console.log(err);
                const error = new Error("Error! Something went wrong.");
                return next(error);
            }
        } else if (result === false || req.body.captcha != verify_captcha) {
            if (result == false) res.sendStatus(201);
            else if (req.body.captcha != verify_captcha) res.sendStatus(203);
        }
    } catch (error) {
        console.error("Error:", error);
        res.sendStatus(500);
    }
});

app.post('/api/get-profile-data',verifyToken,async (req, res) => {
    const profile_data=await user_model2.findOne({user:req.body.user})
    res.json(profile_data)
    
  });


app.post('/api/update-profile',verifyToken,async (req, res) => {
    console.log(req.body)
    try{
    if(req.body.name==='' && req.body.mail===''){
        res.sendStatus(202)
    }
    else if(req.body.name==='' && req.body.mail!==''){
        const update_data=await user_model2.updateOne({user:req.body.user},{$set:{mail:req.body.mail}})
        res.sendStatus(200)
    }
    else if(req.body.mail==='' && req.body.name!==''){
        const update_data=await user_model2.updateOne({user:req.body.user},{$set:{name:req.body.name}})
        res.sendStatus(200)
    }
    else if(req.body.mail!=='' && req.body.name!==''){
    const update_data=await user_model2.updateOne({user:req.body.user},{$set:{name:req.body.name,mail:req.body.mail}})
    res.sendStatus(200)
    }
    }
    catch(error){
    console.log(error)
    res.sendStatus(201)
    }
    
})

app.post('/api/set-grade',verifyToken,async(req,res)=>{
    console.log(req.body)
    try{
    if(req.body.grade!==""){
    const update_data=await user_model2.updateOne({user:req.body.user},{$set:{grade:req.body.grade,grade_check:req.body.grade_check}})
    console.log(update_data)
    res.sendStatus(200)    
    }
    else if(req.body.grade===""){
        res.sendStatus(201)
    }
    }
    catch(error){
    console.log(error)
    }
})

app.post('/api/grade-check',verifyToken,async(req,res)=>{
    try{
        const check_grade=await user_model2.findOne({user:req.body.user})
        if(check_grade.grade_check===""){
            res.sendStatus(200)
        }
        else if(check_grade.grade_check==="selected" ||check_grade.role=="teacher"){
            res.sendStatus(201)
        }
    }
    catch(error){
        console.log(error)
    }
})

app.post('/api/role-check',verifyToken,async(req,res)=>{
    try{
        const check_role=await user_model2.findOne({user:req.body.user})
        if(check_role.role==="teacher"){
            const get_content=await uploads_model.find({user:req.body.user})
            console.log(get_content)
            res.status(200).send(get_content)
        }
        else if(check_role.role==="student"){
            //console.log(check_role)
            const get_subjects=await subjects_model.findOne({grade:check_role.grade})
            //console.log(get_subjects.subjects)
            const get_content = await uploads_model.find({
                grade: check_role.grade,
                approved: true
              });
              
            console.log(get_content)
            res.status(201).send([get_subjects.subjects,get_content]);
        }
        else if(check_role.role==="admin"){
            const get_content = await uploads_model.find({
                approved: false
              });
              
            
            res.status(202).send([get_content]);
        }
    }
    catch(error){
        console.log(error)
    }
})

app.post('/api/upload', upload.single('file'), async (req, res) => {
    //console.log(req.file);
    const update_data =new uploads_model({
        user:req.body.user,
        grade:req.body.grade,
        subject:req.body.subject,
        unit:req.body.unit,
        topic:req.body.topic,    
        filename:req.file.filename,
        approved:false   
    })
    update_data.save()
    res.status(200).send('File uploaded successfully');
  });
  
app.post('/api/subject-filter',verifyToken,async(req,res)=>{
    const get_content=await uploads_model.find({subject:req.body.filter})
    console.log(get_content)
    res.status(200).send(get_content)
})
app.post('/api/forum', verifyToken, async (req, res) => {

    try {
        const check_grade=await user_model2.findOne({user:req.body.user})
        const grade_get=check_grade.grade
        const forum_data =new forum_model({
            user:req.body.user,
            message:req.body.message,
            grade:grade_get
        })
        await forum_data.save();
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/api/get-forum', verifyToken, async (req, res) => {
    const check_grade=await user_model2.findOne({user:req.body.user})
    const grade_get=check_grade.grade
    const get_forum=await forum_model.find({grade:grade_get})
    //console.log(get_forum)
    res.status(200).send(get_forum)
});
app.post('/api/get-tasks', verifyToken, async (req, res) => {
    const check_grade=await user_model2.findOne({user:req.body.user})
    const grade_get=check_grade.grade
    const get_task=await tasks_model.find({task_grade:grade_get})
    //console.log(get_task)
    res.status(200).send(get_task)
});
app.post('/api/tasks', verifyToken, async (req, res) => {
    const task_data =new tasks_model({
        task_name:req.body.task_name,
        task_grade:req.body.task_grade
    })
    await task_data.save();
    //console.log(task_data)
});
app.post('/api/admin', verifyToken, async (req, res) => {
    const check_role=await user_model2.findOne({user:req.body.user})
    //console.log(check_role)
    if(check_role.role==="admin"){
        //console.log("yeah, admin")
        res.sendStatus(200)
    }
    else if(check_role.role==="student" || check_role.role==="teacher"){
        console.log('not admin')
        res.sendStatus(201)
    }
});

app.post('/api/delete', verifyToken, async (req, res) => {
    try {
      const check_role = await user_model2.findOne({ user: req.body.user });
  
      if (check_role.role === 'admin') {
        const deleteUser = await user_model.deleteOne({ user: req.body.delete });
        const deleteProfile = await user_model2.deleteOne({ user: req.body.delete });
        const deleteForumMessages = await forum_model.deleteMany({ user: req.body.delete });
        res.sendStatus(200);
      } else {
        res.sendStatus(201); 
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.sendStatus(500); 
    }
  });
  
  app.post('/api/approve-content', verifyToken, async (req, res) => {
    //console.log(req.body.filename)
    const update_approve_content=await uploads_model.updateOne({filename:req.body.filename},{$set:{approved:true}})
    res.sendStatus(200)
  });

  app.post('/api/delete-content', verifyToken, async (req, res) => {
    console.log(req.body.filename)
    const delete_content=await uploads_model.deleteOne({filename:req.body.filename})
    res.sendStatus(200)
  });
  app.post('/api/askai', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
            temperature: 1,
            max_tokens: 256,
            stop: ['\n', ' User:', ' AI:'],
        });

        const botMessage = response.choices[0].message.content;
        res.json({ message: botMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post("/api/addteacher",async(req,res)=>{
    console.log(req.body)
    const hash = await argon2.hash(req.body.password);
    const add_teacher=new user_model({
    user:req.body.username,
    role:"teacher",
    pass:hash
    })
    const add_teacher_data=new user_model2(
        {"user":req.body.username,
        "name":"enter nickname",
        "mail":"enter mail",
        "role":"teacher",
        "grade":"",
        "grade_check":"selected"
    })
    const find_user=await user_model2.exists({user:req.body.username})
    if(find_user===null){
        add_teacher.save()
        add_teacher_data.save()
        res.sendStatus(200)
    }
})
app.post("/api/addadmin",async(req,res)=>{
    console.log(req.body)
    const hash = await argon2.hash(req.body.password);
    const add_admin=new user_model({
    user:req.body.username,
    role:"admin",
    pass:hash
    })
    const add_admin_data=new user_model2(
        {"user":req.body.username,
        "name":"enter nickname",
        "mail":"enter mail",
        "role":"admin",
        "grade":"",
        "grade_check":"selected"
    })
    const find_user=await user_model2.exists({user:req.body.username})
    if(find_user===null){
        add_admin.save()
        add_admin_data.save()
        res.sendStatus(200)
    }
})
app.listen(PORT)

});
