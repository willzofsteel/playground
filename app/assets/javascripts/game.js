window.onload = function() {

  (function () {
    var leftKey     = null,
        rightKey    = null,
        downKey     = null,
        upKey       = null,
        posText     = null,
        titleText   = null,
        scoreText   = null,
        score       = 0,
        spaceship   = null;

    

    var game = new Phaser.Game(
      '99',
      '99',
      Phaser.AUTO,
      '',
      {
        preload: preload,
        create: create,
        update: update
      }
      );

    function preload () {
      game.load.image('background', 'game_assets/m16.jpg');
      game.load.spritesheet('ship', 'game_assets/spaceship.png', 32, 32, 4);
    }

    function create () {
      var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
      logo.anchor.setTo(0.5, 0.5);

      titleText = game.add.text(600, 100, "Camille's Space Ace", {  font: '32px Arial', fill: '#ffffff' });

      spaceship = game.add.sprite(game.world.centerX,
          game.world.centerY,
          'ship');

      spaceship.animations.add('walk');
      posText = game.add.text(0, 0, "sprite position:" + spaceship.x + ',' + spaceship.y, {  font: '32px Arial', fill: '#ffffff' });
      scoreText = game.add.text(1450, 0, "Score: " + score, { font: '24px Arial', fill: '#ffffff'});

      spaceship.scale.setTo(2,2);
      game.camera.follow(spaceship);
      game.physics.enable(spaceship, Phaser.Physics.ARCADE);

      leftKey  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      upKey    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      downKey  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

      game.input.keyboard.addKeyCapture([
          Phaser.Keyboard.LEFT,
          Phaser.Keyboard.RIGHT,
          Phaser.Keyboard.UP,
          Phaser.Keyboard.DOWN
      ])

      spaceship.body.collideWorldBounds = true;
      spaceship.body.bounce.setTo(0.5, 0.5);
      spaceship.body.velocity.x = 0;
      spaceship.body.velocity.y = 0;
    }

    function update () {
      if(leftKey.isDown){
        updateShipHorizontal(-5);
      }

      if(rightKey.isDown){
        updateShipHorizontal(5);
      }

      if(upKey.isDown){
        updateShipVertical(-5);
      }

      if(downKey.isDown){
        updateShipVertical(5);
      }
      posText.text = "position:" + Math.floor(spaceship.x) + ',' + Math.floor(spaceship.y);
      posText.text += "| velocity:" + Math.floor(spaceship.body.velocity.x) + ',' + Math.floor(spaceship.body.velocity.y);
      setScoreText();
    }

    function updateShipHorizontal(velocity) {
        spaceship.body.velocity.x += velocity;
        spaceship.animations.play('walk', 1, true);
    }

    function updateShipVertical(velocity) {
        spaceship.body.velocity.y += velocity;
        spaceship.animations.play('walk', 1, true);
    }

    function setScoreText() {
      scoreText.text = "Score: " + score;
    }
  })();
};
