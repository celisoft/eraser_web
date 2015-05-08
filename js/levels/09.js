//Create function required by level 01
function lvl09_create()
{
	this.game.add.image(0, 0, 'default_bg');

	//Activate physic engine
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	platforms = game.add.group();
	platforms.enableBody = true;

	//Generating grounds
	var ground = platforms.create(2*64, 64, 'ground')
	ground.scale.setTo(5, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(10*64, 64, 'ground');
	ground.scale.setTo(5, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(3*64, 3*64, 'ground');
	ground.scale.setTo(2, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(7*64, 3*64, 'ground');
	ground.scale.setTo(3, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(12*64, 3*64, 'ground');
	ground.scale.setTo(2, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(3*64, 5*64, 'ground');
	ground.scale.setTo(4, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(11*64, 5*64, 'ground');
	ground.scale.setTo(4, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(3*64, 7*64, 'ground');
	ground.scale.setTo(12, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(2*64, 9*64, 'ground');
	ground.scale.setTo(3, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(7*64, 9*64, 'ground');
	ground.scale.setTo(7, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	ground = platforms.create(0, 11*64, 'ground');
	ground.scale.setTo(16, 1);
	ground.body.immovable = true;
  	ground.body.checkCollision.down = false;

	//Integrate exit
	exit_door = this.game.add.sprite(8*64, 64, 'hole');
	this.game.physics.arcade.enable(exit_door);
	exit_door.body.immovable = true;

	//Integrating dangers
	dangers = game.add.group();
	dangers.enableBody = true;

	var arachne = game.add.sprite(2*64, 64+16, 'arachne');
	arachne.animations.add('moving', [0, 1, 2, 1], 2, true);
	arachne.animations.play('moving');
	dangers.add(arachne);

	arachne = game.add.sprite(14*64, 64+16, 'arachne');
	arachne.animations.add('moving', [0, 1, 2, 1], 2, true);
	arachne.animations.play('moving');
	dangers.add(arachne);

	arachne = game.add.sprite(9*64, 9*64+16, 'arachne');
	arachne.animations.add('moving', [0, 1, 2, 1], 2, true);
	arachne.animations.play('moving');
	dangers.add(arachne);

	arachne = game.add.sprite(11*64, 9*64+16, 'arachne');
	arachne.animations.add('moving', [0, 1, 2, 1], 2, true);
	arachne.animations.play('moving');
	dangers.add(arachne);

	var plant = game.add.sprite(4*64, 4*64, 'plant');
	plant.animations.add('moving', [1, 0, 1, 2], 1, true);
	plant.animations.play('moving');
	dangers.add(plant);

	plant = game.add.sprite(12*64, 4*64, 'plant');
	plant.animations.add('moving', [2, 0, 2, 1], 1, true);
	plant.animations.play('moving');
	dangers.add(plant);

	plant = game.add.sprite(3*64, 10*64, 'plant');
	plant.animations.add('moving', [2, 0, 2, 1], 1, true);
	plant.animations.play('moving');
	dangers.add(plant);

	slimes = game.add.group();
	slimes.enableBody = true;
	var monster = game.add.sprite(7*64,6*64, 'monster');
	monster.animations.add('moving',[0,1,2],1, true);
	monster.animations.play('moving');
	monster.scale.x *= -1;
	slimes.add(monster);

	monster = game.add.sprite(8*64,8*64, 'monster');
	monster.animations.add('moving',[0,1,2],1, true);
	monster.animations.play('moving');
	monster.scale.x *= -1;
	slimes.add(monster);

	monster = game.add.sprite(7*64,10*64, 'monster');
	monster.animations.add('moving',[0,1,2],1, true);
	monster.animations.play('moving');
	monster.scale.x *= -1;
	slimes.add(monster);

	slimes_max = 5;
	slimes_cpt = 0;
	slimes_dir = 0;

	ghosts = game.add.group();
	ghosts.enableBody = true;
	var ghost = ghosts.create(5*64,2*64, 'ghost');
	ghost.body.gravity.y = 250;

	ghost = ghosts.create(11*64,2*64, 'ghost');
	ghost.body.gravity.y = 250;

	ghost = ghosts.create(8*64,5*64, 'ghost');
	ghost.body.gravity.y = 250;

	ghost = ghosts.create(2*64,7*64, 'ghost');
	ghost.body.gravity.y = 250;

	ghost = ghosts.create(14*64,6*64, 'ghost');
	ghost.body.gravity.y = 250;

	init_pics(7, 9, 2);

	// Timers
	timers = game.add.group();
	timers.enableBody = true;
	var timer = timers.create(3*64,8*64, 'timer');
	timer.body.immovable = true;

	timer = timers.create(4*64,10*64, 'timer');
	timer.body.immovable = true;

	//Define the mouse cursor and callback require on move
	this.cursor_sprite = this.game.add.sprite(game.world.centerX, game.world.centerY, 'mouse_cursor');
	this.game.physics.arcade.enable(this.cursor_sprite);
	this.game.input.addMoveCallback(mouse_move, this);

	//Integrate player
	player = game.add.sprite(15*64, 10*64, 'playersheet');
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

function lvl09_switch()
{
	platforms.removeAll(true, false);
	dangers = 0;
	exit_door.destroy();
	player.destroy();
	player_dir = 1;
	key_cursors = 0;

	this.game.state.start('lvl10');
}

function lvl09_update()
{
	this.game.physics.arcade.collide(player, platforms);

	this.game.physics.arcade.collide(ghosts, platforms);
	player_move();

	this.game.physics.arcade.overlap(player, exit_door, lvl09_switch, null, this);
	this.game.physics.arcade.overlap(player, timers, timer_collision, null, this);
	this.game.physics.arcade.overlap(player, dangers, danger_collision, null, this);
	this.game.physics.arcade.overlap(player, ghosts, danger_collision, null, this);
	this.game.physics.arcade.overlap(player, slimes, danger_collision, null, this);
}
