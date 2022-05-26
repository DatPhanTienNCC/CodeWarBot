class Player
{
    constructor(playerId, name)
    {
        this.signature = Math.random();
        this.playerId = playerId;
        this.displayName = name;

        this.heroes = [];
        this.heroGemType = new Set();
    }

    getTotalHeroAlive() {
        return this.getHerosAlive().length;
    }

    getHerosAlive() {
        return this.heroes.filter(hero => hero.isAlive());
    }
    

    getCastableHeros() {
        let arr = this.heroes.filter(hero => hero.isAlive() && hero.isFullMana());
        return arr;
    }

    sameOne(other) {
        return this.signature == other.signature;
    }

    isLose() {
        return !this.firstHeroAlive();
    }

    // anyHeroFullMana() {
    //     let arr = this.heroes.filter(hero => hero.isAlive() && hero.isFullMana());
    //     let hero = arr != null && arr != undefined && arr.length > 0 ? arr[0] : null;
    //     console.log(hero);
    //     return hero;
    // }



    anyHeroFullMana() {
        let arr = this.heroes.filter(hero => hero.isAlive() && hero.isFullMana());
        let selectedHero = arr[0];
        if(arr.length == 2) {
            console.log(arr[0]);
            selectedHero = arr[1];
        } 
        else if(arr.length == 3) {
            console.log(arr[0]);
            selectedHero = arr[2];
        } 
        let hero = arr != null && arr != undefined && arr.length > 0 ? selectedHero : null;
        return hero;
    }

    checkEnemyHPToAttack() {
        let enemyHeros = enemyPlayer.heroes;
        let firstEnemyHero = enemyHeros.filter(hero => hero.hp > 0)[0];
        let firstPlayerHero = this.getHerosAlive()[0];
        console.log(firstPlayerHero.attack > firstEnemyHero.hp);
        return firstPlayerHero.attack > firstEnemyHero.hp;
    }

    firstHeroAlive() {
        let arr = this.heroes.filter(hero => hero.isAlive());

        let hero = arr != null && arr != undefined && arr.length > 0 ? arr[0] : null;
        return hero;
    }

    checkHeroGemIsUsable(type) {
        console.log(type);
        let arr = this.heroes.filter(hero => hero.isAlive());
        arr.forEach(hero => {
            console.log(hero.gems);
            let gems = hero.gems;
                gems.forEach(gem => {
                    return gem == type;
                });
        });
    }

    getRecommendGemType() {
        this.heroGemType = new Set();

        for (let i = 0; i < this.heroes.length; i++){
            let hero = this.heroes[i];

            for (let j = 0; j < hero.gemTypes.length; j++){
                let gt = hero.gemTypes[j];
                this.heroGemType.add(GemType[gt]);
            }
        }        

        return this.heroGemType;
    }

    firstAliveHeroCouldReceiveMana(type) {
        const res = this.heroes.find(hero => hero.isAlive() && hero.couldTakeMana(type));
        return res;
    }

    clone() {
        const cloned = new Player(this.playerId, this.displayName);
        cloned.heroes = this.heroes.map(hero => hero.clone());
        cloned.heroGemType = new Set(Array.from(this.heroGemType));
        cloned.signature = this.signature;
        cloned.metrics = this.metrics;
        return cloned;
    }
}