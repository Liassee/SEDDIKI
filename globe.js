const THREE_URL = "https://unpkg.com/three@0.160.0/build/three.module.js";
let THREE;

const locations = [
  {
    code: "DOM",
    name: "Domicile · secteur Gien",
    kind: "Base personnelle",
    country: "FR",
    lat: 47.69,
    lon: 2.63,
    lead: true,
    description:
      "Point de départ des missions — disponibilité terrain France entière et internationale.",
  },
  {
    code: "FOR",
    name: "Forbach",
    kind: "Base Siempelkamp — la plus utilisée (service France)",
    country: "FR",
    lat: 49.19,
    lon: 6.90,
    description:
      "Base de rattachement Siempelkamp la plus fréquente pour les interventions côté France.",
  },
  {
    code: "KRE",
    name: "Krefeld",
    kind: "Base Siempelkamp",
    country: "DE",
    lat: 51.34,
    lon: 6.59,
    description:
      "Base Siempelkamp — mission en atelier portant sur l'assemblage et la conception d'un équipement d'intervention nucléaire.",
  },
  {
    code: "LUN",
    name: "Lünen",
    kind: "Base Siempelkamp",
    country: "DE",
    lat: 51.62,
    lon: 7.52,
    description:
      "Base de rattachement Siempelkamp en Allemagne.",
  },
  {
    code: "SIZ",
    name: "Sizewell B",
    kind: "Mission internationale",
    country: "UK",
    lat: 52.21,
    lon: 1.62,
    description:
      "Intervention au Royaume-Uni : maintenance suivie d'une opération d'ouverture puis de fermeture de cuve, en coordination avec les équipes Framatome sur place.",
  },
  {
    code: "DAM",
    name: "Dampierre-en-Burly",
    kind: "Site nucléaire",
    country: "FR",
    lat: 47.73,
    lon: 2.52,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
  {
    code: "BEL",
    name: "Belleville-sur-Loire",
    kind: "Site nucléaire",
    country: "FR",
    lat: 47.51,
    lon: 2.87,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
  {
    code: "CHI",
    name: "Chinon",
    kind: "Site nucléaire",
    country: "FR",
    lat: 47.23,
    lon: 0.17,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
  {
    code: "TRI",
    name: "Tricastin",
    kind: "Site nucléaire",
    country: "FR",
    lat: 44.33,
    lon: 4.73,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
  {
    code: "GRA",
    name: "Gravelines",
    kind: "Site nucléaire",
    country: "FR",
    lat: 51.01,
    lon: 2.13,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
  {
    code: "CHO",
    name: "Chooz",
    kind: "Site nucléaire",
    country: "FR",
    lat: 50.09,
    lon: 4.79,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
  {
    code: "CIV",
    name: "Civaux",
    kind: "Site nucléaire",
    country: "FR",
    lat: 46.46,
    lon: 0.65,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
  {
    code: "BUG",
    name: "Bugey",
    kind: "Site nucléaire",
    country: "FR",
    lat: 45.80,
    lon: 5.27,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
  {
    code: "CAT",
    name: "Cattenom",
    kind: "Site nucléaire",
    country: "FR",
    lat: 49.42,
    lon: 6.22,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
  {
    code: "FLA",
    name: "Flamanville",
    kind: "Site nucléaire",
    country: "FR",
    lat: 49.54,
    lon: -1.88,
    description:
      "Intervention sur site nucléaire — équipements MST/SSM, procédures de sûreté strictes.",
  },
];

const europeOutline = [
  [36, -10],
  [43, -9],
  [48, -5],
  [51, -4],
  [55, 0],
  [58, 6],
  [56, 12],
  [60, 18],
  [56, 25],
  [50, 25],
  [46, 18],
  [41, 16],
  [38, 10],
  [36, 3],
  [36, -10],
];

const ukOutline = [
  [50, -6],
  [54, -5],
  [58, -3],
  [57, 1],
  [53, 2],
  [50, -1],
  [50, -6],
];

const franceOutline = [
  [43, -1.7],
  [48, -4.5],
  [51, 2.2],
  [49, 7.8],
  [45, 7],
  [42.5, 3],
  [43, -1.7],
];

const germanyOutline = [
  [47, 6],
  [54.5, 8],
  [54, 14.5],
  [49, 15],
  [47, 10],
  [47, 6],
];

let activeCode = "DOM";

async function initOperationsGlobe() {
  const stage = document.querySelector("[data-globe-stage]");
  const canvas = document.getElementById("operations-globe");
  const list = document.querySelector("[data-location-list]");
  const detail = document.querySelector("[data-location-detail]");
  const tooltip = document.querySelector("[data-globe-tooltip]");
  const status = document.querySelector("[data-globe-status]");

  if (!stage || !canvas || !list || !detail) return;

  try {
    THREE = await import(THREE_URL);
  } catch (error) {
    detail.innerHTML =
      '<span class="operations__code">3D</span><h3>Globe indisponible</h3><p>La carte interactive nécessite le chargement de Three.js. Le contenu reste visible dans la liste des sites.</p><small>Mode dégradé</small>';
    buildLocationList(list, null);
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 5.45);

  const root = new THREE.Group();
  scene.add(root);

  const markerGroup = new THREE.Group();
  root.add(markerGroup);

  const radius = 1.42;
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 96, 96),
    new THREE.MeshStandardMaterial({
      color: 0x24272a,
      roughness: 0.78,
      metalness: 0.18,
      transparent: true,
      opacity: 0.94,
    }),
  );
  root.add(globe);

  const wire = new THREE.Mesh(
    new THREE.SphereGeometry(radius + 0.006, 48, 24),
    new THREE.MeshBasicMaterial({
      color: 0x5b6167,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    }),
  );
  root.add(wire);

  addAtmosphere(THREE, root, radius);
  addOutline(THREE, root, europeOutline, radius, 0xf2b705, 0.62);
  addOutline(THREE, root, ukOutline, radius, 0xeeebe3, 0.38);
  addOutline(THREE, root, franceOutline, radius, 0xeeebe3, 0.56);
  addOutline(THREE, root, germanyOutline, radius, 0xeeebe3, 0.36);
  addArcs(THREE, root, radius);

  const light = new THREE.DirectionalLight(0xf8e6aa, 2.1);
  light.position.set(4, 3, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x7c8790, 0.76));

  const markerMeshes = new Map();
  locations.forEach((location) => {
    const mesh = makeMarker(THREE, location, radius);
    markerGroup.add(mesh);
    markerMeshes.set(location.code, mesh);
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = null;
  let autoRotate = true;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let targetRotation = rotationFor(locations[0]);

  root.rotation.x = targetRotation.x;
  root.rotation.y = targetRotation.y;

  const api = {
    focus(code) {
      const location = locations.find((item) => item.code === code);
      if (!location) return;
      activeCode = code;
      targetRotation = rotationFor(location);
      updateDetail(detail, location);
      updateListState(list);
      autoRotate = false;
      setStatus();
    },
  };

  buildLocationList(list, api);
  updateDetail(detail, locations[0]);
  updateListState(list);

  stage.querySelector('[data-globe-action="toggle"]')?.addEventListener("click", (event) => {
    autoRotate = !autoRotate;
    event.currentTarget.textContent = autoRotate ? "⏸" : "▶";
    setStatus();
  });

  stage.querySelector('[data-globe-action="focus-home"]')?.addEventListener("click", () => api.focus("DOM"));
  stage.querySelector('[data-globe-action="focus-world"]')?.addEventListener("click", () => {
    targetRotation = { x: -0.62, y: -0.03 };
    autoRotate = true;
    setStatus();
  });

  canvas.addEventListener("pointerdown", (event) => {
    dragging = true;
    autoRotate = false;
    lastX = event.clientX;
    lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
    setStatus();
  });

  canvas.addEventListener("pointermove", (event) => {
    updatePointer(event, canvas, pointer);

    if (dragging) {
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      root.rotation.y += dx * 0.006;
      root.rotation.x += dy * 0.004;
      targetRotation = { x: root.rotation.x, y: root.rotation.y };
      lastX = event.clientX;
      lastY = event.clientY;
      return;
    }

    const hit = pickMarker(THREE, raycaster, pointer, camera, markerGroup);
    hovered = hit?.userData.location || null;
    showTooltip(tooltip, hovered, event, stage);
    canvas.style.cursor = hovered ? "pointer" : "grab";
  });

  canvas.addEventListener("pointerup", (event) => {
    dragging = false;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointerleave", () => {
    dragging = false;
    hovered = null;
    tooltip.hidden = true;
  });

  canvas.addEventListener("click", () => {
    if (hovered) api.focus(hovered.code);
  });

  function setStatus() {
    if (status) status.textContent = autoRotate ? "Rotation active" : "Rotation manuelle";
  }

  function resize() {
    const rect = stage.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function animate() {
    requestAnimationFrame(animate);
    resize();

    if (autoRotate) {
      targetRotation.y += 0.0022;
    }

    root.rotation.x += (targetRotation.x - root.rotation.x) * 0.05;
    root.rotation.y += (targetRotation.y - root.rotation.y) * 0.05;

    markerMeshes.forEach((mesh, code) => {
      const isActive = code === activeCode;
      const pulse = 1 + Math.sin(performance.now() * 0.004 + mesh.userData.offset) * 0.08;
      mesh.scale.setScalar((isActive ? 1.55 : 1) * pulse);
    });

    renderer.render(scene, camera);
  }

  animate();
}

function buildLocationList(list, api) {
  list.innerHTML = "";
  locations.forEach((location) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "location-row";
    row.dataset.locationCode = location.code;
    row.innerHTML = `
      <span class="location-row__code">${location.code}</span>
      <span class="location-row__name">${location.name}</span>
      <span class="location-row__kind">${location.country} · ${location.kind}</span>
    `;
    row.addEventListener("click", () => {
      if (api) api.focus(location.code);
    });
    list.appendChild(row);
  });
}

function updateListState(list) {
  list.querySelectorAll(".location-row").forEach((row) => {
    row.classList.toggle("active", row.dataset.locationCode === activeCode);
  });
}

function updateDetail(detail, location) {
  detail.innerHTML = `
    <span class="operations__code">${location.code}</span>
    <h3>${location.name}</h3>
    <p>${location.description}</p>
    <small>${location.country} · ${location.kind}</small>
  `;
}

function makeMarker(THREE, location, radius) {
  const group = new THREE.Group();
  const color = location.lead ? 0xf2b705 : 0xeeebe3;
  const point = latLonToVector(location.lat, location.lon, radius + 0.045);
  group.position.copy(point);
  group.lookAt(0, 0, 0);
  group.userData.location = location;
  group.userData.offset = Math.random() * Math.PI * 2;

  const pin = new THREE.Mesh(
    new THREE.SphereGeometry(location.lead ? 0.038 : 0.026, 18, 18),
    new THREE.MeshBasicMaterial({ color }),
  );
  pin.userData.location = location;
  group.add(pin);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(location.lead ? 0.066 : 0.046, location.lead ? 0.078 : 0.056, 28),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: location.lead ? 0.62 : 0.38,
      side: THREE.DoubleSide,
    }),
  );
  ring.userData.location = location;
  group.add(ring);

  return group;
}

function addAtmosphere(THREE, root, radius) {
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius + 0.08, 96, 96),
    new THREE.MeshBasicMaterial({
      color: 0xf2b705,
      transparent: true,
      opacity: 0.055,
      side: THREE.BackSide,
    }),
  );
  root.add(atmosphere);
}

function addOutline(THREE, root, coords, radius, color, opacity) {
  const points = coords.map(([lat, lon]) => latLonToVector(lat, lon, radius + 0.018));
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
  root.add(line);
}

function addArcs(THREE, root, radius) {
  const home = locations[0];
  const material = new THREE.LineBasicMaterial({
    color: 0xf2b705,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });

  locations.slice(1).forEach((location) => {
    const points = makeArc(home, location, radius + 0.055);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material.clone());
    root.add(line);
  });
}

function makeArc(from, to, radius) {
  const start = latLonToVector(from.lat, from.lon, radius);
  const end = latLonToVector(to.lat, to.lon, radius);
  const points = [];
  for (let i = 0; i <= 34; i += 1) {
    const t = i / 34;
    const point = new THREE.Vector3().copy(start).lerp(end, t).normalize();
    const lift = Math.sin(Math.PI * t) * 0.16;
    points.push(point.multiplyScalar(radius + lift));
  }
  return points;
}

function latLonToVector(lat, lon, radius) {
  const phi = (lat * Math.PI) / 180;
  const theta = (lon * Math.PI) / 180;
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(theta),
  );
}

function rotationFor(location) {
  return {
    x: -location.lat * (Math.PI / 180) * 0.55,
    y: -location.lon * (Math.PI / 180),
  };
}

function updatePointer(event, canvas, pointer) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function pickMarker(THREE, raycaster, pointer, camera, markerGroup) {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(markerGroup.children, true);
  return hits.find((hit) => hit.object.userData.location)?.object;
}

function showTooltip(tooltip, location, event, stage) {
  if (!tooltip) return;
  if (!location) {
    tooltip.hidden = true;
    return;
  }

  const rect = stage.getBoundingClientRect();
  tooltip.innerHTML = `<b>${location.code} · ${location.name}</b>${location.country} · ${location.kind}`;
  tooltip.style.left = `${event.clientX - rect.left}px`;
  tooltip.style.top = `${event.clientY - rect.top}px`;
  tooltip.hidden = false;
}

document.addEventListener("DOMContentLoaded", initOperationsGlobe);
