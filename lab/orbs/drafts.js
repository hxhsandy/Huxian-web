// 狐仙三消珠子 B 方向：圓潤、六種剪影與色彩都分開。仍是實驗室草稿。
function softOrbMaterial(L, color) {
  return new L.THREE.MeshPhongMaterial({
    color: color,
    shininess: 23,
    specular: 0x595959,
    emissive: new L.THREE.Color(color).multiplyScalar(0.09)
  });
}

function waterDrop(L) {
  var s = new L.THREE.Shape();
  s.moveTo(0, 0.96);
  s.bezierCurveTo(-0.24, 0.66, -0.73, 0.12, -0.73, -0.3);
  s.bezierCurveTo(-0.73, -0.74, -0.39, -0.94, 0, -0.94);
  s.bezierCurveTo(0.39, -0.94, 0.73, -0.74, 0.73, -0.3);
  s.bezierCurveTo(0.73, 0.12, 0.24, 0.66, 0, 0.96);
  return s.getPoints(96).map(function (p) { return [p.x, p.y]; });
}

function softLeaf(L) {
  var s = new L.THREE.Shape();
  s.moveTo(-0.86, -0.74);
  s.bezierCurveTo(-1.0, 0.22, -0.34, 0.82, 0.89, 0.78);
  s.bezierCurveTo(0.96, -0.22, 0.28, -0.87, -0.86, -0.74);
  return s.getPoints(96).map(function (p) { return [p.x, p.y]; });
}

window.ORB_LAB_DRAFTS = [
  { key: 'fire', name: '軟玉火珠', note: '飽滿珊瑚橘三角，像小火苗。',
    outline: function (L) { return L.roundedPoly(3, Math.PI / 2, 0.58, 0.43); },
    size: 1.04, color: 0xf37758, plateColor: 0xe4b86d,
    material: function (L) { return softOrbMaterial(L, 0xf37758); } },
  { key: 'water', name: '軟玉水珠', note: '藍色胖水滴，圓底與尖頂和火珠分得開。',
    outline: waterDrop,
    size: 0.98, color: 0x3c9fee, plateColor: 0xe4b86d,
    material: function (L) { return softOrbMaterial(L, 0x3c9fee); } },
  { key: 'wood', name: '軟玉木珠', note: '無葉脈、中央稍飽滿的綠葉。',
    outline: softLeaf,
    size: 1.06, color: 0x30b978, plateColor: 0xe4b86d,
    material: function (L) {
      var m = softOrbMaterial(L, 0x30b978);
      m.shininess = 18; m.specular.setHex(0x484848);
      return m;
    },
    faceSize: 0.82,
    face: function (ctx, n) {
      var x = n * 0.35, y = n * 0.34, r = n * 0.14;
      var glow = ctx.createRadialGradient(x, y, 0, x, y, r);
      glow.addColorStop(0, 'rgba(255,255,234,1)');
      glow.addColorStop(0.35, 'rgba(255,255,234,0.58)');
      glow.addColorStop(1, 'rgba(255,255,234,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    } },
  { key: 'light', name: '軟玉光珠', note: '圓鈍的四角金星。',
    shape: 'star', size: 1.06, color: 0xffc94e, plateColor: 0xe4b86d,
    material: function (L) { return softOrbMaterial(L, 0xffc94e); } },
  { key: 'dark', name: '軟玉暗珠', note: '紫色圓角方塊。',
    shape: 'square', size: 0.98, color: 0x9363df, plateColor: 0xe4b86d,
    material: function (L) { return softOrbMaterial(L, 0x9363df); } },
  { key: 'heart', name: '軟玉心珠', note: '桃粉色飽滿愛心。',
    shape: 'heart', size: 1.02, color: 0xef6fae, plateColor: 0xe4b86d,
    material: function (L) { return softOrbMaterial(L, 0xef6fae); } }
];
