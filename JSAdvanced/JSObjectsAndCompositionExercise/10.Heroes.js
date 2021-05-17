function solve() {
    const mageHero = {
        health: 100,
        mana: 100,
        cast,
    };
    const fighterHero = {
        health: 100,
        stamina: 100,
        fight,
    };
    
    return {
        mage: function (name) {
            let hero= Object.assign(mageHero);
            hero.name=name;
            return hero;
            },
        fighter: function (name) {
            let hero= Object.assign(fighterHero);
            hero.name=name;
            return hero;
            }
        };

    function fight() {
        this.stamina--;
       console.log(`${this.name} slashes at the foe!`);
    };
    function cast(spell) {
        this.mana--;
        console.log(`${this.name} cast ${spell}`);
    };
}

let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);

