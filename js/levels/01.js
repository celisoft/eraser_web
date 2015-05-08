//Create function required by level 01
function lvl01_create()
{
	this.game.add.image(0, 0, 'bg_01');

	//Activate physic engine
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	platforms = game.add.group();
	platforms.enableBody = true;

	//Generating grounds
	var ground = platforms.create(0, 0, 'ground')
	ground.scale.setTo(16, 1);
	ground.body.immovable = true;
	ground.body.checkCollision.down = false;

	ground = platforms.create(7*64, 5*64, 'ground');
	ground.scale.setTo(3, 1);
	ground.body.immovable = true;
	ground.body.checkCollision.down = false;

	ground = platforms.create(6*64, 7*64, 'ground');
	ground.scale.setTo(5, 1);
	ground.body.immovable = true;
	ground.body.checkCollision.down = false;

	ground = platforms.create(5*64, 9*64, 'ground');
	ground.scale.setTo(7, 1);
	ground.body.immovable = true;
	ground.body.checkCollision.down = false;

	ground = platforms.create(0, 11*64, 'ground');
	ground.scale.setTo(16, 1);
	ground.body.immovable = true;
	ground.body.checkCollision.down = false;

	//Pencil
	var pencil = this.game.add.sprite(6*64,9*64+16,'pencil')
	pencil = this.game.add.sprite(10*64,9*64+16,'pencil')

	//Integrate exit
	exit_door = this.game.add.sprite(8*64, 2*64, 'hole');
	this.game.physics.arcade.enable(exit_door);
	exit_door.body.immovable = true;


	//Integrating dangers
	dangers = game.add.group();
	dangers.enableBody = true;

	var arachne = game.add.sprite(64, 16, 'arachne');
	arachne.animations.add('moving', [0, 1, 2, 1], 2, true);
	arachne.animations.play('moving');
	dangers.add(arachne);

	var plant = game.add.sprite(0, 10*64, 'plant');
	plant.animations.add('moving', [1, 0, 1, 2], 1, true);
	plant.animations.play('moving');
	dangers.add(plant);

	plant = game.add.sprite(14*64, 10*64, 'plant');
	plant.animations.add('moving', [2, 0, 2, 1], 1, true);
	plant.animations.play('moving');
	dangers.add(plant);

	//Define the mouse cursor and callback require on move
	this.cursor_sprite = this.game.add.sprite(game.world.centerX, game.world.centerY, 'mouse_cursor');
	this.game.physics.arcade.enable(this.cursor_sprite);
	this.game.input.addMoveCallback(mouse_move, this);

	//Integrate player
	player = game.add.sprite(7*64, 8*64, 'playersheet');
	player.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(player);
	player.body.gravity.y = 450;
	player.body.collideWorldBounds = true;
	player.animations.add('walk', [1, 2], 10, true);
	player_dir = 1;

	key_cursors = this.game.input.keyboard.createCursorKeys();
	this.game.input.onDown.add(check_eraser_collision, this);

	level_timer = 15;
	level_timer_display = this.game.add.text(this.game.world.width-64,32,level_timer,{fontSize: '32px', fill:'#000000'});
	this.game.time.events.loop(Phaser.Timer.SECOND, decrease_time, this);
}

function lvl01_switch()
{
	platforms.removeAll(true, false);
	dangers = 0;
	exit_door.destroy();
	player.destroy();
	player_dir = 1;
	key_cursors = 0;

	this.game.state.start('lvl02');
}

function lvl01_update()
{
	this.game.physics.arcade.collide(player, platforms);

	player_move();

	this.game.physics.arcade.overlap(player, exit_door, lvl01_switch, null, this);
	this.game.physics.arcade.overlap(player, dangers, danger_collision, null, this);
}
