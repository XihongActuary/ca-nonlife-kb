/* ============================================================
   gate.js · 非寿险责任准备金评估知识库·会员密码门
   ------------------------------------------------------------
   · 口令：XHJS25（djb2 散列 = 3664108585）
   · 解锁后写入 localStorage，本机一次输入、长期有效，
     不打扰后续阅读。
   · 诚实声明：纯前端密码只能挡住"随手翻看"，挡不住懂
     开发者工具的人。定位是"礼貌性会员标识"而非硬防线。
   · 修改口令：改下面的 PASS_HASH（djb2 算法，可用
     Python 计算：h=5381; [h:=h*33+ord(c) for c in 口令]，
     取 32 位无符号结果），并在知识星球置顶帖同步更新。
   ============================================================ */
(function () {
  'use strict';

  /* 口令散列（当前口令：XHJS25 —— 更换口令后需重新计算散列） */
  var PASS_HASH = 3664108585;
  var STORE_KEY = 'nonlife_reserve_kb_unlocked';

  function djb2(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) {
      h = (h * 33 + str.charCodeAt(i)) >>> 0;
    }
    return h >>> 0;
  }

  function unlocked() {
    try { return localStorage.getItem(STORE_KEY) === '1'; }
    catch (e) { return false; }
  }

  function getTitle() {
    var h1 = document.querySelector('h1');
    return h1 ? h1.textContent.trim() : '本章内容';
  }

  function buildGate() {
    var chapterTitle = getTitle();

    var gate = document.createElement('div');
    gate.className = 'gate-panel';
    gate.innerHTML =
      '<div class="gate-card">' +
        '<div class="gate-lock">🔒</div>' +
        '<h2>会员章节 · 阅读口令</h2>' +
        '<p class="gate-ch"><strong>' + chapterTitle + '</strong> 属于「非寿险责任准备金评估」知识库完整版内容。</p>' +
        '<ul class="gate-points">' +
          '<li>监管原文（11号令 · 15号 · 19号 · 51号附件4 · 6号细则 · 4号农险）</li>' +
          '<li>书本题目解题汇总（基于谢志刚教材 + 配套 Excel 演算）</li>' +
          '<li>五大拓展专题、真题馆、三套模拟卷与参考资料库</li>' +
          '<li>解锁后阅读体验完全一致，本机长期有效</li>' +
        '</ul>' +
        '<div class="gate-input-row">' +
          '<input type="password" id="gate-pass" class="gate-input" placeholder="输入星球公布的阅读口令" autocomplete="off">' +
          '<button id="gate-btn" class="gate-btn">解锁知识库</button>' +
        '</div>' +
        '<p class="gate-hint">口令在知识星球「西红精算」置顶帖公布 · 解锁一次，本机长期有效</p>' +
        '<div class="gate-links">' +
          '<a href="https://wx.zsxq.com/group/15551255241122" target="_blank" rel="noopener" class="gate-cta">如何获得口令 →</a>' +
          '<a href="xihong.html">关于 · 西红精算</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(gate);

    var input = gate.querySelector('#gate-pass');
    var btn = gate.querySelector('#gate-btn');

    function tryUnlock() {
      var v = (input.value || '').trim();
      if (!v) { input.focus(); return; }
      if (djb2(v) === PASS_HASH) {
        try { localStorage.setItem(STORE_KEY, '1'); } catch (e) {}
        open();
      } else {
        input.classList.add('gate-shake');
        input.value = '';
        setTimeout(function () { input.classList.remove('gate-shake'); }, 400);
        input.focus();
      }
    }

    btn.addEventListener('click', tryUnlock);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryUnlock();
    });
  }

  function lock() {
    document.body.classList.add('gated');
    buildGate();
  }

  function open() {
    document.body.classList.remove('gated');
    var g = document.querySelector('.gate-panel');
    if (g) g.remove();
    var badge = document.createElement('div');
    badge.className = 'gate-unlocked-badge';
    badge.title = '完整版已解锁（口令记住在本机）';
    badge.textContent = '🔓 已解锁';
    document.body.appendChild(badge);
  }

  if (unlocked()) { open(); return; }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (!unlocked()) lock(); else open();
    });
  } else {
    lock();
  }
})();