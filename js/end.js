function end_create()
{
	background = this.game.add.image(0, 0, 'pic_end');

	this.game.add.text(64, 63*64, "Congratulations !",{fontSize: '32px', fill:'#000000'});
	this.game.add.text(64, 6*64, "You have done 10 levels in " + global_timer + " seconds.",{fontSize: '32px', fill:'#000000'});
	
	this.game.time.events.loop(Phaser.Timer.SECOND*5, back_to_menu, this);
}
