import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function Stars(props) {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function FloatingShape() {
    const mesh = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh.current.rotation.x = time * 0.2;
        mesh.current.rotation.y = time * 0.1;
        mesh.current.position.y = Math.sin(time / 2) * 0.2;
    });

    return (
        <mesh ref={mesh} position={[0, 0, 0]} scale={2}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
        </mesh>
    );

}


const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Stars />
                {/* <FloatingShape /> */}
            </Canvas>
        </div>
    );
};
import { useState } from 'react';

export default ThreeBackground;
