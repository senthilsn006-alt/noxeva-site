import { useEffect, useRef } from "react";
import * as THREE from "three";

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
}

export default function LumenSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "h-full w-full";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.1, 8.5);

    const root = new THREE.Group();
    const orbit = new THREE.Group();
    const field = new THREE.Group();
    scene.add(root, orbit, field);

    const ambient = new THREE.AmbientLight(0xffffff, 1.05);
    const violet = new THREE.PointLight(0x7b2cff, 4.2, 16);
    const blue = new THREE.PointLight(0x5f9cff, 3.4, 16);
    const white = new THREE.PointLight(0xffffff, 1.1, 10);
    violet.position.set(-3.4, 2.8, 4);
    blue.position.set(4, -1.5, 3.4);
    white.position.set(0, 4.5, 1.5);
    scene.add(ambient, violet, blue, white);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.08, 5),
      new THREE.MeshPhysicalMaterial({
        color: 0x17172a,
        emissive: 0x321070,
        emissiveIntensity: 0.95,
        roughness: 0.23,
        metalness: 0.72,
        clearcoat: 0.95,
        clearcoatRoughness: 0.16,
      })
    );
    root.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.12, 2),
      new THREE.MeshBasicMaterial({ color: 0x7b2cff, wireframe: true, transparent: true, opacity: 0.5 })
    );
    root.add(wire);

    const ringColors = [0x7b2cff, 0x5f9cff, 0xffffff];
    for (let index = 0; index < 6; index += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.55 + index * 0.34, 0.009, 12, 180),
        new THREE.MeshBasicMaterial({
          color: ringColors[index % ringColors.length],
          transparent: true,
          opacity: index === 2 ? 0.18 : 0.3,
        })
      );
      ring.rotation.x = Math.PI / 2 + index * 0.2;
      ring.rotation.y = index * 0.36;
      ring.userData.speed = 0.09 + index * 0.028;
      orbit.add(ring);
    }

    const nodePositions = [];
    for (let index = 0; index < 42; index += 1) {
      const radius = 2.05 + (index % 7) * 0.26;
      const angle = index * 1.18;
      nodePositions.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(index * 0.73) * 1.18,
          Math.sin(angle) * radius * 0.55
        )
      );
    }

    const nodeMesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.038, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      nodePositions.length
    );
    const dummy = new THREE.Object3D();
    nodePositions.forEach((position, index) => {
      dummy.position.copy(position);
      dummy.updateMatrix();
      nodeMesh.setMatrixAt(index, dummy.matrix);
    });
    orbit.add(nodeMesh);

    const linePoints = [];
    for (let index = 0; index < nodePositions.length; index += 1) {
      const current = nodePositions[index];
      const next = nodePositions[(index + 6) % nodePositions.length];
      const alternate = nodePositions[(index + 17) % nodePositions.length];
      linePoints.push(current.x, current.y, current.z, next.x, next.y, next.z);
      if (index % 4 === 0) {
        linePoints.push(current.x, current.y, current.z, alternate.x, alternate.y, alternate.z);
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
    orbit.add(
      new THREE.LineSegments(
        lineGeometry,
        new THREE.LineBasicMaterial({ color: 0x5f9cff, transparent: true, opacity: 0.22 })
      )
    );

    const particleCount = 950;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [new THREE.Color(0x7b2cff), new THREE.Color(0x5f9cff), new THREE.Color(0xffffff)];
    for (let index = 0; index < particleCount; index += 1) {
      const stride = index * 3;
      const angle = index * 0.16;
      const radius = 2.2 + Math.random() * 5.9;
      positions[stride] = Math.cos(angle) * radius;
      positions[stride + 1] = (Math.random() - 0.5) * 4.8;
      positions[stride + 2] = Math.sin(angle) * radius * 0.45;
      const color = palette[index % palette.length].clone().lerp(new THREE.Color(0xffffff), Math.random() * 0.12);
      colors[stride] = color.r;
      colors[stride + 1] = color.g;
      colors[stride + 2] = color.b;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        size: 0.026,
        vertexColors: true,
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
      })
    );
    field.add(particles);

    const panelMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.055,
      side: THREE.DoubleSide,
    });
    for (let index = 0; index < 7; index += 1) {
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.54), panelMaterial.clone());
      const angle = index * Math.PI * 0.28;
      panel.position.set(Math.cos(angle) * 4.1, Math.sin(index * 0.7) * 1.65, Math.sin(angle) * 1.3 - 0.25);
      panel.rotation.set(Math.sin(index) * 0.2, -angle + Math.PI / 2, Math.cos(index) * 0.12);
      panel.userData.floatOffset = index * 0.5;
      field.add(panel);
    }

    const pointer = { x: 0, y: 0 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;

    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const mobile = width < 620;
      root.position.x = mobile ? 0.12 : 0.55;
      orbit.position.x = root.position.x;
      field.position.x = mobile ? 0 : 0.4;
      camera.position.z = mobile ? 8.9 : 7.7;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const motion = reduced ? 0 : 1;

      root.rotation.y = elapsed * 0.24 * motion + pointer.x * 0.13;
      root.rotation.x = Math.sin(elapsed * 0.36) * 0.08 * motion - pointer.y * 0.08;
      wire.rotation.y = -elapsed * 0.18 * motion;
      orbit.rotation.y = elapsed * 0.082 * motion + pointer.x * 0.08;
      orbit.rotation.x = pointer.y * 0.04;
      particles.rotation.y = -elapsed * 0.032 * motion;
      particles.rotation.z = elapsed * 0.012 * motion;

      orbit.children.forEach((child) => {
        if (child.geometry?.type === "TorusGeometry") {
          child.rotation.z = elapsed * child.userData.speed * motion;
        }
      });

      field.children.forEach((child) => {
        if (child.geometry?.type === "PlaneGeometry") {
          child.position.y += Math.sin(elapsed + child.userData.floatOffset) * 0.0008 * motion;
        }
      });

      camera.position.x += (pointer.x * 0.1 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 0.08 + 0.08 - camera.position.y) * 0.04;
      camera.lookAt(0.2, 0, 0);
      renderer.render(scene, camera);

      if (!reduced) frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      disposeObject(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
