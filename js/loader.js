//This var will contains the displayed text at the loading screen
var load_status;

function loader_preload()
{
	this.game.load.image('menu_bg', 'assets/menu.png');
}

//Preload data required by the game
function loader_load()
{
	//Common UI graphics
	this.game.load.image('bt_play', 'assets/bt_play.png');
	this.game.load.image('bt_quit', 'assets/bt_quit.png');
	this.game.load.image('mouse_cursor', 'assets/eraser.png');

	//Backgrounds
	this.game.load.image('default_bg', 'assets/backgrounds/default.png');
	this.game.load.image('bg_01', 'assets/backgrounds/01.png');
	this.game.load.image('bg_02', 'assets/backgrounds/02.png');
	this.game.load.image('bg_03', 'assets/backgrounds/03.png');
	this.game.load.image('bg_04', 'assets/backgrounds/04.png');

	//Common graphics
	this.game.load.image('ground', 'assets/ground.png');
	this.game.load.image('hole', 'assets/hole.png');
	this.game.load.image('pencil', 'assets/pencil.png');

	//Simple enemies / danger / collectables
	this.game.load.image('ghost', 'assets/ghost.png');
	this.game.load.image('timer', 'assets/timer.png');

	//Animated enemies / danger
	this.game.load.spritesheet('arachne', 'assets/arachne.png', 32, 64, 3);
	this.game.load.spritesheet('monster', 'assets/monster.png', 64, 64, 3);
	this.game.load.spritesheet('plant', 'assets/plant.png', 96, 64, 3);
	this.game.load.spritesheet('spikes', 'assets/spike.png', 64, 64, 2);

	//Player spritesheet
	this.game.load.spritesheet('playersheet', 'assets/playersheet.png', 32, 52, 3);

	//Background music
	this.game.load.audio('music', ['assets/sfx/mp3/music.mp3', 'assets/sfx/ogg/music.ogg']);

	//In-game sounds
	this.game.load.audio('snd_eraser', ['assets/sfx/mp3/eraser.mp3', 'assets/sfx/ogg/eraser.ogg']);
	this.game.load.audio('snd_dead_splash', ['assets/sfx/mp3/dead_splash.mp3', 'assets/sfx/ogg/dead_splash.ogg']);
	this.game.load.audio('snd_timer', ['assets/sfx/mp3/timer.mp3', 'assets/sfx/ogg/timer.ogg']);

	//Loading possible endings
	this.game.load.image('pic_quit', 'assets/pic_quit.png');
	this.game.load.image('pic_end', 'assets/pic_end.png');
	this.game.load.image('pic_fail', 'assets/pic_fail.png');
	this.game.load.image('pic_notime', 'assets/pic_notime.png');

	this.game.load.start();
}

//Display loading text and launch preload after defining what to do next
function loader_create()
{
	this.game.add.image(0, 0, 'menu_bg');

	this.game.load.onFileComplete.add(loader_refresh, this);
	this.game.load.onLoadComplete.add(loader_next, this);

	//Display th loading please wait text
	var load_text = this.game.add.text(0.6*this.game.world.width, 0.6*this.game.world.height, 'Loading game data...', {fontSize: '38px', fill: '#000000'});
	
	//Display the status of file loading to inform the user that it's in progress
	load_status = this.game.add.text(this.game.world.width/2, this.game.world.height-32, 'Preloading data', {fontSize: '16px', fill: '#000000'});

	loader_load();
}

function loader_refresh(progress, cacheKey, success, totalLoaded, totalFiles)
{
	load_status.setText("[" + cacheKey + "]");
}

//Swich to menu state
function loader_next()
{
	this.game.state.start('menu');
}
