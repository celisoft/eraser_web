function quit_create()
{
	this.game.add.image(0, 0, 'pic_quit');

	this.game.time.events.loop(Phaser.Timer.SECOND*3, goto_celisoft, this);
}
