//Create function required by level 01
function lvl05_create()
{
	this.game.add.image(0, 0, 'default_bg');

	//Activate physic engine
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	platforms = game.add.group();
	platforms.enableBody = true;

	//Generating grounds
	var ground = platforms.create(0, 4*64, 'ground')
	ground.scale.setTo(6, 1);
	ground.body.immovable = true;
 	ground.body.checkCollision.down = false;

	ground = platforms.create(9*64, 4*64, 'ground');
	ground.scale.setTo(7, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(6*64, 6*64, 'ground');
	ground.scale.setTo(4, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(10*64, 8*64, 'ground');
	ground.scale.setTo(3, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(1*64, 9*64, 'ground');
	ground.scale.setTo(8, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(0, 11*64, 'ground');
	ground.scale.setTo(16, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	//Integrate exit
	exit_door = this.game.add.sprite(14*64, 9*64, 'hole');
	this.game.physics.arcade.enable(exit_door);
	exit_door.body.immovable = true;

	//Integrating dangers
	dangers = game.add.group();
	dangers.enableBody = true;

	var arachne = game.add.sprite(10*64, 8*64+16, 'arachne');
	arachne.animations.add('moving', [0, 1, 2, 1], 2, true);
	arachne.animations.play('moving');
	dangers.add(arachne);

	var plant = game.add.sprite(13*64, 3*64, 'plant');
	plant.animations.add('moving', [1, 0, 1, 2], 1, true);
	plant.animations.play('moving');
	dangers.add(plant);

	slimes = game.add.group();
	slimes.enableBody = true;
	var slime = game.add.sprite(5*64,10*64, 'monster');
	slime.animations.add('moving',[0,1,2],1, true);
	slime.animations.play('moving');
	slime.scale.x *= -1;
	slimes.add(slime);
	slimes_max = 7;
	slimes_cpt = 0;
	slimes_dir = 0;

	ghosts = game.add.group();
	ghosts.enableBody = true;
	var ghost = ghosts.create(9*64,5*64, 'ghost');
	ghost.body.gravity.y = 250;

	init_pics(6, 9, 5);

	// Timers
	timers = game.add.group();
	timers.enableBody = true;
	var timer = timers.create(14*64,3*64, 'timer');
	timer.body.immovable = true;

	//Define the mouse cursor and callback require on move
	this.cursor_sprite = this.game.add.sprite(game.world.centerX, game.world.centerY, 'mouse_cursor');
	this.game.physics.arcade.enable(this.cursor_sprite);
	this.game.input.addMoveCallback(mouse_move, this);

	//Integrate player
	player = game.add.sprite(64, 3*64, 'playersheet');
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
	this.game.time.events.loop(Phaser.Timer.SECOND*1.25, ghosts_move, this);
	this.game.time.events.loop(Phaser.Timer.SECOND*0.25, slimes_move, this);
}

function lvl05_switch()
{
	platforms.removeAll(true, false);
	dangers = 0;
	exit_door.destroy();
	player.destroy();
	player_dir = 1;
	key_cursors = 0;

	global_timer += 15-level_timer;
	this.game.state.start('lvl06');
}

function lvl05_update()
{
	this.game.physics.arcade.collide(player, platforms);
	this.game.physics.arcade.collide(ghosts, platforms);
	player_move();

	this.game.physics.arcade.overlap(player, exit_door, lvl05_switch, null, this);
	this.game.physics.arcade.overlap(player, timers, timer_collision, null, this);
	this.game.physics.arcade.overlap(player, dangers, danger_collision, null, this);
	this.game.physics.arcade.overlap(player, ghosts, danger_collision, null, this)
	this.game.physics.arcade.overlap(player, slimes, danger_collision, null, this)
}
