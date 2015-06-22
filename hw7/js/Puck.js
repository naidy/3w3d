var Puck = function ()
{
    this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3(0, 0, 0);
    this.mesh = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 2, 32),
        new THREE.MeshBasicMaterial({
        	transparent: true,
        	opacity: 1.0
        }));
    this.pColor = new THREE.Color();
    this.pColor.setHSL (Math.random(), 0.7, 0.7);
    this.pointLight = new THREE.PointLight (this.pColor.getHex(), 0.5);
    this.mesh.material.color = this.pColor;
    this.ID = pID;
    pID++;
    //pucks.push(this);

    scene.add (this.mesh);
    scene.add (this.pointLight);
};
Puck.prototype.update = function (dt)
{
    this.pos.add (this.vel.clone().multiplyScalar (dt));
    this.mesh.position.copy (this.pos);
    this.pointLight.position.set (this.pos.x, 10, this.pos.z);
    this.pointLight.color = this.pColor;
    this.mesh.material.color = this.pColor;
};
Puck.prototype.collision = function ()
{
    if (this.pos.x > 100)
    {
        this.pos.x = 100;
        this.vel.set (-this.vel.x, 0, this.vel.z);
        this.pColor.setHSL(Math.random(), 0.7, 0.7);
    }
    else if (this.pos.x < -100)
    {
        this.pos.x = -100;
        this.vel.set (-this.vel.x, 0, this.vel.z);
        this.pColor.setHSL(Math.random(), 0.7, 0.7);
    }
    if (this.pos.z > 100)
    {
        /*if (this.pos.x < 55 && this.pos.x > -55)
        {    
            this.kill();
        }
        else
        {
            this.pos.z = 100;
            this.vel.set (this.vel.x, 0, -this.vel.z);
            this.pColor.setHSL(Math.random(), 0.7, 0.7);
        }*/

        if (this.pos.x < racket.position.x+30 && this.pos.x > racket.position.x-30)
        {
            this.pos.z = 100;
            this.vel.set (this.vel.x * 1.02, 0, -this.vel.z * 1.02);
            score += scoreGain * scoreGain * 100;
        }
        else
            this.kill();
    }
    else if (this.pos.z < -100)
    {
        this.pos.z = -100;
        this.vel.set (this.vel.x, 0, -this.vel.z);
        this.pColor.setHSL(Math.random(), 0.7, 0.7);
    }

    if (this.vel.x > MAX_VEL)
        this.vel.x = MAX_VEL;
    if (this.vel.x < (-1 * MAX_VEL))
        this.vel.x = (-1 * MAX_VEL);
    if (this.vel.z > MAX_VEL)
        this.vel.z = MAX_VEL;
    if (this.vel.z < (-1 * MAX_VEL))
        this.vel.z = (-1 * MAX_VEL);
};
Puck.prototype.kill = function()
{
	scene.remove (this.mesh);
	scene.remove (this.pointLight);
	delete pucks[this.ID];

    puck_on --;
    //if (puck_on < 1)
        lifePoint --;
    if (lifePoint < 1)
        GameOver();
    else
    {
        if (puck_on < 1)
        {
            if (puckCount < puckNum)
            {
                pucks[puckCount].add();
                puckCount++;
            }
        }
    }
}
Puck.prototype.add = function()
{
    this.mesh.visible = true;
    this.pointLight.intensity = 0.5;
    this.vel = new THREE.Vector3 (Math.random()*200-100, 0, Math.random()*200-100).normalize().multiplyScalar(100);

    puck_on ++;
}