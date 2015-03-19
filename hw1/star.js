var star = false;
var particleSystem;
var star_shine = 1.0;  // unfinished

function initStar()
{
	var particleCount = 3000,
		particles = new THREE.Geometry(),
		pMaterial = new THREE.ParticleBasicMaterial({
			size: 10,
			color: 0xffffff,
			map: THREE.ImageUtils.loadTexture(
				"images/star_2.jpg"
			),
			blending: THREE.AdditiveBlending,
			transparent: true
		});
		
	for (var p = 0; p < particleCount; p++)
	{
		var pX = Math.random() * 2000 - 1000; pX>0?pX+=100:pX-=100;
		var pY = Math.random() * 2000 - 1000; pY>0?pY+=100:pY-=100;
		var pZ = Math.random() * 2000 - 1000; pZ>0?pZ+=100:pZ-=100;
		var particle = new THREE.Vector3 (pX, pY, pZ);
		particles.vertices.push(particle);
	}
	
	particleSystem = THREE.ParticleSystem(
		particles, pMaterial);
}

function createStar()
{
	scene.add (particleSystem);
}

function removeStar()
{
	scene.remove (particleSystem);
}