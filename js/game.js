/*
 * The game starts here
 */

//Common vars
var music;
var snd_splash;
var snd_time;
var snd_erase;
var cursor_sprite;
var platforms;
var exit_door;
var dangers;
var ghosts;
var ghosts_fly;
var slimes;
var slimes_dir;
var slimes_max;
var slimes_cpt;
var player;
var player_dir;
var key_cursors;
var level_timer;
var level_timer_display;
var timers;

//Initialize game into 1024x768 canvas. Phaser.AUTO switches to WebGL if possible.
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game_div');

//State to preload game data
game.state.add('load', {preload: loader_preload, create: loader_create});

//State to display menu
game.state.add('menu', {create: menu_create});

//Level scripts
game.state.add('lvl01', {create: lvl01_create, update: lvl01_update});
game.state.add('lvl02', {create: lvl02_create, update: lvl02_update});
game.state.add('lvl03', {create: lvl03_create, update: lvl03_update});
game.state.add('lvl04', {create: lvl04_create, update: lvl04_update});
game.state.add('lvl05', {create: lvl05_create, update: lvl05_update});
game.state.add('lvl06', {create: lvl06_create, update: lvl06_update});
game.state.add('lvl07', {create: lvl07_create, update: lvl07_update});
game.state.add('lvl08', {create: lvl08_create, update: lvl08_update});
game.state.add('lvl09', {create: lvl09_create, update: lvl09_update});
game.state.add('lvl10', {create: lvl10_create, update: lvl10_update});


//States used to manage the 4 possible ends
game.state.add('quit', {create: quit_create});
game.state.add('fail', {create: fail_create});
game.state.add('notime', {create: notime_create});
game.state.add('end', {create: end_create});

//Start the game with load state
game.state.start('load');

//Mouse move callback used into menu or game
function mouse_move()
{
	this.cursor_sprite.x = this.game.input.x;
	this.cursor_sprite.y = this.game.input.y;
}

//Initialize every spikes of a given line (posY) from X to Y
//This initialization is externalized from create function because
//it could be called a lot of times during init levels
function init_pics(startX, endX, posY)
{
	for(var p=startX; p<=endX; p++)
	{
		var pic = game.add.sprite(p*64, posY*64, 'spikes');
		pic.animations.add('moving', [0, 2], 2, true);
		pic.animations.play('moving');
		dangers.add(pic);
	}
}

//function called at each update
function player_move()
{
	player.body.velocity.x = 0;
	if(key_cursors.left.isDown)
	{
		if(player_dir == 0)
		{
			player.scale.x *= -1;
			player_dir = 1;
		}

		player.body.velocity.x = -200;
		player.animations.play('walk');
	}
	else if(key_cursors.right.isDown)
	{
		if(player_dir == 1)
		{
			player.scale.x *= -1;
			player_dir = 0;
		}
		player.body.velocity.x = 200;
		player.animations.play('walk');
	}
	else
	{
		player.animations.stop();
		player.frame = 2;
	}

	if(key_cursors.up.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -350;
	}
}

//Function called every seconds
function slimes_move()
{
	slimes.forEach(slime_move, this);	
	
	//The slime direction is right
	if(slimes_dir == 0)
	{
		if(slimes_cpt == slimes_max)
		{
			slimes_dir = 1;
		}
		slimes_cpt++;
	}
	else
	{
		if(slimes_cpt == 1)
		{
			slimes_dir = 0;
		}
		slimes_cpt--;
	}
}

//Function used to move a slime
function slime_move(child)
{
	//The slime direction is right
	if(slimes_dir == 0)
	{
		if(slimes_cpt == slimes_max)
		{
			child.scale.x *= -1;
		}
		else
		{
			child.x += 64;	
		}
	}
	else
	{
		if(slimes_cpt == 1)
		{
			child.scale.x *= -1;
		}
		else
		{
			child.x -= 64;
		}
	}

}

//Function called every 1.25 seconds
function ghosts_move()
{
	if(ghosts_fly)
	{
		ghosts.forEach(ghost_move, this);
	}
	else
	{
		ghosts_fly = true;
	}
}

//Function called every 1.25 seconds
function ghost_move(child)
{
	if(ghosts_fly)
	{
		child.body.velocity.y = -100;
	}
}
//Function called every seconds during the current level
//If the timer value is equal to zero, then display no more time !
function decrease_time()
{
	level_timer--;
	level_timer_display.text = level_timer;
	if(level_timer == 0)
	{
		player.kill();
		this.game.state.start('notime');
	}
}

//Function called when player collides a timer
function timer_collision(player, timer)
{
	timer.kill();
	if(!snd_time)
	{
		snd_time=this.game.add.audio('snd_timer');
	}
	snd_time.play();
	level_timer += 5;
	level_timer_display.text = level_timer;
}

//Function called when player collides with a danger
function danger_collision(player, danger)
{
	//Do not use deztroy() -> a.body will be null in update function
	player.kill();
	if(!snd_splash)
	{
		snd_splash=this.game.add.audio('snd_dead_splash');
	}
	snd_splash.play();
	this.game.state.start('fail');
}

//Function called onClick in order to check if there's something to erase
function check_eraser_collision()
{
	this.game.physics.arcade.overlap(this.cursor_sprite, dangers, erase_danger, null, this);
	this.game.physics.arcade.overlap(this.cursor_sprite, slimes, erase_danger, null, this);
	this.game.physics.arcade.overlap(this.cursor_sprite, timers, erase_danger, null, this);
}

//Destroy the danger to erase
function erase_danger(eraser, game_object)
{
	game_object.kill();
	if(!snd_erase)
	{
		snd_erase=this.game.add.audio('snd_eraser');
	}
	snd_erase.play();
}

//Function to set 'menu' state
function back_to_menu()
{
	this.game.state.start('menu');
}

//Function to replace current location by the official game page
function goto_celisoft()
{
	window.location.replace('http://www.celisoft.com/nos-jeux/eraser/');
}
