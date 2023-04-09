const express = require('express');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { unlink } = require('fs/promises');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');


const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'cheese',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(session({ secret: 'your secret here', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'), { index: 'index.html' }));
app.use(express.static(path.join(__dirname, 'public'), { index: 'index.html' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser('keyboard cat'));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




// Dummy user for demonstration purposes
const user = {
  id: '1',
  username: 'admin',
  password: '$2b$10$K7eRdR8gzHuv1nLm2Z9LGOJW8TP3q3hIYwYkA55yCSDRJzml0pq0u', // bcrypt hash of the password "password"
};

passport.use(
  new LocalStrategy(function (username, password, done) {
    const users = JSON.parse(fs.readFileSync('users.json'));
    const user = users.find((user) => user.username === username);

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if (id === user.id) {
    done(null, user);
  } else {
    done(new Error('User not found'), null);
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login.html');
}

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true,
  })
);


app.post('/upload', upload.none(), (req, res, next) => {
  const password = req.body.password;
  const correctPassword = "Cheese"; // Set your desired password here

  if (password !== correctPassword) {
    res.status(401).send('Unauthorized: Invalid password');
    return;
  }

  if (!req.file) {
    res.status(400).send('No file uploaded');
    return;
  }

  const tempPath = req.files['image'][0].path;
  const targetPath = path.join(__dirname, "./uploads/" + req.file.filename);

  if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".jpeg" || path.extname(req.file.originalname).toLowerCase() === ".tiff") {
    fs.rename(tempPath, targetPath, err => {
      if (err) {
        res.status(500).send('Error saving file');
        return;
      }
      res.status(200).send('File uploaded and saved');
    });
  } else {
    fs.unlink(tempPath, err => {
      if (err) {
        res.status(500).send('Error deleting temporary file');
        return;
      }
      res.status(400).send('Only .png, .jpg, .jpeg and .tiff files are allowed');
    });
  }
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/images', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      res.status(500).send('Error reading uploads directory');
    } else {
      res.json(files.map(filename => ({
        filename,
        path: '/uploads/' + filename
      })));
    }
  });
});


app.delete('/images/:filename', ensureAuthenticated, async (req, res) => {
  try {
    const filename = req.params.filename;
    await unlink(path.join(__dirname, 'uploads', filename));

    res.status(200).json({ message: 'Image deleted successfully.' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
