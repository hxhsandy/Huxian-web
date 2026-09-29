// 珠子實驗室草稿（繪星改這個檔）。一種屬性一份：key 是 fire／water／wood／light／dark／heart。寫法見 README.md。
// 下面這份是範例（example: true），網址加 &example=1 才會套上；繪星的草稿直接往陣列裡加。
window.ORB_LAB_DRAFTS = [
  { key: 'water', name: '範例：圓水珠＋笑臉', example: true,
    note: '示範：輪廓用點、顏色、在珠子正面畫表情。',
    outline: function (L) { var pts = []; for (var i = 0; i < 64; i++) { var a = i / 64 * Math.PI * 2; pts.push([Math.cos(a), Math.sin(a)]); } return pts; },
    color: 0x439fe2,
    face: function (c, n) {   // c 是 canvas 2D，n＝256；畫在正中間，外圍留透明
      c.fillStyle = '#1b2a4a';
      c.beginPath(); c.ellipse(n * 0.38, n * 0.46, n * 0.035, n * 0.05, 0, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.ellipse(n * 0.62, n * 0.46, n * 0.035, n * 0.05, 0, 0, Math.PI * 2); c.fill();
      c.lineWidth = n * 0.025; c.strokeStyle = '#1b2a4a'; c.lineCap = 'round';
      c.beginPath(); c.arc(n * 0.5, n * 0.55, n * 0.08, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke();
    } }
];
