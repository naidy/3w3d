var tire = new THREE.Object3D();
var tire2 = new THREE.Object3D();

function createWheel(tire, size)
{
	THREE.ImageUtils.crossOrigin = '';
    var colormap = THREE.ImageUtils.loadTexture('images/wheel_tex3.png');
    var colormap2 = THREE.ImageUtils.loadTexture('images/tire_tex.jpg');

    var geometry = new THREE.CircleGeometry((size/5)*5.9, 32);
    var material = new THREE.MeshBasicMaterial({
        map: colormap,
        transparent: true,  // for cut-out texture
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
	colormap2.wrapS = colormap2.wrapT = THREE.RepeatWrapping; 
	colormap2.repeat.set( 10, 1 );
    var mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(size, size, (size/5)*2, 30, 1, true), // only side
    new THREE.MeshBasicMaterial({
        map: colormap2,
        side: THREE.DoubleSide
    }));

    var uniforms = {
        texture: {
            type: "t",
            value: colormap
        }
    };
    var vertexShader = document.getElementById('vertexShaderDepth').textContent;
    var fragmentShader = document.getElementById('fragmentShaderDepth').textContent;
    mesh.customDepthMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    mesh2.rotation.x = Math.PI / 2;
    mesh.position.set(0, 0, size/5);
    var mesh0 = mesh.clone();

    mesh0.customDepthMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    mesh0.position.set(0, 0, -size/5);
    mesh0.rotation.y = Math.PI;
    tire.add (mesh);
    tire.add(mesh0);
    tire.add(mesh2);

    mesh.castShadow = true;
    mesh0.castShadow = true;
    mesh2.castShadow = true;
    tire.castShadow = true;

    tire.rotation.order = 'ZYX';
    tire.rotation.z = Math.PI/2;
    tire.position.set (0,5,0);

    //scene.add (tire);
}

function wheelInit()
{
    createWheel (tire, 20);
	tire.position.z = 30;
	createWheel (tire2, 20);
	tire2.position.z = -30;

	scene.add (tire2);
	scene.add (tire);
}