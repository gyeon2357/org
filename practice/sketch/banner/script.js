Ammo().then(function(Ammo) {
	// Detects webgl
    if ( ! Detector.webgl ) {
        Detector.addGetWebGLMessage();
        document.getElementById( 'container' ).innerHTML = "";
    }
    var container, stats;
    var camera, controls, scene, renderer;
    var textureLoader;
    var clock = new THREE.Clock();
	var clickRequest = false;
    var mouseCoords = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();
	var ballMaterial = new THREE.MeshPhongMaterial( { color: 0x202020 } );
	var pos = new THREE.Vector3();
    var quat = new THREE.Quaternion();
    // Physics variables
    var gravityConstant = -1;
	var collisionConfiguration;
	var dispatcher;
	var broadphase;
	var solver;
	var physicsWorld;
	var rigidBodies = [];
	armReady = false;
	mX = 0;
	mY = 0;
	var margin = 0.05;
	var hinge;
	var cloth;
	var transformAux1 = new Ammo.btTransform();

	var time = 0;
	var armMovement = 0;
	
	var softBodies = [];
	var softBodyHelpers = new Ammo.btSoftBodyHelpers();
    init();
    function init() {

		initGraphics();

		initPhysics();

		createObjects();

		initInput();

    }
    function initGraphics() {
		container = document.getElementById( 'container' );
        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.2, 2000 );
        scene = new THREE.Scene();
		camera.position.x = 20;
		camera.position.y = 1;
        camera.position.z =  1;
        controls = new THREE.OrbitControls( camera );
        controls.target.y = 1;
        renderer = new THREE.WebGLRenderer({'antialias':true});
		renderer.setClearColor( 0x000000 );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;
        textureLoader = new THREE.TextureLoader();
		var ambientLight = new THREE.AmbientLight( 0xcccccc );
		scene.add( ambientLight );
        var light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( 7, 10, 15 );
		light.castShadow = true;
		var d = 10;
	    light.shadow.camera.left = -d;
	    light.shadow.camera.right = d;
	    light.shadow.camera.top = d;
	    light.shadow.camera.bottom = -d;
	    light.shadow.camera.near = 2;
	    light.shadow.camera.far = 50;
	    light.shadow.mapSize.x = 1024;
	    light.shadow.mapSize.y = 1024;
	    light.shadow.bias = -0.01;
        scene.add( light );
        container.innerHTML = "";
        container.appendChild( renderer.domElement );
        window.addEventListener( 'resize', onWindowResize, false );
    }
	function initPhysics() {
		collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
		dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
		broadphase = new Ammo.btDbvtBroadphase();
		solver = new Ammo.btSequentialImpulseConstraintSolver();
		softBodySolver = new Ammo.btDefaultSoftBodySolver();
		physicsWorld = new Ammo.btSoftRigidDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
		physicsWorld.setGravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );
		physicsWorld.getWorldInfo().set_m_gravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );
    }
    function createObjects() {
		var pos = new THREE.Vector3();
		var quat = new THREE.Quaternion();
		// Ground
		pos.set( 0, -10, 0 );
		quat.set( 0, 0, 0, 1 );
		var ground = createParalellepiped( 10, 1, 10, 0, pos, quat, new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ) );
		ground.castShadow = true;
		ground.receiveShadow = true;
		ground.visible = false;

// Wall
				var brickMass = 1;
				var brickLength = 9;
				var brickDepth = 1;
				var brickHeight = brickLength * 0.3;
				var numBricksLength = 1;
				var numBricksHeight = 1;
				var z0 = - numBricksLength * brickLength * 0.5;
				pos.set( brickLength/2 * -1, brickHeight * 0.5, 0 );
				quat.set( 0, 0, 0, 1 );
				for ( var j = 0; j < numBricksHeight; j ++ ) {

					var oddRow = ( j % 2 ) == 1;

					//pos.z = z0;

					if ( oddRow ) {
						//pos.z -= 0.25 * brickLength;
					}

					var nRow = oddRow? numBricksLength + 1 : numBricksLength;
					for ( var i = 0; i < nRow; i ++ ) {

						var brickLengthCurrent = brickLength;
						var brickMassCurrent = brickMass;
						if ( oddRow && ( i == 0 || i == nRow - 1 ) ) {
							brickLengthCurrent *= 0.5;
							brickMassCurrent *= 0.5;
						}

						var brick = createParalellepiped( brickDepth, brickHeight, brickLengthCurrent, brickMassCurrent, pos, quat, createMaterial() );
						brick.castShadow = true;
						brick.receiveShadow = true;
						brick.visible = false;
						//pos.x = mX;
						//pos.y = mY;
						//brick.visible = false;
						/*if ( oddRow && ( i == 0 || i == nRow - 2 ) ) {
							pos.z += 0.75 * brickLength;
						}
						else {
							pos.z += brickLength;
						}
*/
					}
					
					//pos.y += brickHeight;
				}

		// The cloth
		var clothWidth = 9;
		var clothHeight = 16;
		var clothNumSegmentsZ = clothWidth * 5;
		var clothNumSegmentsY = clothHeight * 5;
		var clothSegmentLengthZ = clothWidth / clothNumSegmentsZ;
		var clothSegmentLengthY = clothHeight / clothNumSegmentsY;
		var clothPos = new THREE.Vector3( 1, -8, 4.5 );
		var clothGeometry = new THREE.PlaneBufferGeometry( clothWidth, clothHeight, clothNumSegmentsZ, clothNumSegmentsY );
		clothGeometry.rotateY( Math.PI * 0.5 )
		clothGeometry.translate( clothPos.x, clothPos.y + clothHeight * 0.5, clothPos.z - clothWidth * 0.5 )
		var clothMaterial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
		cloth = new THREE.Mesh( clothGeometry, clothMaterial );
		cloth.castShadow = true;
		cloth.receiveShadow = true;
		scene.add( cloth );
		textureLoader.load( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/253981/banner.jpg", function( texture ) {
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 1, 1 );
			cloth.material.map = texture;
			cloth.material.needsUpdate = true;
			animate();

		} );


		// Cloth physic object
		var softBodyHelpers = new Ammo.btSoftBodyHelpers();
		var clothCorner00 = new Ammo.btVector3( clothPos.x, clothPos.y + clothHeight, clothPos.z );
		var clothCorner01 = new Ammo.btVector3( clothPos.x, clothPos.y + clothHeight, clothPos.z - clothWidth );
		var clothCorner10 = new Ammo.btVector3( clothPos.x, clothPos.y, clothPos.z );
		var clothCorner11 = new Ammo.btVector3( clothPos.x, clothPos.y, clothPos.z - clothWidth );
		var clothSoftBody = softBodyHelpers.CreatePatch( physicsWorld.getWorldInfo(), clothCorner00, clothCorner01, clothCorner10, clothCorner11, clothNumSegmentsZ + 1, clothNumSegmentsY + 1, 0, true );
		var sbConfig = clothSoftBody.get_m_cfg();
		sbConfig.set_viterations( 10 );
		sbConfig.set_piterations( 10 );
		clothSoftBody.setTotalMass( .5, false )
		Ammo.castObject( clothSoftBody, Ammo.btCollisionObject ).getCollisionShape().setMargin( margin * 3 );
		physicsWorld.addSoftBody( clothSoftBody, -1, -1 );
		cloth.userData.physicsBody = clothSoftBody;
		// Disable deactivation
		clothSoftBody.setActivationState( 4 );
		// The base
		var armMass = 0;
		var armLength = 0 + clothWidth;
		var pylonHeight = clothPos.y + clothHeight;
		var baseMaterial = new THREE.MeshPhongMaterial( { color: 0x606060 } );
		pos.set( clothPos.x, 0.1, clothPos.z - armLength );
		quat.set( 0, 0, 0, 1 );
		pos.set( clothPos.x, 0.5 * pylonHeight, clothPos.z - armLength );
		var pylon = createParalellepiped( 0.4, pylonHeight, 0.4, 0, pos, quat, baseMaterial );
		pylon.castShadow = true;
		pylon.receiveShadow = true;
		pylon.visible = false;
		pos.set( clothPos.x, pylonHeight + 0.2, clothPos.z - 0.5 * armLength );
		var arm = createParalellepiped( 0.4, 0.4, armLength + 0.4, armMass, pos, quat, baseMaterial );
		arm.castShadow = true;
		arm.receiveShadow = true;
		arm.visible = false;
		// Glue the cloth to the arm
		var influence = 0.5;
		clothSoftBody.appendAnchor( 0, arm.userData.physicsBody, false, influence );
		clothSoftBody.appendAnchor( clothNumSegmentsZ, arm.userData.physicsBody, false, influence );
		// Hinge constraint to move the arm
		var pivotA = new Ammo.btVector3( 0, pylonHeight * 0.5, 0 );
		var pivotB = new Ammo.btVector3( 0, -0.2, - armLength * 0.5 );
		var axis = new Ammo.btVector3( 0, -1, 0 );
		hinge = new Ammo.btHingeConstraint( pylon.userData.physicsBody, arm.userData.physicsBody, pivotA, pivotB, axis, axis, true );
		physicsWorld.addConstraint( hinge, true );
		armReady = true;
    }
    function createParalellepiped( sx, sy, sz, mass, pos, quat, material ) {

		var threeObject = new THREE.Mesh( new THREE.BoxGeometry( sx, sy, sz, 1, 1, 1 ), material );
		var shape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );
		shape.setMargin( margin );

		createRigidBody( threeObject, shape, mass, pos, quat );

		return threeObject;

    }
    function createRigidBody( threeObject, physicsShape, mass, pos, quat ) {

    	threeObject.position.copy( pos );
    	threeObject.quaternion.copy( quat );

		var transform = new Ammo.btTransform();
		transform.setIdentity();
		transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
		transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
		var motionState = new Ammo.btDefaultMotionState( transform );

		var localInertia = new Ammo.btVector3( 0, 0, 0 );
    	physicsShape.calculateLocalInertia( mass, localInertia );

    	var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, physicsShape, localInertia );
    	var body = new Ammo.btRigidBody( rbInfo );

		threeObject.userData.physicsBody = body;

		scene.add( threeObject );

		if ( mass > 0 ) {
			rigidBodies.push( threeObject );

			// Disable deactivation
			body.setActivationState( 4 );
		}

		physicsWorld.addRigidBody( body );

    }

	function createRandomColor() {
		return Math.floor( Math.random() * ( 1 << 24 ) );
	}

    function createMaterial() {
    	return new THREE.MeshPhongMaterial( { color: createRandomColor() } );
    }
	function isEqual( x1, y1, z1, x2, y2, z2 ) {
        var delta = 0.000001;
        return Math.abs( x2 - x1 ) < delta &&
                Math.abs( y2 - y1 ) < delta &&
                Math.abs( z2 - z1 ) < delta;
    }
    function mapIndices( bufGeometry, indexedBufferGeom ) {

        // Creates ammoVertices, ammoIndices and ammoIndexAssociation in bufGeometry

        var vertices = bufGeometry.attributes.position.array;
        var idxVertices = indexedBufferGeom.attributes.position.array;
        var indices = indexedBufferGeom.index.array;

        var numIdxVertices = idxVertices.length / 3;
        var numVertices = vertices.length / 3;

        bufGeometry.ammoVertices = idxVertices;
        bufGeometry.ammoIndices = indices;
        bufGeometry.ammoIndexAssociation = [];

        for ( var i = 0; i < numIdxVertices; i++ ) {

            var association = [];
            bufGeometry.ammoIndexAssociation.push( association );

            var i3 = i * 3;

            for ( var j = 0; j < numVertices; j++ ) {
                var j3 = j * 3;
                if ( isEqual( idxVertices[ i3 ], idxVertices[ i3 + 1 ],  idxVertices[ i3 + 2 ],
                              vertices[ j3 ], vertices[ j3 + 1 ], vertices[ j3 + 2 ] ) ) {
                    association.push( j3 );
                }
            }

        }

    }
    function processGeometry( bufGeometry ) {

        // Obtain a Geometry
        var geometry = new THREE.Geometry().fromBufferGeometry( bufGeometry );

        // Merge the vertices so the triangle soup is converted to indexed triangles
        var vertsDiff = geometry.mergeVertices();

        // Convert again to BufferGeometry, indexed
        var indexedBufferGeom = createIndexedBufferGeometryFromGeometry( geometry );

        // Create index arrays mapping the indexed vertices to bufGeometry vertices
        mapIndices( bufGeometry, indexedBufferGeom );

    }
    function createIndexedBufferGeometryFromGeometry( geometry ) {

        var numVertices = geometry.vertices.length;
        var numFaces = geometry.faces.length;

        var bufferGeom = new THREE.BufferGeometry();
        var vertices = new Float32Array( numVertices * 3 );
        var indices = new ( numFaces * 3 > 65535 ? Uint32Array : Uint16Array )( numFaces * 3 );

        for ( var i = 0; i < numVertices; i++ ) {

            var p = geometry.vertices[ i ];

            var i3 = i * 3;

            vertices[ i3 ] = p.x;
            vertices[ i3 + 1 ] = p.y;
            vertices[ i3 + 2 ] = p.z;

        }

        for ( var i = 0; i < numFaces; i++ ) {

            var f = geometry.faces[ i ];

            var i3 = i * 3;

            indices[ i3 ] = f.a;
            indices[ i3 + 1 ] = f.b;
            indices[ i3 + 2 ] = f.c;

        }

        bufferGeom.setIndex( new THREE.BufferAttribute( indices, 1 ) );
        bufferGeom.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

        return bufferGeom;
    }
    function initInput() {
    	window.addEventListener( 'mousemove', function( event ) {
			mX = event.pageX;
			my = event.pageY;
           
        }, false );
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    function render() {
    	var deltaTime = clock.getDelta();
    	updatePhysics( deltaTime );
        renderer.render( scene, camera );
        time += deltaTime;
        if(armReady){
	        
        }
    }
	 function updatePhysics( deltaTime ) {
	
		// Hinge control
		hinge.enableAngularMotor( true, 0.8 * armMovement, 50 );
	
		// Step world
		physicsWorld.stepSimulation( deltaTime, 10 );
	
		// Update cloth
		var softBody = cloth.userData.physicsBody;
		var clothPositions = cloth.geometry.attributes.position.array;
		var numVerts = clothPositions.length / 3;
		var nodes = softBody.get_m_nodes();
		var indexFloat = 0;
		for ( var i = 0; i < numVerts; i ++ ) {
	
			var node = nodes.at( i );
			var nodePos = node.get_m_x();
			clothPositions[ indexFloat++ ] = nodePos.x();
			clothPositions[ indexFloat++ ] = nodePos.y();
			clothPositions[ indexFloat++ ] = nodePos.z();
	
		}
		cloth.geometry.computeVertexNormals();
		cloth.geometry.attributes.position.needsUpdate = true;
		cloth.geometry.attributes.normal.needsUpdate = true;
	
	    // Update rigid bodies
	    for ( var i = 0, il = rigidBodies.length; i < il; i++ ) {
	    	var objThree = rigidBodies[ i ];
	    	var objPhys = objThree.userData.physicsBody;
			var ms = objPhys.getMotionState();
			if ( ms ) {
	
	        	ms.getWorldTransform( transformAux1 );
				var p = transformAux1.getOrigin();
				var q = transformAux1.getRotation();
				objThree.position.set( p.x(), p.y(), p.z() );
				objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
	
	      	}
	    }
	
	}

});