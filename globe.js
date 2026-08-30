const THREE_URL = "https://unpkg.com/three@0.160.0/build/three.module.js";
let THREE;

const locations = [
  {
    code: "DOM",
    name: "Domicile",
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

const worldOutlines = [
  [[69.0,-180.0],[64.3,-173.9],[64.5,178.7],[59.9,170.3],[55.3,161.7],[57.8,156.8],[59.1,155.0],[53.8,138.2],[43.4,134.9],[40.2,128.6],[34.5,127.4],[38.1,124.7],[39.8,121.4],[37.9,120.8],[30.9,121.9],[22.7,114.8],[20.7,106.7],[8.6,105.2],[10.8,99.5],[4.2,103.4],[4.8,100.6],[10.7,98.5],[17.3,94.5],[21.8,90.3],[17.7,83.2],[9.5,78.9],[16.0,73.5],[24.7,67.1],[26.8,53.5],[27.7,48.8],[26.1,51.3],[26.1,56.1],[22.5,59.8],[18.6,56.6],[15.6,52.2],[12.7,45.0],[16.3,42.8],[23.7,38.5],[29.0,34.8],[27.7,33.3],[18.6,37.5],[12.0,43.3],[11.4,48.9],[6.8,49.5],[-2.6,40.3],[-9.1,39.5],[-17.6,37.4],[-23.7,35.6],[-29.3,31.5],[-34.0,24.7],[-33.9,18.2],[-25.4,14.7],[-14.9,12.1],[-8.6,13.2],[-0.5,9.0],[4.5,7.1],[4.7,-2.0],[6.1,-10.8],[10.9,-14.8],[14.9,-17.2],[21.9,-17.0],[28.0,-12.6],[35.8,-5.9],[36.7,5.3],[35.7,10.9],[31.2,16.6],[32.0,23.9],[31.3,32.2],[34.6,36.0],[36.1,29.7],[42.0,33.5],[44.3,38.7],[46.3,35.0],[46.1,33.3],[42.0,28.0],[40.1,24.4],[37.4,23.4],[40.3,19.4],[44.3,15.4],[44.6,12.3],[39.8,18.3],[39.5,15.7],[44.4,8.9],[40.1,0.1],[36.4,-6.2],[40.2,-9.0],[43.4,-1.9],[50.9,1.6],[55.0,8.5],[56.1,10.7],[54.5,16.4],[57.0,24.1],[60.4,26.3],[66.0,23.9],[56.1,15.9],[62.0,5.0],[71.2,28.2],[66.8,33.9],[66.5,42.1],[66.9,47.9],[69.5,60.0],[71.9,68.5],[66.2,72.4],[72.8,74.7],[73.8,84.7],[76.9,101.0],[75.0,112.8],[73.7,123.3],[71.6,138.2],[69.6,162.3]],
  [[69.5,-90.5],[69.8,-84.1],[66.6,-85.8],[62.0,-93.2],[56.5,-88.0],[51.2,-79.9],[58.1,-77.3],[62.1,-72.9],[59.9,-65.2],[54.6,-57.3],[50.1,-61.7],[48.3,-68.7],[47.0,-60.5],[45.3,-64.4],[42.3,-70.8],[41.3,-72.3],[40.4,-74.0],[38.0,-75.4],[37.9,-76.3],[33.5,-79.1],[28.0,-80.5],[26.7,-82.2],[30.2,-85.8],[29.2,-89.4],[28.7,-95.6],[25.0,-97.5],[18.8,-95.9],[20.7,-90.5],[19.6,-87.6],[17.6,-88.3],[15.9,-88.5],[15.9,-86.1],[15.4,-83.8],[12.9,-83.5],[10.0,-83.0],[9.3,-79.9],[9.3,-76.1],[12.0,-72.2],[9.9,-72.1],[11.5,-69.6],[10.6,-64.3],[8.4,-59.8],[6.0,-55.0],[1.7,-50.0],[-2.1,-44.4],[-5.5,-35.2],[-13.8,-39.0],[-23.0,-42.0],[-28.2,-48.7],[-35.0,-54.9],[-36.4,-56.7],[-41.0,-62.7],[-43.5,-65.2],[-48.7,-67.2],[-52.9,-70.8],[-48.7,-75.6],[-43.4,-73.7],[-33.9,-71.9],[-19.8,-70.2],[-12.2,-77.1],[-4.0,-81.1],[-0.3,-80.4],[2.7,-77.9],[7.5,-78.2],[8.3,-80.4],[8.1,-81.7],[9.1,-83.6],[9.9,-85.7],[12.5,-87.2],[13.3,-88.8],[15.9,-93.9],[17.2,-100.8],[20.5,-105.4],[25.2,-108.4],[29.0,-112.2],[30.9,-114.8],[27.5,-112.5],[23.4,-109.4],[26.0,-112.3],[28.1,-114.2],[33.6,-117.9],[37.6,-122.5],[43.7,-124.1],[48.2,-122.5],[53.6,-129.3],[58.2,-136.6],[60.0,-148.0],[60.7,-151.9],[56.0,-158.4],[55.3,-162.9],[58.6,-158.2],[59.6,-161.9],[63.1,-164.6],[64.8,-161.4],[66.6,-164.5],[68.9,-166.2],[71.1,-155.1],[70.0,-144.9],[69.5,-132.9],[69.4,-124.3],[67.9,-115.3],[68.8,-106.1],[68.2,-96.1],[71.8,-93.9]],
  [[-84.7,-180.0],[-84.2,-176.5],[-84.1,-173.1],[-84.8,-164.2],[-85.3,-145.9],[-83.7,-153.6],[-81.4,-155.3],[-80.7,-147.2],[-79.2,-153.4],[-77.0,-157.9],[-77.2,-150.0],[-75.4,-146.2],[-75.0,-138.9],[-74.3,-132.3],[-74.5,-124.0],[-74.2,-116.2],[-74.4,-111.3],[-75.0,-103.4],[-74.1,-102.5],[-72.8,-100.3],[-73.3,-93.7],[-73.2,-87.3],[-73.5,-80.7],[-73.9,-74.9],[-72.8,-68.0],[-70.5,-68.2],[-68.2,-67.4],[-65.9,-65.4],[-64.3,-61.4],[-63.5,-57.2],[-64.5,-61.3],[-66.4,-62.8],[-68.4,-65.3],[-70.4,-62.3],[-73.2,-60.7],[-75.3,-64.4],[-76.7,-72.2],[-77.6,-74.3],[-79.2,-78.0],[-81.0,-70.0],[-82.8,-58.7],[-81.7,-49.8],[-81.3,-38.2],[-80.0,-29.3],[-79.1,-35.9],[-77.1,-29.8],[-76.1,-22.5],[-74.5,-15.7],[-72.7,-13.3],[-71.7,-8.6],[-71.5,-4.3],[-71.1,1.9],[-69.9,7.7],[-70.2,12.4],[-69.9,18.2],[-70.5,23.7],[-69.9,30.0],[-68.7,34.9],[-69.5,39.7],[-68.1,44.9],[-67.1,49.9],[-65.8,54.5],[-67.3,58.7],[-67.4,64.1],[-69.0,69.7],[-70.7,69.1],[-72.1,71.0],[-69.9,73.9],[-68.7,78.4],[-67.2,82.8],[-66.2,88.0],[-67.2,92.6],[-67.2,97.8],[-65.6,102.8],[-67.0,108.1],[-65.9,113.6],[-67.2,118.6],[-66.6,124.1],[-66.6,129.7],[-65.7,135.0],[-67.0,137.5],[-66.8,144.4],[-68.4,148.8],[-68.8,155.2],[-70.2,160.8],[-70.8,167.3],[-72.4,170.6],[-74.4,166.1],[-76.7,163.5],[-78.8,167.0],[-80.6,160.3],[-82.7,165.1],[-84.4,173.2]],
  [[83.5,-27.1],[82.3,-22.7],[82.2,-31.9],[82.1,-27.9],[82.1,-22.9],[81.2,-23.2],[81.9,-15.8],[81.3,-12.2],[80.3,-16.8],[80.1,-17.7],[78.8,-19.7],[77.0,-18.5],[76.6,-21.7],[75.2,-19.6],[74.3,-19.4],[73.8,-20.4],[73.3,-22.2],[72.6,-22.3],[72.6,-24.3],[72.1,-23.4],[70.7,-21.8],[70.9,-24.3],[70.8,-25.2],[70.2,-23.7],[69.3,-25.0],[68.1,-30.7],[67.7,-32.8],[66.0,-36.4],[65.7,-38.4],[64.8,-40.7],[63.5,-41.2],[61.9,-42.4],[60.1,-43.4],[60.9,-46.3],[61.4,-49.2],[63.6,-51.6],[65.2,-52.3],[66.8,-53.3],[68.4,-53.0],[69.1,-51.1],[69.6,-52.0],[69.3,-53.5],[70.3,-54.8],[70.8,-53.4],[71.2,-53.1],[71.4,-55.0],[72.6,-54.7],[73.7,-56.1],[75.1,-58.6],[76.1,-61.3],[76.1,-66.1],[76.4,-69.7],[77.3,-68.8],[77.6,-71.0],[78.4,-73.2],[79.4,-65.7],[80.1,-68.0],[81.2,-63.7],[81.8,-62.6],[82.2,-57.2],[81.9,-53.0],[82.1,-48.0],[81.7,-44.5],[82.6,-46.8],[83.2,-39.9],[83.6,-35.1]],
  [[-13.8,143.6],[-14.6,144.9],[-16.3,145.5],[-17.8,146.2],[-19.5,147.5],[-20.6,148.7],[-22.1,150.1],[-23.5,150.9],[-25.3,152.9],[-27.3,153.1],[-29.5,153.3],[-31.6,152.9],[-33.8,151.3],[-35.7,150.3],[-37.4,150.0],[-38.2,147.4],[-38.6,145.5],[-38.1,144.5],[-38.4,142.2],[-37.4,140.0],[-35.7,139.1],[-34.4,138.2],[-34.7,137.4],[-32.9,137.8],[-34.9,136.0],[-33.2,134.6],[-32.0,133.0],[-31.6,129.5],[-32.2,126.1],[-33.5,124.0],[-34.0,122.2],[-34.0,119.9],[-34.7,118.5],[-35.0,116.6],[-33.6,115.0],[-32.9,115.7],[-30.6,115.2],[-28.8,114.6],[-27.3,114.0],[-26.5,113.8],[-26.3,114.2],[-24.7,113.6],[-23.6,113.7],[-21.8,114.1],[-21.5,115.5],[-20.6,117.2],[-20.3,118.8],[-20.0,119.8],[-18.7,121.7],[-17.3,122.3],[-17.1,123.9],[-16.3,124.3],[-14.7,125.2],[-14.3,126.1],[-13.8,127.1],[-14.9,129.0],[-13.6,129.9],[-12.5,130.6],[-12.1,132.6],[-11.1,132.4],[-12.0,134.4],[-12.0,135.9],[-12.4,137.0],[-13.3,136.0],[-14.7,135.4],[-15.9,137.1],[-16.8,138.6],[-17.7,140.2],[-16.4,141.3],[-14.6,141.6],[-12.9,141.7],[-11.9,141.9],[-10.7,142.5],[-11.9,143.1],[-13.4,143.6]],
  [[-16.6,-180.0],[-16.8,179.4],[-17.0,178.7],[-16.6,178.6],[-16.4,179.1],[-16.4,179.4],[-16.1,-180.0],[-16.0,-179.8],[-16.5,-179.9],[-16.6,-180.0]],
  [[73.2,-86.6],[72.5,-85.8],[73.3,-84.9],[73.8,-82.3],[72.7,-80.6],[72.1,-80.8],[72.4,-78.8],[72.8,-77.8],[72.2,-75.6],[71.8,-74.2],[71.3,-74.1],[71.6,-72.2],[70.9,-71.2],[70.5,-68.8],[70.1,-67.9],[69.2,-67.0],[68.7,-68.8],[68.1,-66.5],[67.8,-64.9],[66.9,-63.4],[66.9,-61.9],[66.2,-62.2],[65.0,-63.9],[65.4,-65.1],[66.4,-66.7],[66.3,-68.0],[65.7,-68.1],[65.1,-67.1],[64.6,-65.7],[64.4,-65.3],[63.4,-64.7],[62.7,-65.0],[62.9,-66.3],[63.7,-68.8],[62.9,-67.4],[62.3,-66.3],[61.9,-66.2],[62.3,-68.9],[62.9,-71.0],[63.4,-72.2],[63.7,-71.9],[64.2,-73.4],[64.7,-74.8],[64.4,-74.8],[64.2,-77.7],[64.6,-78.6],[65.3,-77.9],[65.3,-76.0],[65.5,-74.0],[65.8,-74.3],[66.3,-73.9],[67.3,-72.7],[67.7,-72.9],[68.1,-73.3],[68.6,-74.8],[68.9,-76.9],[69.1,-76.2],[69.8,-77.3],[69.8,-78.2],[70.2,-79.0],[69.9,-79.5],[69.7,-81.3],[70.0,-84.9],[70.3,-87.1],[70.4,-88.7],[70.8,-89.5],[71.2,-88.5],[71.2,-89.9],[72.2,-90.2],[73.1,-89.4],[73.5,-88.4],[73.8,-85.8],[73.2,-86.6]],
  [[71.5,-180.0],[70.8,180.0],[70.8,178.9],[71.1,178.7],[71.5,-180.0]],
  [[83.1,-68.5],[83.0,-65.8],[82.9,-63.7],[82.6,-61.9],[82.4,-61.9],[81.9,-64.3],[81.7,-66.8],[81.5,-67.7],[81.5,-65.5],[80.9,-67.8],[80.6,-69.5],[79.8,-71.2],[79.6,-73.2],[79.4,-73.9],[79.3,-76.9],[79.2,-75.5],[79.0,-76.2],[78.5,-75.4],[78.2,-76.3],[77.9,-77.9],[77.5,-78.4],[77.2,-79.8],[77.0,-79.6],[77.0,-77.9],[76.8,-77.9],[76.2,-80.6],[76.5,-83.2],[76.3,-86.1],[76.4,-87.6],[76.5,-89.5],[77.0,-89.6],[77.2,-87.8],[77.9,-88.3],[78.0,-87.6],[77.5,-85.0],[78.2,-86.3],[78.4,-88.0],[78.8,-87.2],[79.0,-85.4],[79.3,-85.1],[79.7,-86.5],[80.3,-86.9],[80.2,-84.2],[80.1,-83.4],[80.5,-81.8],[80.6,-84.1],[80.5,-87.6],[80.9,-89.4],[81.3,-90.2],[81.6,-91.4],[81.9,-91.6],[82.1,-90.1],[82.1,-88.9],[82.3,-87.0],[82.7,-85.5],[82.6,-84.3],[82.3,-83.2],[82.9,-82.4],[83.0,-81.1],[83.1,-79.3],[83.2,-76.3],[83.1,-75.7],[83.2,-72.8],[83.2,-70.7],[83.1,-68.5]],
];

const franceZoomOutline = [
  [43, -1.7],
  [48, -4.5],
  [51, 2.2],
  [49, 7.8],
  [45, 7],
  [42.5, 3],
  [43, -1.7],
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
  const ZOOM_MIN = 2.3;
  const ZOOM_MAX = 7.5;
  const ZOOM_DEFAULT = 4.4;
  let targetDistance = ZOOM_DEFAULT;
  camera.position.set(0, 0, ZOOM_DEFAULT);

  const root = new THREE.Group();
  root.rotation.order = "YXZ";
  scene.add(root);

  const markerGroup = new THREE.Group();
  root.add(markerGroup);

  const textureLoader = new THREE.TextureLoader();
  const dayMap = textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
  );
  dayMap.colorSpace = THREE.SRGBColorSpace;
  const lightsMap = textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
  );

  const radius = 1.42;
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 96, 96),
    new THREE.MeshStandardMaterial({
      map: dayMap,
      color: 0x9aa3a8,
      emissiveMap: lightsMap,
      emissive: new THREE.Color(0xf2b705),
      emissiveIntensity: 1.3,
      roughness: 0.88,
      metalness: 0.05,
    }),
  );
  root.add(globe);

  const wire = new THREE.Mesh(
    new THREE.SphereGeometry(radius + 0.006, 48, 24),
    new THREE.MeshBasicMaterial({
      color: 0x5b6167,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    }),
  );
  root.add(wire);

  addAtmosphere(THREE, root, radius);
  addOutline(THREE, root, franceZoomOutline, radius, 0xf2b705, 0.75);
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
      targetDistance = 2.9;
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
    targetRotation = { x: 0.32, y: 0.05 };
    targetDistance = ZOOM_DEFAULT;
    autoRotate = true;
    setStatus();
  });

  stage.querySelector('[data-globe-action="zoom-in"]')?.addEventListener("click", () => {
    targetDistance = Math.max(ZOOM_MIN, targetDistance - 0.9);
  });
  stage.querySelector('[data-globe-action="zoom-out"]')?.addEventListener("click", () => {
    targetDistance = Math.min(ZOOM_MAX, targetDistance + 0.9);
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

  canvas.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      targetDistance += event.deltaY * 0.0022;
      targetDistance = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, targetDistance));
    },
    { passive: false },
  );

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
    camera.position.z += (targetDistance - camera.position.z) * 0.08;

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
    x: location.lat * (Math.PI / 180),
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
