window.onload = function () {
  (function () {
    var game = new Phaser.Game('99', '99', Phaser.AUTO, '');


    var boot = function (game) {
      var preload = function () {
        this.game.load.image('titlescreen', 'game_assets/title_screen.png');
      }

      var create = function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.setScreenSize();
        this.game.state.start('Preload');

      }

      return {
        preload: preload,
        create: create
      }
    };

    var preload = function (game) {
      var preload = function () { } 
      var create = function () { 
        this.game.state.start('TitleScreen');
      }

      return {
        preload: preload,
        create: create
      }
    };

    var titleScreen = function (game) {
      this.scaleX = 1;
      this.scaleY = 1;
      var me = this;

      var preload = function () {
        this.game.load.image('title', 'game_assets/title_screen.png');
      } 
      var create = function () { 
        me.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        me.title = this.game.add.sprite(200, 0, 'title');
        me.playGameText = this.game.add.text(0, 0, '', {
          font: '52px Arial',
          fill: '#ffffff'
        });

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.SPACEBAR
        ]);
      }

      var update = function () {
        if ((me.scaleX <= 25) && (me.scaleY <= 25)) {
          me.title.scale.setTo(me.scaleX, me.scaleY);
          me.scaleX += .25;
          me.scaleY += .25;
        }
        else {
          me.playGameText.x = me.title.width / 2;
          me.playGameText.y = me.title.height - (me.title.height / 7);
          me.playGameText.text = 'Press SpaceBar';
        }

        if(me.spacebar.isDown) {
          me.startGame = true;
        }

        if(me.startGame){
          this.game.state.start('GameScreen', true);
        }
      }

      return {
        preload: preload,
        create: create,
        update: update
      }
    };

    var gameScreen = function(game) {
      var me = this;
      me.asteroids = [];

      var preload = function () {
        this.game.load.image('background', 'game_assets/m16.jpg');
        this.game.load.spritesheet('ship', 'game_assets/spaceship.png', 32, 32, 4);
        this.game.load.spritesheet('asteroids', 'game_assets/asteroid1.png', 64, 64, 4);
      };

      var create = function () {
        me.background = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        me.background.anchor.setTo(0.5, 0.5);

        me.spaceship = game.add.sprite(game.world.centerX,
            game.world.centerY,
            'ship');

        var asteroid1 = game.add.sprite(-10, 0, 'asteroids');
        var asteroid2 = game.add.sprite(-10, 100, 'asteroids');
        var asteroid3 = game.add.sprite(400, -10, 'asteroids');

        me.asteroids.push(asteroid1);
        me.asteroids.push(asteroid2);
        me.asteroids.push(asteroid3);

        me.spaceship.animations.add('walk');
        me.spaceship.scale.setTo(2,2);

        me.leftKey  = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        me.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        me.upKey    = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        me.downKey  = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
            ])

        this.game.physics.enable(me.spaceship, Phaser.Physics.ARCADE);
        setAsteroid(asteroid1, this.game);
        setAsteroid(asteroid2, this.game);
        setAsteroid(asteroid3, this.game);

        me.spaceship.body.collideWorldBounds = true;
        me.spaceship.body.bounce.setTo(0.5, 0.5);
        me.spaceship.body.velocity.x = 0;
        me.spaceship.body.velocity.y = 0;

      };

      var setAsteroid = function (asteroid, game){
        game.physics.enable(asteroid, Phaser.Physics.ARCADE);

        asteroid.body.collideWorldBounds = true;
        asteroid.body.bounce.setTo(1,1);
        asteroid.body.velocity.x = 10;
        asteroid.body.velocity.y = 14;
      }

      var increaseAsteroidSpeed = function (){
        me.asteroids.forEach(function (asteroid) {
          asteroid.body.velocity.x += .195;
          asteroid.body.velocity.y += .395;
        });
      }

      var update = function () {
        increaseAsteroidSpeed();

        if(me.leftKey.isDown){
          updateShipHorizontal(-5);
        }

        if(me.rightKey.isDown){
          updateShipHorizontal(5);
        }

        if(me.upKey.isDown){
          updateShipVertical(-5);
        }

        if(me.downKey.isDown){
          updateShipVertical(5);
        }

      }

      function updateShipHorizontal(velocity) {
        me.spaceship.body.velocity.x += velocity;
        me.spaceship.animations.play('walk', 1, true);
      }

      function updateShipVertical(velocity) {
        me.spaceship.body.velocity.y += velocity;
        me.spaceship.animations.play('walk', 1, true);
      }

      return {
        preload: preload,
        create: create,
        update: update
      }
    }

    game.state.add('Boot', boot);
    game.state.add('Preload', preload);
    game.state.add('TitleScreen', titleScreen);
    game.state.add('GameScreen', gameScreen);
    //game.state.add('GameOver', gameover_screen);

    game.state.start('Boot');
  })();
}
