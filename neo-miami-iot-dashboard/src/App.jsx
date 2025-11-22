import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Progress,
  Stat,
  StatHelpText,
  StatLabel,
  StatValueText,
  StatValueUnit,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const MotionBox = motion(Box);

const generateSensorReading = (base, variance, min = 0, max = 100) => {
  const delta = (Math.random() - 0.5) * variance;
  const value = Math.min(Math.max(base + delta, min), max);
  return Number(value.toFixed(1));
};

function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#030016', 0.025);

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 35, 60);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight('#74F1FF', 0.6);
    scene.add(ambient);

    const pinkLight = new THREE.PointLight('#FF6EC7', 1, 120);
    pinkLight.position.set(-30, 30, 20);
    scene.add(pinkLight);

    const tealLight = new THREE.PointLight('#38E8D0', 1, 120);
    tealLight.position.set(30, 25, -10);
    scene.add(tealLight);

    const groundGeometry = new THREE.PlaneGeometry(120, 120, 20, 20);
    const groundMaterial = new THREE.MeshPhongMaterial({
      color: '#0A0F2C',
      wireframe: true,
      opacity: 0.35,
      transparent: true,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const buildings = [];
    const buildingGeometry = new THREE.BoxGeometry(4, 8, 4);
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: '#5C7CFF',
      emissive: '#1C2E70',
      roughness: 0.4,
      metalness: 0.2,
    });

    for (let i = 0; i < 55; i += 1) {
      const mesh = new THREE.Mesh(buildingGeometry, buildingMaterial.clone());
      mesh.position.x = (Math.random() - 0.5) * 80;
      mesh.position.z = (Math.random() - 0.5) * 80;
      mesh.scale.y = Math.random() * 6 + 1;
      mesh.position.y = mesh.scale.y / 2;
      mesh.material.emissive = new THREE.Color('#38E8D0');
      buildings.push(mesh);
      scene.add(mesh);
    }

    const roadMaterial = new THREE.MeshBasicMaterial({ color: '#0D132E' });
    const roadGeometry = new THREE.PlaneGeometry(90, 6);
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.z = 10;
    scene.add(road);

    const neonLineMaterial = new THREE.LineBasicMaterial({
      color: '#FF6EC7',
      linewidth: 2,
      transparent: true,
      opacity: 0.8,
    });
    const neonLinePoints = [
      new THREE.Vector3(-60, 0.02, -60),
      new THREE.Vector3(60, 0.02, 60),
    ];
    const neonLineGeometry = new THREE.BufferGeometry().setFromPoints(neonLinePoints);
    const neonLine = new THREE.Line(neonLineGeometry, neonLineMaterial);
    scene.add(neonLine);

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 400;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = Math.random() * 80 + 20;
      positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: '#4FD1C5', size: 0.6 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      buildings.forEach((mesh, idx) => {
        const pulse = Math.sin(elapsed * 2 + idx * 0.4) * 0.5 + 0.75;
        mesh.material.emissiveIntensity = pulse;
        mesh.scale.y = (Math.sin(elapsed + idx) + 1.5) * 3;
        mesh.position.y = mesh.scale.y / 2;
      });

      neonLine.material.opacity = 0.6 + Math.sin(elapsed * 2) * 0.3;
      stars.rotation.y = elapsed * 0.02;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      groundGeometry.dispose();
      buildingGeometry.dispose();
      neonLineGeometry.dispose();
      starsGeometry.dispose();
    };
  }, []);

  return <Box ref={mountRef} w="100%" h="100%" />;
}

function MetricCard({ label, value, unit, change, color }) {
  const trending = change > 0 ? 'up' : 'down';
  const symbol = trending === 'up' ? '+' : '';

  return (
    <MotionBox
      bg="rgba(17, 24, 68, 0.75)"
      border="1px solid rgba(79, 209, 197, 0.25)"
      p={4}
      rounded="lg"
      boxShadow="0 0 20px rgba(255, 110, 199, 0.15)"
      whileHover={{ y: -3 }}
      transition="0.2s"
    >
      <Stat>
        <StatLabel color="miami.teal" fontWeight="bold" letterSpacing="wide">
          {label}
        </StatLabel>
        <HStack align="baseline" spacing={3}>
          <HStack align="baseline" spacing={1}>
            <StatValueText fontSize="2xl" color={color}>
              {value}
            </StatValueText>
            {unit ? (
              <StatValueUnit fontSize="lg" color={color}>
                {unit}
              </StatValueUnit>
            ) : null}
          </HStack>
          <Badge colorScheme={trending === 'up' ? 'pink' : 'blue'}>
            {symbol}
            {change.toFixed(1)}%
          </Badge>
        </HStack>
        <StatHelpText color="gray.300">Live sampled / 5s</StatHelpText>
      </Stat>
    </MotionBox>
  );
}

function SensorCard({ sensor }) {
  return (
    <MotionBox
      bg="rgba(17, 24, 68, 0.65)"
      border="1px solid rgba(56, 232, 208, 0.2)"
      p={4}
      rounded="lg"
      whileHover={{ scale: 1.02 }}
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text color="miami.pink" fontSize="sm" fontWeight="bold">
            {sensor.name}
          </Text>
          <Text color="gray.200" fontSize="xs">
            {sensor.location}
          </Text>
        </Box>
        <Badge colorScheme={sensor.status === 'Online' ? 'green' : 'red'}>
          {sensor.status}
        </Badge>
      </Flex>
      <Heading mt={2} size="lg" color="miami.teal">
        {sensor.value}
        {sensor.unit}
      </Heading>
      <Progress
        value={sensor.health}
        size="sm"
        colorScheme="pink"
        bg="rgba(255, 255, 255, 0.08)"
        mt={3}
        rounded="full"
      />
      <Text color="gray.300" fontSize="xs" mt={1}>
        Signal health
      </Text>
    </MotionBox>
  );
}

export default function App() {
  const [metrics, setMetrics] = useState({
    temperature: 27.5,
    humidity: 62.3,
    airQuality: 92.5,
    networkHealth: 87.2,
  });
  const [changes, setChanges] = useState({
    temperature: 0.2,
    humidity: -0.1,
    airQuality: 0.5,
    networkHealth: 0.3,
  });

  const [sensors, setSensors] = useState(
    () =>
      Array.from({ length: 6 }).map((_, idx) => ({
        id: idx,
        name: `Sensor-${100 + idx}`,
        location: ['Downtown', 'Harbor', 'Design District', 'Wynwood', 'Brickell', 'South Beach'][idx % 6],
        value: generateSensorReading(72, 8, 50, 120),
        unit: ' kPa',
        status: Math.random() > 0.08 ? 'Online' : 'Offline',
        health: generateSensorReading(80, 25, 35, 100),
      }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        temperature: generateSensorReading(prev.temperature, 1.5, 20, 40),
        humidity: generateSensorReading(prev.humidity, 3, 40, 80),
        airQuality: generateSensorReading(prev.airQuality, 2, 60, 100),
        networkHealth: generateSensorReading(prev.networkHealth, 2, 50, 100),
      }));

      setChanges({
        temperature: generateSensorReading(0.2, 0.4, -1, 1),
        humidity: generateSensorReading(-0.2, 0.5, -1, 1),
        airQuality: generateSensorReading(0.4, 0.5, -1, 1),
        networkHealth: generateSensorReading(0.1, 0.3, -1, 1),
      });

      setSensors((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          value: generateSensorReading(sensor.value, 3, 50, 140),
          status: Math.random() > 0.05 ? 'Online' : 'Offline',
          health: generateSensorReading(sensor.health, 4, 25, 100),
        }))
      );
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const statusPills = useMemo(
    () => [
      { label: 'AQ Monitors', value: '24', color: 'miami.teal' },
      { label: 'Energy Hubs', value: '9', color: 'miami.pink' },
      { label: 'Traffic Nodes', value: '14', color: 'miami.purple' },
    ],
    []
  );

  return (
    <Flex h="100vh" color="gray.100" direction="column" bgGradient="linear(to-br, #030016, #0b1b41)">
      <Flex px={8} py={6} align="center" justify="space-between" borderBottom="1px solid rgba(255, 255, 255, 0.08)">
        <Box>
          <Text fontSize="xs" color="miami.pink" letterSpacing="widest" textTransform="uppercase">
            Smart City Operations
          </Text>
          <Heading size="lg" color="miami.teal">Neo-Miami IoT Dashboard</Heading>
          <Text color="gray.300">Real-time telemetry and environmental intelligence</Text>
        </Box>
        <HStack spacing={3}>
          {statusPills.map((pill) => (
            <Badge key={pill.label} color={pill.color} px={3} py={2} rounded="full" bg="rgba(255,255,255,0.06)" fontSize="xs">
              {pill.value} {pill.label}
            </Badge>
          ))}
        </HStack>
      </Flex>

      <Grid templateColumns={{ base: '1fr', xl: '2fr 1fr' }} flex="1" gap={4} p={6}>
        <GridItem bg="rgba(12, 19, 52, 0.6)" border="1px solid rgba(79, 209, 197, 0.2)" rounded="xl" overflow="hidden" position="relative">
          <Box position="absolute" inset={0} zIndex={0}>
            <ThreeScene />
          </Box>
          <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(3,0,22,0.7), transparent)" zIndex={1} />
          <Flex position="relative" zIndex={2} direction="column" h="100%" p={6} justify="flex-end">
            <Heading size="md" color="miami.pink" mb={2}>
              Neon City Digital Twin
            </Heading>
            <Text color="gray.200" maxW="lg">
              Miami-Vice inspired visualization of sensor density, network health, and atmospheric conditions across the coastal grid.
            </Text>
          </Flex>
        </GridItem>

        <GridItem>
          <Grid templateColumns={{ base: 'repeat(2,1fr)', md: 'repeat(2, 1fr)' }} gap={4}>
            <MetricCard label="Temp" value={metrics.temperature} unit="°C" change={changes.temperature} color="miami.teal" />
            <MetricCard label="Humidity" value={metrics.humidity} unit="%" change={changes.humidity} color="miami.pink" />
            <MetricCard label="Air Quality" value={metrics.airQuality} unit=" AQI" change={changes.airQuality} color="miami.purple" />
            <MetricCard label="Network Health" value={metrics.networkHealth} unit="%" change={changes.networkHealth} color="miami.blue" />
          </Grid>

          <Box mt={6} bg="rgba(12, 19, 52, 0.6)" border="1px solid rgba(255, 255, 255, 0.08)" rounded="xl" p={4}>
            <Flex justify="space-between" align="center">
              <Heading size="sm" color="miami.teal">
                Sensor Fleet Health
              </Heading>
              <Badge colorScheme="purple">Live</Badge>
            </Flex>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3} mt={4}>
              {sensors.map((sensor) => (
                <SensorCard key={sensor.id} sensor={sensor} />
              ))}
            </Grid>
          </Box>
        </GridItem>
      </Grid>

      <Divider borderColor="rgba(255, 255, 255, 0.08)" />

      <Flex px={6} py={4} align="center" justify="space-between" bg="rgba(5, 9, 26, 0.65)" borderTop="1px solid rgba(79, 209, 197, 0.1)">
        <Text color="gray.400">Edge compute nodes stable · Data latency &lt; 120ms</Text>
        <HStack spacing={3}>
          <Badge colorScheme="green">Operational</Badge>
          <Badge colorScheme="pink">Miami Grid</Badge>
        </HStack>
      </Flex>
    </Flex>
  );
}
