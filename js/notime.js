function notime_create()
{
	background = this.game.add.image(0, 0, 'pic_notime');

	this.game.time.events.loop(Phaser.Timer.SECOND*5, back_to_menu, this);
}
