window.onload = function() {

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

    var spaceship = game.add.sprite(game.world.centerX,
                                    game.world.centerY,
                                    'ship');

    spaceship.scale.x *= -1;
    game.add.tween(spaceship).to( { angle: 180 }, 6000, Phaser.Easing.Linear.None, true);
    spaceship.animations.add('walk');
    spaceship.animations.play('walk', 1, true);
    game.add.tween(spaceship).to(
        { x:game.width },
        9000,
        Phaser.Easing.Linear.None, 
        true,
        2000);

//spaceship.scale.setTo(2,2);
  }

  function update () {

  }
};
