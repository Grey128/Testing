const express = require('express');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

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

// Read users from the users.json file
const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) {
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
  const user = users.find(u => u.id === id);
  if (user) {
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
  successRedirect: '/upload.html',
  failureRedirect: '/login.html',
}));

app.post('/upload', ensureAuthenticated, upload.single('photo'), (req, res) => {
  const image = {
    name: req.body.name,
    path: '/uploads/' + req.file.filename,
  };
  const images = JSON.parse(fs.readFileSync('images.json', 'utf-8'));
  images.push(image);
  fs.writeFileSync('images.json', JSON.stringify(images));
  res.redirect('/archive.html');
});

app.get('/images', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      res.status(500).send('Error reading uploads directory');
    } else {
      const imagesData = files.map(filename => {
        const [name, ext] = filename.split('.');
        return { filename, name, ext };
      });
      res.json(imagesData);
    }
  });
});


app.get('/is-admin', ensureAuthenticated, (req, res) => {
  res.json(req.user.role === 'admin');
});

app.post('/delete-image', ensureAuthenticated, (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403).send('Forbidden');
    return;
  }

  const images = JSON.parse(fs.readFileSync('images.json', 'utf-8'));
  const imageToDelete = req.body.imageToDelete;
  const filteredImages = images.filter(image => image.path !== imageToDelete);
  fs.writeFileSync('images.json', JSON.stringify(filteredImages));

  const filename = imageToDelete.replace('/uploads/', '');
  fs.unlink(path.join(__dirname, 'uploads', filename), (err) => {
    if (err) {
      console.error('Error deleting image file:', err);
      res.status(500).send('Error deleting image file');
    } else {
      res.status(200).send('Image deleted');
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});