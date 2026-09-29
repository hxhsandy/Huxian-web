// 飾品草稿（繪星改這個檔）。一般的 <script>，改完存檔、重新整理頁面就看得到，不用組建。
// 規格：docs/06_drops.md 的「做一件飾品的方法」＋ lab/items/README.md。
//
// 每一件草稿：
//   id     英文小寫、數字、連字號（頁面上會自動加 lab- 開頭；正式接進遊戲時再定正式的 id）
//   slot   'head'（頭）／'neck'（胸前）／'tail'（尾巴）
//   name   名稱；desc 介紹（選填）；note 給 CK 看的一句說明（選填，只出現在實驗室面板）
//   build(anchor, L)   做出模型、回傳一個 THREE 物件。L 是工具箱：
//       L.THREE、L.toon(顏色, {emissive})、L.itemPart(幾何, 材質[, 描邊 或 false])＝加細金描邊的零件、L.ITEM_OL（金描邊）、
//       L.SPH／L.SPH_LO（共用的球，縮放來用，不要 dispose）、L.outlineMat、L.addOutline、L.mergeGeos、L.peachBlossomGeo、
//       L.HEAD_TOP（頭的掛點在頭頂正中間：頭中心往上 0.24）、L.BOW_DIR／L.BOW_LEAN（尾巴飾品朝外的方向，參考蝴蝶結）
//       anchor.userData.thumb 是 true＝正在拍換裝頁小圖（要正面朝前）；anchor.userData.tailR＝尾巴掛點的半徑
//   upd(obj, t, st, L)  每一幀的小動畫（選填）：只改位置、角度、亮度，不要每幀新建東西
//
// 位置參考（相對頭的中心，程式裡要減掉 L.HEAD_TOP）：左耳旁約 (-0.2, 0.15, 0.11)、右耳旁約 (0.2, 0.15, 0.1)。
// 大小參考：金鈴直徑約 0.12、楓葉約 0.17、日輪約 0.14（頭寬大約 0.5）。一件大約 7 個零件以內。
window.ITEM_LAB_DRAFTS = [

  // ---- 範例（只示範寫法，可以刪掉）：戴在右耳旁的小圓鏡 ----
  { id: 'example-mirror', slot: 'head', name: '範例・小圓鏡', desc: '示範用的草稿。', note: '範例：示範寫法，不是提案',
    build: function (anchor, L) {
      var T = L.THREE, H = L.HEAD_TOP, g = new T.Group();
      var rim = L.itemPart(new T.CylinderGeometry(1, 1, 0.22, 28), L.toon(0xd9a441, { emissive: 0x4a2c06 }));   // 銅框
      rim.rotation.x = Math.PI / 2; rim.scale.setScalar(0.06); g.add(rim);
      var face = new T.Mesh(new T.CircleGeometry(0.047, 28), L.toon(0xdfeeff, { emissive: 0x3a5068 })); face.position.z = 0.008; g.add(face);   // 鏡面（小細節不加描邊）
      g.position.set(0.2 - H[0], 0.15 - H[1], 0.1 - H[2]); g.rotation.set(-0.15, 0.5, -0.3);   // 右耳旁
      return g;
    },
    upd: function (obj, t) { obj.children[1].material.emissiveIntensity = 1 + 0.25 * Math.sin(t * 2.4); } }

];
