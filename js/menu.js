function menu_create()
{
	//Display the background
	this.game.add.image(0, 0, 'menu_bg');

	//Define music to play and loop on it
	if(!music)
	{
		music = this.game.add.audio('music');
		music.play('', 0, 0.25, true);
	}

	//Display buttons and defines a callback
	var bt_play = this.game.add.image(2*game.world.width/3, game.world.height/2, 'bt_play');
	var bt_exit = this.game.add.image(2*game.world.width/3, 2*game.world.height/3, 'bt_quit');
	bt_play.inputEnabled = true;
	bt_exit.inputEnabled = true;
	bt_play.events.onInputDown.add(menu_next, this);
	bt_exit.events.onInputDown.add(menu_exit, this);

	//Define the mouse cursor and callback require on move
	this.cursor_sprite = this.game.add.image(game.world.centerX, game.world.centerY, 'mouse_cursor');
	this.game.input.addMoveCallback(mouse_move, this);
}

//The user choose to play
function menu_next()
{
	this.game.state.start('lvl09');
}

//The user choose exit
function menu_exit()
{
	this.game.input.deleteMoveCallback(0);
	this.game.sound.destroy(this.music);
	this.cursor_sprite.destroy();
	this.game.state.start('quit', false, true);
}
