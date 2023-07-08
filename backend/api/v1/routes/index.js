const express = require('express');
const HouseController = require('../controllers/HouseController');
const UserController = require('../controllers/UserController');
const upload = require('../middelwares/upload');

const router = express.Router();

/**
 * House section
 */

router.post(
  '/houses', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 3 }]),
  HouseController.postHouse,
);

router.get('/houses', HouseController.getHouse);
router.delete('/houses', HouseController.deleteHouse);
router.put(
  '/houses',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 3 }]),
  HouseController.updateHouse,
);
router.post('/appointment/:houseId', HouseController.bookHouse);
/**
 * User section
 */

router.post('/login', UserController.postLogin);
router.post('/logout', UserController.postLogout);
router.put('/reset-password', UserController.putPassword);
router.post('/users', UserController.postUser);
router.put('/users', UserController.putUser);
router.get('/users', UserController.getUser);
router.delete('/users', UserController.deleteUser);

/**
 * Sanity check
 */

router.get('/ping', (req, res) => {
  res.json({ success: true, message: 'pong' });
});

/**
 * test routes
 */

router.get('/login', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>HELLO PAGE</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
    </head>
        <body>
          <h1>Hello World!</h1>
          <form method="POST" action="/api/v1/login" enctype="application/json">
            <input type="hidden" name="csrf_token" value="{{ csrf_token() }}"/>
            <label for="uname">Enter email:</label>
            <input type="text" id="uname" name="email" autocomplete="on" required /><br><br>
            <label for="pwd">Enter password:</label>
            <input type="password" id="pwd" name="password" autocomplete="current-password" required /><br><br>
            <input type="checkbox" name="check" value="rem" />Remember me<br><br>
            <input type="submit" value="Submit Credentials" />
          </form>
        </body>
</html>
    `);
});

module.exports = router;
