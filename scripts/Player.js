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
        if(selectedHero){
            if(selectedHero.id == "FIRE_SPIRIT") {
                if(grid.getRedGemCount < 5) return null;
            }
        }
        
        let hero = arr != null && arr != undefined && arr.length > 0 ? selectedHero : null;
        return hero;
    }

    checkEnemyHPToAttack() {
        let enemyHeros = enemyPlayer.heroes;
        let firstEnemyHero = enemyHeros.filter(hero => hero.hp > 0)[0];
        let firstPlayerHero = this.getHerosAlive()[0];
        return firstPlayerHero.attack >= firstEnemyHero.hp;
    }

    firstHeroAlive() {
        let arr = this.heroes.filter(hero => hero.isAlive());

        let hero = arr != null && arr != undefined && arr.length > 0 ? arr[0] : null;
        return hero;
    }

    checkHeroGemIsUsable(type) {
        let arr = this.heroes.filter(hero => hero.isAlive());
        let gemTypes = [];
        arr.forEach(hero => {
            hero.gems.forEach(gem => {
                gemTypes.push(gem);
            });
        });
        return gemTypes.includes(type);
    }
    getOptimizeSkillList(castedHero){
        //if target enemy -> cast on CERBERUS / Trau / Zues / Instant Kill
        //if target allies-> cast CERBERRUS
        let targetObj = {};
        let focusEnemiesIdList = ["SEA_GOD","THUNDER_GOD","CERBERUS","FIRE_SPIRIT"];
        let enemyLists = enemyPlayer.heroes;
        let lowestHPHero;
        let aliveEnemyHeroID= [];
        let currentLowestHP = 100000;
        
        enemyLists.forEach(hero => {
            if(hero.hp > 0){
                if(hero.hp <= currentLowestHP) {
                    currentLowestHP = hero.hp;
                    lowestHPHero = hero;
                }
                aliveEnemyHeroID.push(hero.id);
            }
        });

        //Penguin Cast
        if(castedHero.id == "SEA_SPIRIT") {
            console.log("SEA_SPIRIT casting");
            let cerberus = this.heroes[2];
            if(cerberus.isAlive()){
                targetObj = { targetId: cerberus.id,selectedGem: null,gemIndex:null , isTargetAllyOrNot:true};
            }
            else return targetObj;
        }
        //Fire Spirit Cast 
        if(castedHero.id == "FIRE_SPIRIT"){
            console.log("FIRE_SPIRIT casting");
            let filterEnemy = [];
            focusEnemiesIdList.forEach(focusId => {
                aliveEnemyHeroID.forEach(id => {
                    if(id == focusId) filterEnemy.push(id);
                });
            });;

            //Instant kill the lowest HP hero
            if(lowestHPHero.attack + grid.getRedGemCount() >= currentLowestHP) {
               console.log("killing lowsest");
               return targetObj = { targetId: lowestHPHero.id, selectedGem: null,gemIndex:null , isTargetAllyOrNot:false};
            }

            //Focus hero 
            else if(filterEnemy[0])  {
                console.log("focus hero on list"); 
                targetObj = { targetId: filterEnemy[0], selectedGem: null,gemIndex:null , isTargetAllyOrNot:false};
            }
        }
        return targetObj;
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