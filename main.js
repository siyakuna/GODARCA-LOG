// モジュールとしてThree.jsとOrbitControlsをインポート
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// シーン、カメラ、レンダラーの設定
const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0, 0, 0)")
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 足場の作成
const platformGeometry = new THREE.PlaneGeometry(11, 5);
const platformTexture = new THREE.TextureLoader().load('images/asiba.png'); // 足場の画像
const platformMaterial = new THREE.MeshBasicMaterial({ map: platformTexture });
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.rotation.x = -Math.PI / 2; // 水平にする
scene.add(platform);

// 複数の立ち絵のメッシュを作成し、表と裏を合わせた形にする
const spriteGeometry = new THREE.PlaneGeometry(1, 2); // 立ち絵サイズ


for (const prop in character) {
  // 立ち絵の表側マテリアルと裏側マテリアルを作成
const spriteTexture = new THREE.TextureLoader().load(character[prop].img); // 立ち絵の画像
const frontMaterial = new THREE.MeshBasicMaterial({ map: spriteTexture, transparent: true, side: THREE.FrontSide }); // 表側マテリアル
const backMaterial = new THREE.MeshBasicMaterial({  map: spriteTexture,  transparent: true,  side: THREE.BackSide }); // 裏側を黒に設定

  character[prop].obj = new THREE.Mesh(spriteGeometry, frontMaterial)
  character[prop].obj.position.set(character[prop].x, character[prop].y, character[prop].z);
  character[prop].obj.rotation.y = Math.PI / 1; // 特定の方向に向ける（例として45度）
  scene.add(character[prop].obj);
}
function syori(){
  for(var key of Object.keys(character)){
     character[key].obj.position.set(character[key].x, character[key].y, character[key].z);
     character[key].obj.rotation.z = Math.PI/character[key].zr;
  }
}
// カメラの初期位置
camera.position.set(0, 4, -6);
camera.lookAt(0, 0, 0);

// カメラ操作用のOrbitControlsを追加
const controls = new OrbitControls(camera, renderer.domElement);
console.log(scene)
// ウィンドウリサイズ対応
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
// アニメーションループ
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    syori();
}

animate();