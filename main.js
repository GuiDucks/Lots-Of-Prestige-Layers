function loadGameData() {
    MaxLevel = new Decimal(localStorage.getItem('maxLevel')) || new Decimal('1');
    XP = new Decimal(localStorage.getItem('XP')) || new Decimal('0');
    Upg1 = new Decimal(localStorage.getItem('Upg1')) || new Decimal('0');
    PPts = new Decimal(localStorage.getItem('PPts')) || new Decimal('0');
    leaves = new Decimal(localStorage.getItem('leaves')) || new Decimal('0');
    Fire = new Decimal(localStorage.getItem('Fire')) || new Decimal('0');
    Energy = new Decimal(localStorage.getItem('Energy')) || new Decimal('0');
    Silver = new Decimal(localStorage.getItem('Silver')) || new Decimal('0');
    Lava = new Decimal(localStorage.getItem('Lava')) || new Decimal('0');
    Light = new Decimal(localStorage.getItem('Light')) || new Decimal('0');
    Darkness = new Decimal(localStorage.getItem('Dark')) || new Decimal('0');
    Ducks = new Decimal(localStorage.getItem('Ducks')) || new Decimal('0');
    AdjustVisibility();
}
function saveGameData() {
    localStorage.setItem('maxLevel', MaxLevel.toString());
    localStorage.setItem('XP', XP.toString());
    localStorage.setItem('Upg1', Upg1.toString());
    localStorage.setItem('PPts', PPts.toString());
    localStorage.setItem('leaves', leaves.toString());
    localStorage.setItem('Fire', Fire.toString());
    localStorage.setItem('Energy', Energy.toString());
    localStorage.setItem('Silver', Silver.toString());
    localStorage.setItem('Lava', Lava.toString());
    localStorage.setItem('Light', Light.toString());
    localStorage.setItem('Dark', Darkness.toString());
    localStorage.setItem('Ducks', Ducks.toString());
}
let Abbreviations = ["k","M","B","T","Qd","Qn","Sx","Sp","Oc","No"];
let XP = new Decimal(0);
let Level = new Decimal('1');
let MaxLevel = new Decimal('1')
let NextLevelXP = new Decimal(10);
let LevelScaling = new Decimal(1.5);
let Upg1 = new Decimal(0);
let Upg1Cost = new Decimal(20);
let Upg1Boost = new Decimal(1);
let PPts = new Decimal(0);
let PPtsOnPres = new Decimal(0);
let PPtsBoost = new Decimal(1);
let leaves = new Decimal(0);
let LeavesOnPres = new Decimal(0);
let LeavesBoost = new Decimal(1);
let Fire = new Decimal(0);
let FireOnPres = new Decimal(0);
let FireBoost = new Decimal(1);
let FireBoost2 = new Decimal(1);
let Energy = new Decimal(0);
let EnergyOnPres = new Decimal(0);
let EnergyBoost = new Decimal(1);
let EnergyBoost2 = new Decimal(1);
let Silver = new Decimal(0);
let SilverOnPres = new Decimal(0);
let SilverBoost = new Decimal(1);
let SilverBoost2 = new Decimal(1);
let Lava = new Decimal(0);
let LavaOnPres = new Decimal(0);
let LavaBoost = new Decimal(1);
let LavaBoost2 = new Decimal(1);
let LavaBoost3 = new Decimal(1);
let Light = new Decimal(0);
let LightOnPres = new Decimal(0);
let LightBoost = new Decimal(1);
let LightBoost2 = new Decimal(1);
let Darkness = new Decimal(0);
let DarknessOnPres = new Decimal(0);
let DarknessBoost = new Decimal(1);
let DarknessBoost2 = new Decimal(1);
let Ducks = new Decimal(0);
let DucksOnPres = new Decimal(0);
let DucksBoost = new Decimal(1);
let DucksBoost2 = new Decimal(1);
let DucksBoost3 = new Decimal(1);
window.onload = function() {
    loadGameData();
}
function AdjustVisibility(){
    if (MaxLevel.gte(15)){ // Leaves
        document.querySelector('#LeavesDiv').style.display = "block";
        document.querySelector('#LeavesBoostLabel').style.display = "block"; 
    } else {
        document.querySelector('#LeavesDiv').style.display = "none";
        document.querySelector('#LeavesBoostLabel').style.display = "none";
    }
    if (MaxLevel.gte(50)){ // Fire
        document.querySelector('#FireDiv').style.display = "block";
        document.querySelector('#FireBoostLabel').style.display = "block"; 
    } else {
        document.querySelector('#FireDiv').style.display = "none";
        document.querySelector('#FireBoostLabel').style.display = "none";
    }
    if (MaxLevel.gte(600)){ // Energy
        document.querySelector('#EnergyDiv').style.display = "block";
        document.querySelector('#EnergyBoostLabel').style.display = "block"; 
    } else {
        document.querySelector('#EnergyDiv').style.display = "none";
        document.querySelector('#EnergyBoostLabel').style.display = "none";
    }
    if (MaxLevel.gte(1150)){ // Silver
        document.querySelector('#SilverDiv').style.display = "block";
        document.querySelector('#SilverBoostLabel').style.display = "block"; 
    } else {
        document.querySelector('#SilverDiv').style.display = "none";
        document.querySelector('#SilverBoostLabel').style.display = "none";
    }
    if (MaxLevel.gte(2e3)){ // Lava
        document.querySelector('#LavaDiv').style.display = "block";
        document.querySelector('#LavaBoostLabel').style.display = "block"; 
    } else {
        document.querySelector('#LavaDiv').style.display = "none";
        document.querySelector('#LavaBoostLabel').style.display = "none";
    }
    if (MaxLevel.gte(3e3)){ // Light / Dark
        document.querySelector('#LightDiv').style.display = "block";
        document.querySelector('#LightBoostLabel').style.display = "block"; 
        document.querySelector('#DarkDiv').style.display = "block";
        document.querySelector('#DarkBoostLabel').style.display = "block"; 
    } else {
        document.querySelector('#LightDiv').style.display = "none";
        document.querySelector('#LightBoostLabel').style.display = "none"; 
        document.querySelector('#DarkDiv').style.display = "none";
        document.querySelector('#DarkBoostLabel').style.display = "none"; 
    }
    if (MaxLevel.gte(5e3)){ // Ducks
        document.querySelector('#DucksDiv').style.display = "block";
        document.querySelector('#DucksBoostLabel').style.display = "block"; 
    } else {
        document.querySelector('#DucksDiv').style.display = "none";
        document.querySelector('#DucksBoostLabel').style.display = "none";
    }
}
function Tick(){
    Upg1Boost = new Decimal(1.2).pow(Upg1);
    XP = XP.add(new Decimal(0.03).times(PPtsBoost).times(LightBoost).times(DarknessBoost).times(LeavesBoost).times(FireBoost).times(LavaBoost3).times(SilverBoost).times(DucksBoost).times(Upg1Boost));
    CalculateLevel();
    Boosts();
    const xpRemainder = SubtractRemainder(XP,Level,LevelScaling,new Decimal('10'))
    const nextXpRemainder = SubtractRemainder(NextLevelXP,Level,LevelScaling,new Decimal('10'));
    if (Level.gte(2)){
        xpBG.style.width = `${new Decimal('100').times(xpRemainder.div(nextXpRemainder))}%`;
        xpLabel.textContent = `${Format(xpRemainder.floor())} / ${Format(nextXpRemainder)} XP`;
    } else {
        xpBG.style.width = `${new Decimal('100').times(XP.div(NextLevelXP))}%`;
        xpLabel.textContent = `${Format(XP.floor())} / ${Format(NextLevelXP)} XP`;
    }
    if (Fire.gte(0.1) || Lava.gte(0.1)){
        Upgrade('Upg1','XP',true,true,new Decimal(1.75),new Decimal(20),'Upg1Cost')
    }
    document.querySelector('#ttlXpLabel').textContent = `${Format(XP.floor())} Total XP`
}
function Boosts(){
    if (Level.gte(35)){
        PPtsOnPres = new Decimal(1.15).pow(Level.sub(35)).times(1248).times(FireBoost2).times(EnergyBoost).times(LavaBoost);
    } else{
        PPtsOnPres = new Decimal(1.33).pow(Level.sub(10)).times(FireBoost2).times(EnergyBoost2).times(LavaBoost);
    }
    LeavesBoost = leaves.pow(1.4).times(2).add(1);
    if (PPts.lt(1e50)){
        LeavesOnPres = PPts.pow(0.55).div(44.66).times(EnergyBoost2);
    } else {
        LeavesOnPres = PPts.pow(0.25).times(2.24e13).times(EnergyBoost2);
    }
    if (leaves.lt(25e3)){
        FireOnPres = leaves.pow(0.65).div(36.19).times(SilverBoost2).times(DucksBoost2);
    } else {
        FireOnPres = leaves.pow(0.2).div(0.3777).times(SilverBoost2).times(DucksBoost2);
    }
    if (Energy.gte(0.1) || Ducks.gte(0.1)){
        PPts = PPts.add(PPtsOnPres.div(1e2));
    }
    if (Silver.gte(0.1) || Ducks.gte(0.1)){
        leaves = leaves.add(LeavesOnPres.div(1e2));
    }
    if (Lava.gte(0.1) || Ducks.gte(0.1)){
        Fire = Fire.add(FireOnPres.div(1e2));
    }
    if (Light.gte(0.1)){
        Energy = Energy.add(EnergyOnPres.div(1e2));
    }
    if (Ducks.gte(0.1)){
        Silver = Silver.add(SilverOnPres.div(1e2));
    }
    if (Fire.lt(1e15)){
        EnergyOnPres = Fire.pow(0.79).div(70e3).times(LavaBoost2);
    } else {
        EnergyOnPres = Fire.pow(0.3).times(320).times(LavaBoost2);
    }
    SilverOnPres = Energy.pow(0.6).div(251).times(DucksBoost3);
    if (Silver.lt(5e12)){
        LavaOnPres = Silver.pow(0.5).div(31.62);
    } else {
        LavaOnPres = Silver.pow(0.12).times(2117);
    }
    if (Lava.lt(100e3)){
        LightOnPres = Lava.pow(0.56).div(13.18).times(DarknessBoost2);
        DarknessOnPres = Lava.pow(0.56).div(13.18).times(LightBoost2);
    } else {
        LightOnPres = Lava.pow(0.22).times(3.803).times(DarknessBoost2);
        DarknessOnPres = Lava.pow(0.22).times(3.803).times(LightBoost2);
    }
    DucksOnPres = (Darkness.add(Light)).pow(0.55).div(158.4);
    PPtsBoost = PPts.pow(0.9).times(2).add(1);
    FireBoost = Fire.pow(1.1).times(2).add(1);
    FireBoost2 = Fire.pow(0.7).times(1.5).add(1);
    EnergyBoost = Energy.pow(2.1).times(2.5).add(1);
    EnergyBoost2 = Energy.pow(1.4).times(2).add(1);
    SilverBoost = Silver.pow(3.1).times(15).add(1);
    SilverBoost2 = Silver.pow(0.7).times(2.5).add(1);
    LavaBoost = Lava.pow(2.8).times(20).add(1);
    LavaBoost2 = Lava.pow(0.8).times(4).add(1);
    LavaBoost3 = Lava.pow(3.5).times(30).add(1);
    LightBoost = Light.pow(5.5).times(2e3).add(1);
    LightBoost2 = Light.pow(0.6).times(2).add(1);
    DarknessBoost = Darkness.pow(7.3).times(1e9).add(1);
    DarknessBoost2 = Darkness.pow(0.6).times(2).add(1);
    DucksBoost = Ducks.pow(21.2).times(1e18).add(1);
    DucksBoost2 = Ducks.pow(2.5).times(40).add(1);
    DucksBoost3 = Ducks.pow(0.65).times(5).add(1);
}
function UpdateUIs(){
    document.querySelector('#BuyMaxUpg1').textContent = `Buy ${CalculateUpgs(XP,new Decimal(1.75),Upg1,new Decimal(20),true).sub(Upg1)}`
    document.querySelector('#Upg1Cost').textContent = `Cost: ${Format(Upg1Cost)} XP`
    document.querySelector('#Upg1Level').textContent = `Level ${Format(Upg1)}`
    document.querySelector('#PresAmt').textContent = `You have ${Format(PPts)} PPts`
    document.querySelector('#LeavesAmt').textContent = `You have ${Format(leaves)} Leaves`
    document.querySelector('#FireAmt').textContent = `You have ${Format(Fire)} Fire`
    document.querySelector('#EnergyAmt').textContent = `You have ${Format(Energy)} Energy`
    document.querySelector('#SilverAmt').textContent = `You have ${Format(Silver)} Silver`
    document.querySelector('#LavaAmt').textContent = `You have ${Format(Lava)} Lava`
    document.querySelector('#LightAmt').textContent = `You have ${Format(Light)} Light`
    document.querySelector('#DarkAmt').textContent = `You have ${Format(Darkness)} Darkness`
    document.querySelector('#DucksAmt').textContent = `You have ${Format(Ducks)} Ducks`
    document.querySelector('#Upg1BoostLabel').textContent = `This upgrade is boosting XP by x${Format(Upg1Boost)}`
    document.querySelector('#LeavesBoostLabel').textContent = "leaves are boosting XP by x"+Format(LeavesBoost);
    document.querySelector('#PresBoostLabel').textContent = "PPts are boosting XP by x"+Format(PPtsBoost);
    document.querySelector('#FireBoostLabel').textContent = "Fire is boosting PPts by x"+Format(FireBoost2)+" and XP by x"+Format(FireBoost)+" and is autobuying the first upgrade";
    document.querySelector('#EnergyBoostLabel').textContent = "Energy is boosting PPts by x"+Format(EnergyBoost)+" and leaves by x"+Format(EnergyBoost2)+" and is automating PPts";
    document.querySelector('#SilverBoostLabel').textContent = "Silver is boosting XP by x"+Format(SilverBoost)+" and Fire by x"+Format(SilverBoost2)+" and is automating Leaves";
    document.querySelector('#LavaBoostLabel').textContent = "Lava is boosting PPts by x"+Format(LavaBoost)+" and Energy by x"+Format(LavaBoost2)+" and XP by x"+Format(LavaBoost3)+" and is automating Fire";
    document.querySelector('#LightBoostLabel').textContent = "Light is boosting XP by x"+Format(LightBoost)+" and Darkness by x"+Format(LightBoost2)+" and is automating Energy";
    document.querySelector('#DarkBoostLabel').textContent = "Darkness is boosting XP by x"+Format(DarknessBoost)+" and Light by x"+Format(DarknessBoost2);
    document.querySelector('#DucksBoostLabel').textContent = "Ducks are boosting XP by x"+Format(DucksBoost)+" and Fire by x"+Format(DucksBoost2)+" and Silver by x"+Format(DucksBoost3)+" and is automating Silver";
    if (Level.gte(10)){document.querySelector('#PresButton').textContent = `Prestige for ${Format(PPtsOnPres)} PPts` } else {document.querySelector('#PresButton').textContent = "Level 10 Required";}
    if (PPts.gte(1000)){document.querySelector('#LeavesButton').textContent = `Get ${Format(LeavesOnPres)} Leaves` } else {document.querySelector('#LeavesButton').textContent = "1000 PPts Required";}
    if (leaves.gte(250)){document.querySelector('#FireButton').textContent = `Get ${Format(FireOnPres)} Fire` } else {document.querySelector('#FireButton').textContent = "250 Leaves Required";}
    if (Fire.gte(2.5e6)){document.querySelector('#EnergyButton').textContent = `Get ${Format(EnergyOnPres)} Energy` } else {document.querySelector('#EnergyButton').textContent = "2.5M Fire Required";}
    if (Energy.gte(10000)){document.querySelector('#SilverButton').textContent = `Get ${Format(SilverOnPres)} Silver` } else {document.querySelector('#SilverButton').textContent = "10000 Energy Required";}
    if (Silver.gte(1000)){document.querySelector('#LavaButton').textContent = `Get ${Format(LavaOnPres)} Lava` } else {document.querySelector('#LavaButton').textContent = "1000 Silver Required";}
    if (Lava.gte(100)){document.querySelector('#LightButton').textContent = `Get ${Format(LightOnPres)} Light`;document.querySelector('#DarkButton').textContent = `Get ${Format(DarknessOnPres)} Darkness`; } else {document.querySelector('#LightButton').textContent = "100 Lava Required";document.querySelector('#DarkButton').textContent = "100 Lava Required";}
    if (Darkness.gte(5e3)&&Light.gte(5e3)){document.querySelector('#DucksButton').textContent = `Get ${Format(DucksOnPres)} Ducks` } else {document.querySelector('#DucksButton').textContent = "5000 Darkness and Light Required";}
}
function GetVar(Var){
    if (Var == 'Upg1'){return Upg1;}
    else if(Var == 'XP'){return XP;}
    else if(Var == 'Upg1Cost'){return Upg1Cost;}
}
function UpdateVar(Var,value){
    if (Var == 'Upg1'){Upg1=value}
    else if(Var == 'XP' && Fire.lt(0.1) && Lava.lt(0.1)){XP=value;}
    else if(Var == 'Upg1Cost'){Upg1Cost=value}
}
function Upgrade(Var,Curr,max,Mult,Scaling,StartCost,Cost){
    let VarNames = [Curr,Var,Cost]
    Var = GetVar(Var);
    Curr = GetVar(Curr);
    Cost = GetVar(Cost);
    function UpdateCost(){
        if (Mult) {
            UpdateVar(VarNames[2],Scaling.pow(GetVar(VarNames[1])).times(StartCost))
        } else {
            UpdateVar(VarNames[2],Scaling.pow(Scaling.pow(GetVar(VarNames[1])).times(StartCost)))
        }
    }
    if (Curr.gte(Cost)){
        if (max){
            UpdateVar(VarNames[1],CalculateUpgs(Curr,Scaling,Var,StartCost,Mult));
            UpdateVar(VarNames[0],Curr.sub(Cost));
            UpdateCost();
        } else {
            UpdateVar(VarNames[0],Curr.sub(Cost));
            UpdateVar(VarNames[1],Var.add(1));
            UpdateCost();
        }
    }
}
function SubtractRemainder(Currency,Level,Scaling,StartVal){
    return Currency.sub((Scaling.pow(Level.sub(2))).times(StartVal));
}
function CalculateLevel() {
    if (XP.gte(10)){
        Level = getBaseLog(LevelScaling, XP.div(10)).add(2).floor();
        NextLevelXP = LevelScaling.pow(Level.sub(1)).times(10);
        if (Level.gte(MaxLevel)){
            MaxLevel = Level;
        }
    } else {
        Level = new Decimal(1);
        NextLevelXP = new Decimal(10);
    }
    document.querySelector('#lvlLabel').textContent = `Level ${Format(Level)}`
}
function pow10(vall,tier = null) {
    let val = new Decimal('0');
    if (tier == null) {
        return new Decimal('10').pow(vall);
    } else if (tier < 0) {
        val = vall
        val.sign = 1;
        val.layer += tier;
        if (val.layer < 0) {
            val.layer = 0;
            val.mag = getBaseLog(10,vall.mag);
            val.sign = vall.sign;
        }
        return new Decimal(val.toString());
    } else {
        val.sign = 1;
        val.mag = getBaseLog(10,vall).toString();
        val.layer = tier+1;
        return new Decimal(val.toString());
    }
}
function getBaseLog(base, value) {
    const baseDecimal = new Decimal(base);
    const valueDecimal = new Decimal(value);
    const result = valueDecimal.log(baseDecimal);
    return result;
}
function RoundNum(Val) {
    const valDecimal = new Decimal(Val);
    return valDecimal.times(10).ceil()/10;
}
function Format(Val) {
    const valDecimal = new Decimal(Val);
    if (valDecimal.gte(pow10(1e6,4))) {
        if (valDecimal.mag < 1000000) {
            return Format(new Decimal('10').pow(valDecimal.mag)) + "#" + Format(valDecimal.layer)
        } else {
          return Format(valDecimal.mag) + "#" + Format(valDecimal.layer+1)
        }
    } else if (valDecimal.gte('1e1000000')) {
        return "e" + Format(getBaseLog(10,valDecimal))
    } else if (valDecimal.gte('1e1000')) {
        const parts = valDecimal.toExponential(0).split('e');
        const coefficient = parts[0] === "10" ? "1" : parts[0];
        return coefficient + 'e' + getBaseLog(10,valDecimal).add(0.01).floor().toString();
    } else if (valDecimal.gte('1e33') && valDecimal.lt('1e1000')) {
        const formatted = valDecimal.toExponential(2);
        const parts = formatted.split('e');
        parts[0] = parts[0].includes('.') ? parts[0].padEnd(4, '0') : parts[0] + '.00';
        parts[1] = parts[1].replace(/\+/, '');
        return parts.join('e');
    } else if (valDecimal.gte('1e6') && valDecimal.lt('1e33')) {
        let logarithm = getBaseLog(1000,valDecimal.add(0.001)).floor();
        let newVal = valDecimal.add(0.001).div(new Decimal('1000').pow(logarithm))
        let logarithm2 = getBaseLog(10,newVal)
        const formattedValue = newVal.toFixed(4-logarithm2);
    
        return formattedValue+Abbreviations[logarithm.toString()-1];
    } else if (valDecimal.lt('1e3')) {
        return RoundNum(valDecimal).toString();
    } else {
        return valDecimal.floor().toString(); 
    }
}
function CalculateUpgs(Currency,Scaling,CurrentAmt,StartingCost,Mult){
    Scaling = new Decimal(Scaling);
    let Upg = CurrentAmt;
    let Cost = StartingCost.times(Scaling.pow(Upg));
    if (Mult){
        if (Currency.gte(Cost)){
            Upg = getBaseLog(Scaling,Currency.div(StartingCost)).floor();
            Upg = Upg.add(1);
        }
         return Upg;
    } else {
        if (Currency.gte(Scaling.pow(CurrentAmt).times(StartingCost))){
            Upg = getBaseLog(Scaling,getBaseLog(10,Currency).div(getBaseLog(10,StartingCost))).ceil();
            return Upg.add(1);
        } else {
            return Upg;
        }
    }
}
function PrestigeReset(){
    Upg1 = new Decimal(0);
    XP = new Decimal(0);
    Upg1Cost = new Decimal(20);
    PPtsOnPres = new Decimal(0);
}
function LeavesReset(){
    PrestigeReset();
    PPts = new Decimal(0);
    PPtsBoost = new Decimal(1);
    LeavesOnPres = new Decimal(0);
}
function FireReset(){
    LeavesReset();
    leaves = new Decimal(0);
    LeavesBoost = new Decimal(1);
    FireOnPres = new Decimal(0);
}
function Prestige(){
    if (Level.gte(10)){
        PPts = PPts.add(PPtsOnPres);
        PrestigeReset();
    }
}
function Leaves(){
    if (PPts.gte(1000)){
        leaves = leaves.add(LeavesOnPres);
        LeavesReset();
    }
}
function FirePres(){
    if (leaves.gte(250)){
        Fire = Fire.add(FireOnPres);
        FireReset();
    }
}
function EnergyReset(){
    FireReset();
    Fire = new Decimal(0);
    FireBoost = new Decimal(1);
    FireBoost2 = new Decimal(1);
    EnergyOnPres = new Decimal(0);
}
function Energize(){
    if (Fire.gte(2.5e6)){
        Energy = Energy.add(EnergyOnPres);
        EnergyReset();
    }
}
function SilverReset(){
    EnergyReset();
    Energy = new Decimal(0);
    EnergyBoost = new Decimal(1);
    EnergyBoost2 = new Decimal(1);
    SilverOnPres = new Decimal(0);
}
function Silverize(){
    if (Energy.gte(1e4)){
        Silver = Silver.add(SilverOnPres);
        SilverReset();
    }
}
function LavaReset(){
    SilverReset();
    Silver = new Decimal(0);
    SilverBoost = new Decimal(1);
    SilverBoost2 = new Decimal(1);
    LavaOnPres = new Decimal(0);
}
function LavaPrestige(){
    if (Silver.gte(1000)){
        Lava = Lava.add(LavaOnPres);
        LavaReset();
    }
}
function DarkLightReset(){
    LavaReset();
    Lava = new Decimal(0);
    LavaBoost = new Decimal(1);
    LavaBoost2 = new Decimal(1);
    LavaBoost3 = new Decimal(1);
    DarknessOnPres = new Decimal(0);
    LightOnPres = new Decimal(0);
}
function LightPrestige(){
    if (Lava.gte(100)){
        Light = Light.add(LightOnPres);
        DarkLightReset();
    }
}
function DarkPrestige(){
    if (Lava.gte(100)){
        Darkness = Darkness.add(DarknessOnPres);
        DarkLightReset();
    }
}
function DuckReset(){
    DarkLightReset();
    Light = new Decimal(0);
    Darkness = new Decimal(0);
    LightBoost = new Decimal(1);
    LightBoost2 = new Decimal(1);
    DarknessBoost = new Decimal(1);
    DarknessBoost2 = new Decimal(1);
    DucksOnPres = new Decimal(0);
}
function DuckPrestige(){
    if (Light.gte(5e3)&&Darkness.gte(5e3)){
        Ducks = Ducks.add(DucksOnPres);
        DuckReset();
    }
}
setInterval(Tick,25);
setInterval(UpdateUIs,33);
setInterval(AdjustVisibility,300);
const xpLabel = document.querySelector('#lvlXpLabel');
const xpBG = document.querySelector('#LevelBG');
window.addEventListener('beforeunload', saveGameData);