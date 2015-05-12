var wall = function(width, depth, height)
{
	this.Geo = new THREE.BoxGeometry (width, depth, height);
	this.Mat = new THREE.MeshPhongMaterial ({ side: THREE.DoubleSide });
	this.Mesh = new THREE.Mesh (this.Geo, this.Mat);

	this.picture = null;
}

wall.prototype.AddToScene = function()
{
	scene.add (this.Mesh);
	pickables.push(this.Mesh);
}

wall.prototype.ChangePicture = function(pic)
{
	if (pic == null)
		return;
	if (this.picture != null)
	{
		scene.remove (this.picture);
	}
	this.picture = pic;
	scene.add (this.picture);
	this.picture.picNum = picNum;
}

wall.prototype.RemovePicture = function()
{
	if (this.picture != null)
	{
		scene.remove (this.picture);
		this.picture = null;
	}
}

var pictures = function(image, real)
{
	this.Geo = new THREE.PlaneGeometry (150, 100);
	this.Mat = new THREE.MeshPhongMaterial ({ 
		map: image,
		polygonOffset: true,
        polygonOffsetUnits: -4.0,
        polygonOffsetFactor: -1.0 });

	if (real < 1)
	{
		this.Mat.transparent = true;
		this.Mat.opacity = 0.5;
	}

	this.Mesh = new THREE.Mesh (this.Geo, this.Mat);

	this.picNum = null;
}

