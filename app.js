const express = require('express');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { unlink } = require('fs/promises');

const app = express();
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your secret here', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'), { index: 'index.html' }));
app.use(express.static(path.join(__dirname, 'public'), { index: 'index.html' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Dummy user for demonstration purposes
const user = {
  id: '1',
  username: 'admin',
  password: '$2b$10$K7eRdR8gzHuv1nLm2Z9LGOJW8TP3q3hIYwYkA55yCSDRJzml0pq0u', // bcrypt hash of the password "password"
};

passport.use(new LocalStrategy(
  async (username, password, done) => {
    if (username !== user.username) {
      return done(null, false, { message: 'Incorrect username.' });
    }    
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

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

app.post('/login', passport.authenticate('local', {
  successRedirect: '/main.html',
  failureRedirect: '/login.html',
}));

app.post('/upload', ensureAuthenticated, upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
  } else {
    res.redirect('/main.html');
  }
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
